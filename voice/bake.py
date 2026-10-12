#!/usr/bin/env python3
""""Nə olardı?" TikTok videoları üçün səsləndirmə — Microsoft Edge neural səsləri.

meditation tətbiqindəki kimi: SSML yox, sadə mətn; rate/pitch konstruktorda.
voice/lines/<ad>.json -> voice/out/<ad>/<id>.mp3 (+ manifest.json)
Mətni dəyişməyən kliplər yenidən sintez olunmur.
"""
import asyncio, hashlib, json, sys
from pathlib import Path
import edge_tts

ROOT = Path(__file__).resolve().parent

def h(voice, rate, pitch, text):
    return hashlib.sha1(f"{voice}|{rate}|{pitch}|{text}".encode()).hexdigest()[:12]

async def bake(path: Path):
    d = json.loads(path.read_text("utf-8"))
    out = ROOT / "out" / d["name"]; out.mkdir(parents=True, exist_ok=True)
    mpath = out / "manifest.json"
    man = json.loads(mpath.read_text("utf-8")) if mpath.exists() else {}
    voice, rate, pitch = d["voice"], d.get("rate", "+0%"), d.get("pitch", "+0Hz")
    for ln in d["lines"]:
        text = ln["say"].strip()
        if "<speak" in text.lower():
            raise SystemExit("SSML olmaz")
        key = h(voice, rate, pitch, text)
        dest = out / f"{ln['id']}.mp3"
        if man.get(ln["id"]) == key and dest.exists():
            continue
        for attempt in range(4):
            try:
                await edge_tts.Communicate(text, voice, rate=rate, pitch=pitch).save(str(dest))
                break
            except Exception as e:  # noqa: BLE001
                print("retry", ln["id"], e, flush=True)
                await asyncio.sleep(3 * (attempt + 1))
        else:
            raise SystemExit(f"alınmadı: {ln['id']}")
        man[ln["id"]] = key
        print("ok", ln["id"], flush=True)
    mpath.write_text(json.dumps(man, indent=1, ensure_ascii=False), "utf-8")

if __name__ == "__main__":
    for p in sys.argv[1:]:
        asyncio.run(bake(Path(p)))
