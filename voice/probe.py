import asyncio, sys, edge_tts
async def main():
    try:
        await edge_tts.Communicate("Salam.", "az-AZ-BabekNeural").save("/tmp/probe.mp3")
        import os
        sys.exit(0 if os.path.getsize("/tmp/probe.mp3") > 1000 else 1)
    except Exception as e:  # noqa: BLE001
        print("probe:", type(e).__name__, str(e)[:120]); sys.exit(1)
asyncio.run(main())
