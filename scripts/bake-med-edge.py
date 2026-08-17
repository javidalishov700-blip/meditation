#!/usr/bin/env python3
"""Bake meditation MP3s with Microsoft Edge neural voices (no OpenAI).

Never pass SSML as the utterance. Edge reads tags aloud
("version 1.0", "minus 12 percent", "minus 2 hertz") when Communicate()
is given a <speak> string. Rate and pitch go in the constructor kwargs.
"""
from __future__ import annotations

import asyncio
import hashlib
import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[1]
CLIPS_DIR = ROOT / "public" / "voice" / "clips"
MANIFEST_PATH = ROOT / "public" / "voice" / "manifest.json"

VOICES = {
    "en": "en-US-JennyNeural",
    "tr": "tr-TR-EmelNeural",
    "az": "az-AZ-BanuNeural",
    "ru": "ru-RU-SvetlanaNeural",
    "es": "es-ES-ElviraNeural",
    "it": "it-IT-ElsaNeural",
}
RATE = "-12%"
PITCH = "-2Hz"
# Hash prefix must change if we ever spoke SSML, so old tagged files are not reused.
HASH_MARK = "edge-plain"


def hash_name(locale: str, clip_id: str, text: str) -> str:
    raw = f"{HASH_MARK}|{VOICES.get(locale, '')}|{RATE}|{PITCH}|{locale}|{clip_id}|{text}"
    return hashlib.sha1(raw.encode("utf-8")).hexdigest()[:16]


def spoken_text(text: str) -> str:
    """Keep paragraph breaks; never wrap in SSML."""
    parts = [p.strip() for p in text.replace("\r\n", "\n").split("\n\n") if p.strip()]
    return "\n\n".join(parts)


async def bake_one(locale: str, clip_id: str, text: str, dest: Path) -> None:
    voice = VOICES[locale]
    line = spoken_text(text)
    if not line:
        raise RuntimeError("empty text")
    if "<speak" in line.lower() or "<prosody" in line.lower():
        raise RuntimeError("refusing SSML in meditation text")
    last = None
    tmp = dest.with_suffix(".raw.mp3")
    for attempt in range(5):
        try:
            comm = edge_tts.Communicate(line, voice, rate=RATE, pitch=PITCH)
            await comm.save(str(tmp))
            if tmp.stat().st_size < 800:
                raise RuntimeError("tiny mp3")
            subprocess.run(
                [
                    "ffmpeg",
                    "-y",
                    "-loglevel",
                    "error",
                    "-i",
                    str(tmp),
                    "-ar",
                    "24000",
                    "-ac",
                    "1",
                    "-codec:a",
                    "libmp3lame",
                    "-b:a",
                    "48k",
                    str(dest),
                ],
                check=True,
            )
            tmp.unlink(missing_ok=True)
            if dest.stat().st_size < 800:
                raise RuntimeError("tiny transcode")
            return
        except Exception as err:  # noqa: BLE001
            last = err
            tmp.unlink(missing_ok=True)
            await asyncio.sleep(1.2 * (attempt + 1))
    raise RuntimeError(f"{locale}:{clip_id} failed: {last}")


async def worker(q: asyncio.Queue, made: list[int], skipped: list[int], failed: list[str]) -> None:
    while True:
        item = await q.get()
        if item is None:
            q.task_done()
            break
        locale, clip_id, text, dest, key, rel = item
        try:
            if dest.exists() and dest.stat().st_size > 800:
                skipped[0] += 1
                print(f"skip {key}", flush=True)
            else:
                print(f"bake {key}", flush=True)
                await bake_one(locale, clip_id, text, dest)
                made[0] += 1
        except Exception as err:  # noqa: BLE001
            failed.append(f"{key}: {err}")
            print(f"fail {key}: {err}", flush=True)
        q.task_done()


async def main() -> int:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    flags = [a for a in sys.argv[1:] if a.startswith("--")]
    prune_med = "--prune=none" not in flags
    lang_flag = next((a for a in flags if a.startswith("--langs=")), "")
    only_langs = [s.strip() for s in lang_flag[len("--langs=") :].split(",") if s.strip()] if lang_flag else []
    src = Path(args[0] if args else "/tmp/steady-med-clips.json")
    clips = json.loads(src.read_text())
    CLIPS_DIR.mkdir(parents=True, exist_ok=True)
    manifest = {"voice": "edge-neural", "speed": 0.88, "model": "edge-tts", "updated": "", "clips": {}}
    if MANIFEST_PATH.exists():
        try:
            manifest = json.loads(MANIFEST_PATH.read_text())
        except json.JSONDecodeError:
            pass
    clips = [
        c
        for c in clips
        if c.get("locale") in VOICES
        and (c.get("text") or "").strip()
        and (not only_langs or c.get("locale") in only_langs)
    ]
    q: asyncio.Queue = asyncio.Queue()
    planned: list[tuple[str, str]] = []
    old_med: set[str] = set()
    for key, rel in (manifest.get("clips") or {}).items():
        if ":med:" in key:
            old_med.add(rel)
    for c in clips:
        locale = c["locale"]
        clip_id = c["id"]
        text = c["text"].strip()
        name = f"{hash_name(locale, clip_id, text)}.mp3"
        dest = CLIPS_DIR / name
        key = f"{locale}:{clip_id}"
        rel = f"clips/{name}"
        planned.append((key, rel))
        await q.put((locale, clip_id, text, dest, key, rel))

    made = [0]
    skipped = [0]
    failed: list[str] = []
    workers = [asyncio.create_task(worker(q, made, skipped, failed)) for _ in range(3)]
    for _ in workers:
        await q.put(None)
    await q.join()
    await asyncio.gather(*workers)

    kept: set[str] = set()
    for key, rel in planned:
        path = ROOT / "public" / "voice" / rel
        if path.exists() and path.stat().st_size > 800:
            manifest["clips"][key] = rel
            kept.add(rel)

    if prune_med:
        for rel in old_med - kept:
            stale = ROOT / "public" / "voice" / rel
            if stale.exists():
                stale.unlink()
                print(f"drop {rel}", flush=True)

    manifest["updated"] = datetime.now(timezone.utc).isoformat()
    manifest["medVoice"] = "edge-plain"
    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"done new={made[0]} cached={skipped[0]} failed={len(failed)} med={len(planned)}")
    for line in failed:
        print(line)
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(asyncio.run(main()))
