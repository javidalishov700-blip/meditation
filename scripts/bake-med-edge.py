#!/usr/bin/env python3
"""Bake meditation MP3s with Microsoft Edge neural voices (no OpenAI)."""
from __future__ import annotations

import asyncio
import hashlib
import json
import subprocess
import sys
import xml.sax.saxutils as sax
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
}
LANG = {
    "en": "en-US",
    "tr": "tr-TR",
    "az": "az-AZ",
    "ru": "ru-RU",
    "es": "es-ES",
}
RATE = "-12%"
PITCH = "-2Hz"


def hash_name(locale: str, clip_id: str, text: str) -> str:
    raw = f"edge-tts|{VOICES.get(locale, '')}|{RATE}|{locale}|{clip_id}|{text}"
    return hashlib.sha1(raw.encode("utf-8")).hexdigest()[:16]


def to_ssml(locale: str, text: str) -> str:
    voice = VOICES[locale]
    lang = LANG[locale]
    parts = [p.strip() for p in text.replace("\r\n", "\n").split("\n\n") if p.strip()]
    body = '<break time="900ms"/>'.join(sax.escape(p) for p in parts)
    return (
        f'<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="{lang}">'
        f'<voice name="{voice}"><prosody rate="{RATE}" pitch="{PITCH}">{body}</prosody></voice>'
        f"</speak>"
    )


async def bake_one(locale: str, clip_id: str, text: str, dest: Path) -> None:
    voice = VOICES[locale]
    ssml = to_ssml(locale, text)
    last = None
    tmp = dest.with_suffix(".raw.mp3")
    for attempt in range(5):
        try:
            comm = edge_tts.Communicate(ssml, voice)
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
    src = Path(sys.argv[1] if len(sys.argv) > 1 else "/tmp/steady-med-clips.json")
    clips = json.loads(src.read_text())
    CLIPS_DIR.mkdir(parents=True, exist_ok=True)
    manifest = {"voice": "edge-neural", "speed": 0.88, "model": "edge-tts", "updated": "", "clips": {}}
    if MANIFEST_PATH.exists():
        try:
            manifest = json.loads(MANIFEST_PATH.read_text())
        except json.JSONDecodeError:
            pass
    clips = [c for c in clips if c.get("locale") in VOICES and (c.get("text") or "").strip()]
    q: asyncio.Queue = asyncio.Queue()
    planned: list[tuple[str, str]] = []
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

    for key, rel in planned:
        path = ROOT / "public" / "voice" / rel
        if path.exists() and path.stat().st_size > 800:
            manifest["clips"][key] = rel
    from datetime import datetime, timezone

    manifest["updated"] = datetime.now(timezone.utc).isoformat()
    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"done new={made[0]} cached={skipped[0]} failed={len(failed)} med={len(planned)}")
    for line in failed:
        print(line)
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(asyncio.run(main()))
