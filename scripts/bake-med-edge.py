#!/usr/bin/env python3
"""Bake meditation MP3s with Microsoft Edge neural voices (no OpenAI).

Never pass SSML as the utterance. Edge reads tags aloud
("version 1.0", "minus 12 percent", "minus 2 hertz") when Communicate()
is given a <speak> string. Rate and pitch go in the constructor kwargs.

Multilingual voices guess the language sentence by sentence and can read a
very short line ("Hoş geldin.") in the wrong one, so keep such lines joined
to a longer sentence in the scripts. The request envelope (not the text)
also names the clip's language on <speak>; Edge refuses a <lang> element.

Raw Edge speech runs sentences together and sounds dry and close. Every clip
is finished in calm_finish(): longer breaths between sentences and paragraphs,
a warmer tone, a soft room, and one steady level across clips.
"""
from __future__ import annotations

import asyncio
import contextvars
import hashlib
import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

import edge_tts
import edge_tts.communicate as edge_comm
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
CLIPS_DIR = ROOT / "public" / "voice" / "clips"
MANIFEST_PATH = ROOT / "public" / "voice" / "manifest.json"

VOICES = {
    "en": "en-US-JennyNeural",
    "tr": "de-DE-SeraphinaMultilingualNeural",
    "az": "az-AZ-BanuNeural",
    "ru": "ru-RU-SvetlanaNeural",
    "es": "es-ES-ElviraNeural",
    "it": "it-IT-ElsaNeural",
}
LANG_TAGS = {"en": "en-US", "tr": "tr-TR", "az": "az-AZ", "ru": "ru-RU", "es": "es-ES", "it": "it-IT"}
RATE = "-12%"
PITCH = "-2Hz"
# Hash prefix must change if we ever spoke SSML, so old tagged files are not reused.
HASH_MARK = "edge-plain"
# Bump when calm_finish() changes so every clip is finished the same way.
TONE = "calm-1"
SR = 24000

# Per kind: speaking rate, extra seconds after a sentence, length of a
# paragraph pause, how far the room sits under the voice (dB), and how much
# of the room's tail is kept after the last word (s).
# SOS and UI cues are timed against the breathing animation, so they only
# get the tone, never longer pauses.
PROFILES = {
    "med": {"rate": "-14%", "sentence": 0.85, "para": 2.6, "room": -17.0, "tail": 0.9},
    "sample": {"rate": "-14%", "sentence": 0.7, "para": 1.8, "room": -17.0, "tail": 0.9},
    "lib": {"rate": RATE, "sentence": 0.35, "para": 1.6, "room": -19.0, "tail": 0.9},
    "prog": {"rate": RATE, "sentence": 0.35, "para": 1.6, "room": -19.0, "tail": 0.9},
    "quote": {"rate": RATE, "sentence": 0.3, "para": 1.2, "room": -19.0, "tail": 0.9},
    "sos": {"rate": RATE, "sentence": 0.0, "para": 0.0, "room": -22.0, "tail": 0.3},
    "ui": {"rate": RATE, "sentence": 0.0, "para": 0.0, "room": -22.0, "tail": 0.3},
}


def profile(clip_id: str) -> dict:
    return PROFILES.get(clip_id.split(":", 1)[0], PROFILES["ui"])


def multilingual(voice: str) -> bool:
    return "Multilingual" in voice


def voice_rate(locale: str, clip_id: str) -> str:
    """The newer multilingual voices already speak slowly; slowing them as much
    as the older voices makes them drag."""
    rate = int(profile(clip_id)["rate"].rstrip("%"))
    if multilingual(VOICES.get(locale, "")):
        rate += 8
    return f"{rate:+d}%"


def voice_pitch(locale: str) -> str:
    return "+0Hz" if multilingual(VOICES.get(locale, "")) else PITCH


def hash_name(locale: str, clip_id: str, text: str, spread: dict | None = None) -> str:
    voice = VOICES.get(locale, "")
    if multilingual(voice):
        voice = f"{voice}|speak:{LANG_TAGS.get(locale, '')}"
    raw = f"{HASH_MARK}|{TONE}|{voice}|{voice_rate(locale, clip_id)}|{voice_pitch(locale)}|{locale}|{clip_id}|{text}"
    if spread:
        raw += f"|fill:{spread['fill']}|rest:{sorted(spread['rest'].items())}"
    return hashlib.sha1(raw.encode("utf-8")).hexdigest()[:16]


# A meditation step runs for a fixed time. Its narration is spread over that
# time: the quiet practice goes after the paragraphs MED_REST names, so the
# closing words arrive near the end instead of two minutes in.
SPREAD_MARGIN_S = 10.0
SPREAD_MAX_PER_WEIGHT_S = 40.0


def spread_of(clip: dict) -> dict | None:
    fill = clip.get("fillSec")
    if not fill:
        return None
    paragraphs = [p for p in clip["text"].replace("\r\n", "\n").split("\n\n") if p.strip()]
    rest = {int(k): float(v) for k, v in (clip.get("rest") or {}).items()}
    return {"fill": float(fill), "rest": rest, "paragraphs": len(paragraphs)}


_pinned_lang: contextvars.ContextVar[str] = contextvars.ContextVar("pinned_lang", default="")
_plain_mkssml = edge_comm.mkssml


def _mkssml(tc, escaped_text):  # noqa: ANN001
    lang = _pinned_lang.get()
    if not lang:
        return _plain_mkssml(tc, escaped_text)
    if isinstance(escaped_text, bytes):
        escaped_text = escaped_text.decode("utf-8")
    return (
        f"<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='{lang}'>"
        f"<voice name='{tc.voice}'>"
        f"<prosody pitch='{tc.pitch}' rate='{tc.rate}' volume='{tc.volume}'>{escaped_text}</prosody>"
        "</voice></speak>"
    )


edge_comm.mkssml = _mkssml


# Warm the voice before the room is added: trim rumble, a little body around
# 200 Hz, ease the nasal 3 kHz edge and the hiss on s/sh.
TONE_FILTERS = ",".join(
    [
        "highpass=f=70",
        "equalizer=f=200:t=q:w=0.9:g=2.5",
        "equalizer=f=3100:t=q:w=1.3:g=-3",
        "deesser=i=0.35",
        "lowpass=f=9500",
    ]
)


def ffmpeg(*args: str, data: bytes | None = None) -> bytes:
    out = subprocess.run(["ffmpeg", "-y", "-loglevel", "error", *args], input=data, capture_output=True)
    if out.returncode != 0:
        raise RuntimeError(out.stderr.decode("utf-8", "replace")[-400:])
    return out.stdout


def room_ir() -> np.ndarray:
    """A small, dark room: 15 ms pre-delay, ~0.9 s tail of decaying noise."""
    rng = np.random.default_rng(7)
    n = int(SR * 0.9)
    t = np.arange(n) / SR
    tail = rng.standard_normal(n) * np.exp(-t * 6.9 / 0.75)
    # One-pole low-pass so the tail is softer than the voice.
    out = np.empty_like(tail)
    acc = 0.0
    for i, v in enumerate(tail):
        acc += 0.18 * (v - acc)
        out[i] = acc
    ir = np.concatenate([np.zeros(int(SR * 0.015)), out])
    return ir / np.sqrt(np.sum(ir**2))


ROOM = room_ir()


def convolve(x: np.ndarray, h: np.ndarray) -> np.ndarray:
    n = len(x) + len(h) - 1
    size = 1 << (n - 1).bit_length()
    y = np.fft.irfft(np.fft.rfft(x, size) * np.fft.rfft(h, size), size)
    return y[:n]


def frame_db(x: np.ndarray, hop: int) -> np.ndarray:
    n = len(x) // hop
    if n == 0:
        return np.zeros(0)
    fr = x[: n * hop].reshape(n, hop)
    return 20 * np.log10(np.sqrt(np.mean(fr**2, axis=1)) + 1e-9)


def stretch_pauses(
    x: np.ndarray, sentence: float, para: float, spread: dict | None = None, tail: float = 0.0
) -> tuple[np.ndarray, str]:
    """Lengthen the quiet gaps Edge leaves between sentences and paragraphs.

    Edge leaves ~0.15-0.25 s at a comma, ~0.25-0.45 s after a sentence and
    ~1.1-1.3 s at a blank line. Silence is inserted in the middle of each gap,
    so no breath or word edge is cut.

    With `spread`, the paragraph breaks are the N-1 longest gaps (N paragraphs
    in the text), and the time left before the end of the step is shared out
    after the paragraphs its rest map names.
    """
    if sentence <= 0 and para <= 0:
        return x, ""
    hop = SR // 100
    quiet = frame_db(x, hop) < -45
    if not len(quiet) or quiet.all():
        return x, ""
    voiced = np.flatnonzero(~quiet)
    first, last = voiced[0], voiced[-1]
    gaps: list[tuple[int, int]] = []
    i = first
    while i <= last:
        if not quiet[i]:
            i += 1
            continue
        j = i
        while j <= last and quiet[j]:
            j += 1
        gaps.append((i, j))
        i = j

    def length(g: tuple[int, int]) -> float:
        return (g[1] - g[0]) / 100

    if spread and spread["paragraphs"] > 1:
        longest = sorted(range(len(gaps)), key=lambda k: length(gaps[k]), reverse=True)
        breaks = sorted(k for k in longest[: spread["paragraphs"] - 1] if length(gaps[k]) >= 0.5)
    else:
        breaks = [k for k, g in enumerate(gaps) if length(g) >= 0.9]
    after = {gap: n for n, gap in enumerate(breaks)}

    extras = []
    for k, g in enumerate(gaps):
        if k in after:
            extras.append(max(0.0, para - length(g)))
        elif length(g) >= 0.28:
            extras.append(sentence)
        else:
            extras.append(0.0)

    note = ""
    if spread:
        rest = {n: w for n, w in spread["rest"].items() if n < len(breaks)}
        base = len(x) / SR + sum(extras) + tail
        free = spread["fill"] - SPREAD_MARGIN_S - base
        weight = sum(rest.values())
        given = 0.0
        if free > 0 and weight > 0:
            unit = free / weight
            for k, n in after.items():
                if n in rest:
                    add = min(rest[n] * unit, rest[n] * SPREAD_MAX_PER_WEIGHT_S)
                    extras[k] += add
                    given += add
        note = (
            f"paragraph breaks {len(breaks)}/{spread['paragraphs'] - 1}, speech {base:.0f}s, "
            f"quiet practice {given:.0f}s, total {base + given:.0f}s of {spread['fill']:.0f}s"
        )

    pieces = []
    cursor = 0
    for (i, j), extra in zip(gaps, extras):
        if extra > 0:
            mid = ((i + j) // 2) * hop
            pieces.append(x[cursor:mid])
            pieces.append(np.zeros(int(SR * extra), dtype=x.dtype))
            cursor = mid
    pieces.append(x[cursor:])
    return np.concatenate(pieces), note


def calm_finish(raw_mp3: Path, dest: Path, clip_id: str, spread: dict | None = None) -> str:
    prof = profile(clip_id)
    pcm = ffmpeg("-i", str(raw_mp3), "-af", TONE_FILTERS, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-")
    dry = np.frombuffer(pcm, dtype=np.float32).astype(np.float64)
    if len(dry) < SR // 4:
        raise RuntimeError("clip too short")
    dry, note = stretch_pauses(dry, prof["sentence"], prof["para"], spread, prof["tail"])

    # Steady speech level: -20 dBFS RMS over voiced frames only, so long
    # pauses do not pull the level up.
    db = frame_db(dry, SR // 100)
    hop = SR // 100
    voiced = db > -45
    fr = dry[: len(db) * hop].reshape(len(db), hop)
    rms = np.sqrt(np.mean(fr[voiced] ** 2)) if voiced.any() else np.sqrt(np.mean(dry**2))
    dry = dry * (10 ** (-20 / 20) / max(rms, 1e-6))

    wet = convolve(dry, ROOM)
    wet_rms = np.sqrt(np.mean(wet**2)) or 1.0
    dry_rms = np.sqrt(np.mean(dry**2)) or 1.0
    wet *= (dry_rms / wet_rms) * 10 ** (prof["room"] / 20)
    mix = np.concatenate([dry, np.zeros(len(wet) - len(dry))]) + wet
    mix = mix[: len(dry) + int(SR * prof["tail"])]

    # Soft start and a gentle fade into the room's tail.
    fade_in = min(len(mix), int(SR * 0.02))
    mix[:fade_in] *= np.linspace(0, 1, fade_in)
    fade_out = min(len(mix), int(SR * min(0.4, prof["tail"])))
    mix[-fade_out:] *= np.linspace(1, 0, fade_out)

    out = mix.astype(np.float32).tobytes()
    ffmpeg(
        "-f", "f32le", "-ac", "1", "-ar", str(SR), "-i", "-",
        "-af", "alimiter=limit=0.89:level=disabled",
        "-ar", str(SR), "-ac", "1", "-codec:a", "libmp3lame", "-q:a", "5",
        str(dest),
        data=out,
    )
    return note


def spoken_text(text: str) -> str:
    """Keep paragraph breaks; never wrap in SSML."""
    parts = [p.strip() for p in text.replace("\r\n", "\n").split("\n\n") if p.strip()]
    return "\n\n".join(parts)


async def bake_one(locale: str, clip_id: str, text: str, dest: Path, spread: dict | None = None) -> None:
    voice = VOICES[locale]
    line = spoken_text(text)
    if not line:
        raise RuntimeError("empty text")
    if "<speak" in line.lower() or "<prosody" in line.lower():
        raise RuntimeError("refusing SSML in meditation text")
    last = None
    tmp = dest.with_suffix(".raw.mp3")
    for attempt in range(5):
        # Name the language on a multilingual voice; if the service ever refuses
        # it, the last tries go without it and the log says so.
        pin = LANG_TAGS[locale] if multilingual(voice) and attempt < 3 else ""
        if multilingual(voice) and not pin:
            print(f"lang-unpinned {locale}:{clip_id}", flush=True)
        token = _pinned_lang.set(pin)
        try:
            comm = edge_tts.Communicate(line, voice, rate=voice_rate(locale, clip_id), pitch=voice_pitch(locale))
            await comm.save(str(tmp))
            if tmp.stat().st_size < 800:
                raise RuntimeError("tiny mp3")
            note = await asyncio.to_thread(calm_finish, tmp, dest, clip_id, spread)
            if note:
                print(f"spread {locale}:{clip_id}: {note}", flush=True)
            tmp.unlink(missing_ok=True)
            if dest.stat().st_size < 800:
                raise RuntimeError("tiny transcode")
            return
        except Exception as err:  # noqa: BLE001
            last = err
            print(f"retry {locale}:{clip_id}: {err}", flush=True)
            tmp.unlink(missing_ok=True)
            await asyncio.sleep(1.2 * (attempt + 1))
        finally:
            _pinned_lang.reset(token)
    raise RuntimeError(f"{locale}:{clip_id} failed: {last}")


async def worker(q: asyncio.Queue, made: list[int], skipped: list[int], failed: list[str]) -> None:
    while True:
        item = await q.get()
        if item is None:
            q.task_done()
            break
        locale, clip_id, text, dest, key, rel, spread = item
        try:
            if dest.exists() and dest.stat().st_size > 800:
                skipped[0] += 1
                print(f"skip {key}", flush=True)
            else:
                print(f"bake {key}", flush=True)
                await bake_one(locale, clip_id, text, dest, spread)
                made[0] += 1
        except Exception as err:  # noqa: BLE001
            failed.append(f"{key}: {err}")
            print(f"fail {key}: {err}", flush=True)
        q.task_done()


async def main() -> int:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    flags = [a for a in sys.argv[1:] if a.startswith("--")]
    prune = "--prune=none" not in flags
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
    manifest.setdefault("clips", {})
    clips_before = dict(manifest["clips"])
    q: asyncio.Queue = asyncio.Queue()
    planned: list[tuple[str, str]] = []
    for c in clips:
        locale = c["locale"]
        clip_id = c["id"]
        text = c["text"].strip()
        spread = spread_of(c)
        name = f"{hash_name(locale, clip_id, text, spread)}.mp3"
        dest = CLIPS_DIR / name
        key = f"{locale}:{clip_id}"
        rel = f"clips/{name}"
        planned.append((key, rel))
        await q.put((locale, clip_id, text, dest, key, rel, spread))

    made = [0]
    skipped = [0]
    failed: list[str] = []
    workers = [asyncio.create_task(worker(q, made, skipped, failed)) for _ in range(3)]
    for _ in workers:
        await q.put(None)
    await q.join()
    await asyncio.gather(*workers)

    replaced: set[str] = set()
    for key, rel in planned:
        path = ROOT / "public" / "voice" / rel
        if path.exists() and path.stat().st_size > 800:
            previous = manifest["clips"].get(key)
            if previous and previous != rel:
                replaced.add(previous)
            manifest["clips"][key] = rel

    # A re-baked clip leaves its old file behind; drop it unless another key
    # still points at it. Only files of clips baked in this run are touched.
    still_used = set(manifest["clips"].values())
    for rel in (replaced - still_used) if prune else set():
        stale = ROOT / "public" / "voice" / rel
        if stale.exists():
            stale.unlink()
            print(f"drop {rel}", flush=True)

    # Leave the manifest alone when nothing changed, so a no-op run makes no commit.
    if manifest["clips"] != clips_before:
        manifest["updated"] = datetime.now(timezone.utc).isoformat()
        manifest["medVoice"] = f"edge-plain/{TONE}"
        MANIFEST_PATH.write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"done new={made[0]} cached={skipped[0]} failed={len(failed)} med={len(planned)}")
    for line in failed:
        print(line)
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(asyncio.run(main()))
