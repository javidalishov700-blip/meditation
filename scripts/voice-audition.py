#!/usr/bin/env python3
"""Read the same Turkish passage with a few narrator setups, so the voice can
be chosen by ear. Each sample goes through the real bake path (language pin,
rate, calm finish), so it sounds exactly like the shipped clips would.
Output: store/voice-audition/tr-<n>-<name>.mp3 (not shipped in the app).

  python scripts/voice-audition.py <clips.json from dump-voice-clips.ts lib>
"""
from __future__ import annotations

import asyncio
import importlib.util
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "store" / "voice-audition"

spec = importlib.util.spec_from_file_location("bake", ROOT / "scripts" / "bake-med-edge.py")
bake = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bake)


def joined_short(text: str, limit: int = 40) -> str:
    """Fold short sentences into their neighbour with a comma, so a
    multilingual voice always has a long Turkish sentence to recognise."""
    out = []
    for para in text.split("\n\n"):
        parts = [s.strip() for s in re.split(r"(?<=[.!?])\s+", para.strip()) if s.strip()]
        merged: list[str] = []
        for s in parts:
            if merged and (len(s) < limit or len(merged[-1]) < limit):
                merged[-1] = merged[-1].rstrip(".!?") + ", " + s[0].lower() + s[1:]
            else:
                merged.append(s)
        out.append(" ".join(merged))
    return "\n\n".join(out)


CANDIDATES = [
    ("1-seraphina-simdiki", "de-DE-SeraphinaMultilingualNeural", False),
    ("2-seraphina-kisa-cumleler-birlesik", "de-DE-SeraphinaMultilingualNeural", True),
    ("3-emel-turkce", "tr-TR-EmelNeural", False),
    ("4-ahmet-turkce-erkek", "tr-TR-AhmetNeural", False),
    ("5-emma-cok-dilli", "en-US-EmmaMultilingualNeural", True),
]


def passage(clips: list[dict]) -> str:
    def text(cid: str) -> list[str]:
        t = next(c["text"] for c in clips if c["locale"] == "tr" and c["id"] == cid)
        return [p.strip() for p in t.split("\n\n") if p.strip()]

    story = text("lib:lighthouse")[:4]
    counting = text("lib:c9")[2:5]
    return "\n\n".join(story + counting)


async def main() -> int:
    clips = json.loads(Path(sys.argv[1]).read_text())
    OUT.mkdir(parents=True, exist_ok=True)
    for old in OUT.glob("*.mp3"):
        old.unlink()
    base = passage(clips)
    results = []
    for label, voice, fold in CANDIDATES:
        bake.VOICES["tr"] = voice
        dest = OUT / f"tr-{label}.mp3"
        try:
            await bake.bake_one("tr", "lib:audition", joined_short(base) if fold else base, dest)
            results.append(f"ok   {dest.name}")
        except Exception as err:  # noqa: BLE001
            results.append(f"fail {dest.name}: {err}")
    print("\n".join(results))
    return 0 if any(r.startswith("ok") for r in results) else 1


if __name__ == "__main__":
    raise SystemExit(asyncio.run(main()))
