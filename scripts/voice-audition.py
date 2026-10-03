#!/usr/bin/env python3
"""Read the opening of the first meditation with several Edge voices, so the
narrator can be chosen by ear. Every sample gets the same calm finish as the
real clips. Output: store/voice-audition/<lang>-<n>-<name>.mp3 (not shipped).

  python scripts/voice-audition.py <clips.json from dump-voice-clips.ts med>
"""
from __future__ import annotations

import asyncio
import importlib.util
import json
import sys
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "store" / "voice-audition"

spec = importlib.util.spec_from_file_location("bake", ROOT / "scripts" / "bake-med-edge.py")
bake = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bake)

RATE = "-6%"
CANDIDATES = [
    ("tr", "1-emel", "tr-TR-EmelNeural"),
    ("tr", "2-emma", "en-US-EmmaMultilingualNeural"),
    ("tr", "3-ava", "en-US-AvaMultilingualNeural"),
    ("tr", "4-seraphina", "de-DE-SeraphinaMultilingualNeural"),
    ("tr", "5-vivienne", "fr-FR-VivienneMultilingualNeural"),
    ("tr", "6-andrew-erkek", "en-US-AndrewMultilingualNeural"),
    ("tr", "7-ahmet-erkek", "tr-TR-AhmetNeural"),
    ("az", "1-banu", "az-AZ-BanuNeural"),
    ("az", "2-emma", "en-US-EmmaMultilingualNeural"),
    ("az", "3-seraphina", "de-DE-SeraphinaMultilingualNeural"),
    ("az", "4-babek-erkek", "az-AZ-BabekNeural"),
    ("ru", "1-svetlana", "ru-RU-SvetlanaNeural"),
    ("ru", "2-emma", "en-US-EmmaMultilingualNeural"),
    ("ru", "3-seraphina", "de-DE-SeraphinaMultilingualNeural"),
    ("ru", "4-dmitry-erkek", "ru-RU-DmitryNeural"),
]


def opening(clips: list[dict], locale: str) -> str:
    text = next(c["text"] for c in clips if c["locale"] == locale and c["id"] == "med:first-settle")
    return "\n\n".join([p.strip() for p in text.split("\n\n") if p.strip()][:4])


async def one(gate: asyncio.Semaphore, locale: str, label: str, voice: str, text: str) -> str:
    dest = OUT / f"{locale}-{label}.mp3"
    tmp = OUT / f"{locale}-{label}.raw.mp3"
    try:
        async with gate:
            await edge_tts.Communicate(text, voice, rate=RATE).save(str(tmp))
        await asyncio.to_thread(bake.calm_finish, tmp, dest, "med:audition")
        return f"ok   {dest.name}"
    except Exception as err:  # noqa: BLE001
        return f"fail {dest.name}: {err}"
    finally:
        tmp.unlink(missing_ok=True)


async def main() -> int:
    clips = json.loads(Path(sys.argv[1]).read_text())
    OUT.mkdir(parents=True, exist_ok=True)
    for old in OUT.glob("*.mp3"):
        old.unlink()
    gate = asyncio.Semaphore(3)
    results = await asyncio.gather(
        *(one(gate, loc, label, voice, opening(clips, loc)) for loc, label, voice in CANDIDATES)
    )
    print("\n".join(results))
    return 0 if any(r.startswith("ok") for r in results) else 1


if __name__ == "__main__":
    raise SystemExit(asyncio.run(main()))
