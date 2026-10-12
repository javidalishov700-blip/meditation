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

LOG = []
FAILS = []
def log(*a):
    line = " ".join(str(x) for x in a)
    print(line, flush=True); LOG.append(line)

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
        ok = False
        for attempt in range(4):
            try:
                await edge_tts.Communicate(text, voice, rate=rate, pitch=pitch).save(str(dest))
                if dest.stat().st_size > 1000:
                    ok = True
                    break
                log("empty", ln["id"])
            except Exception as e:  # noqa: BLE001
                log("retry", ln["id"], type(e).__name__, e)
            await asyncio.sleep(3 * (attempt + 1))
        if not ok:
            log("FAILED", ln["id"])
            FAILS.append(ln["id"])
            if len(FAILS) >= 2 and not any(v for v in man.values()):
                log("abort: service refuses")
                break
            if dest.exists() and dest.stat().st_size < 1000: dest.unlink()
            continue
        man[ln["id"]] = key
        log("ok", ln["id"], dest.stat().st_size)
    mpath.write_text(json.dumps(man, indent=1, ensure_ascii=False), "utf-8")
    (out / "log.txt").write_text("\n".join(LOG), "utf-8")

async def voices():
    try:
        import edge_tts.constants as c
        log("edge-tts", getattr(edge_tts, "__version__", "?"), getattr(c, "SEC_MS_GEC_VERSION", ""))
        vs = await edge_tts.list_voices()
        log("az voices:", [v["ShortName"] for v in vs if v["Locale"].startswith("az")], "total", len(vs))
    except Exception as e:  # noqa: BLE001
        log("list_voices error", type(e).__name__, e)

if __name__ == "__main__":
    asyncio.run(voices())
    for p in sys.argv[1:]:
        asyncio.run(bake(Path(p)))
