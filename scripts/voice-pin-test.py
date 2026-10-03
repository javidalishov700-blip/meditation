#!/usr/bin/env python3
"""Try ways to keep a multilingual Edge voice in Turkish on short lines.
Writes store/voice-test/<variant>.mp3 and prints which variants the service
accepted. Temporary; removed once a variant is chosen."""
from __future__ import annotations

import asyncio
import importlib.util
from pathlib import Path

import edge_tts
import edge_tts.communicate as edge_comm

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "store" / "voice-test"
spec = importlib.util.spec_from_file_location("bake", ROOT / "scripts" / "bake-med-edge.py")
bake = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bake)

VOICE = "de-DE-SeraphinaMultilingualNeural"
TEXT = (
    "Hoş geldin. Şimdi birkaç dakikayı yalnızca kendine ayırıyorsun.\n\n"
    "İstersen gözlerini kapat. İstemezsen bakışını önünde bir noktaya bırak.\n\n"
    "Nefes al… ve bırak.\n\nİyi geceler."
)


def envelope(variant: str):
    def make(tc, text):  # noqa: ANN001
        if isinstance(text, bytes):
            text = text.decode("utf-8")
        root = "tr-TR" if variant != "a-otomatik" else "en-US"
        body = f"<prosody pitch='{tc.pitch}' rate='{tc.rate}' volume='{tc.volume}'>{text}</prosody>"
        if variant == "c-lang-icte":
            body = f"<prosody pitch='{tc.pitch}' rate='{tc.rate}' volume='{tc.volume}'><lang xml:lang='tr-TR'>{text}</lang></prosody>"
        return (
            f"<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='{root}'>"
            f"<voice name='{tc.voice}'>{body}</voice></speak>"
        )

    return make


async def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for variant in ["a-otomatik", "b-kok-dil", "c-lang-icte"]:
        edge_comm.mkssml = envelope(variant)
        tmp = OUT / f"{variant}.raw.mp3"
        try:
            await edge_tts.Communicate(TEXT, VOICE, rate="-6%", pitch="+0Hz").save(str(tmp))
            bake.calm_finish(tmp, OUT / f"{variant}.mp3", "med:test")
            print(f"accepted {variant}", flush=True)
        except Exception as err:  # noqa: BLE001
            print(f"refused  {variant}: {err}", flush=True)
        finally:
            tmp.unlink(missing_ok=True)


asyncio.run(main())
