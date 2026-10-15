"""request.txt-dəki hər mp3 faylını Whisper (az) ilə yazıya çevir."""
import sys, subprocess
import numpy as np
from faster_whisper import WhisperModel
req, out = sys.argv[1], sys.argv[2]
files = [l.strip() for l in open(req, encoding='utf-8') if l.strip() and not l.startswith('#')]
model = WhisperModel('small', device='cpu', compute_type='int8')
def load(p):
    raw = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', p, '-ac', '1', '-ar', '16000', '-f', 'f32le', '-'], capture_output=True).stdout
    return np.frombuffer(raw, np.float32).copy()
res = []
for f in files:
    try:
        segs, info = model.transcribe(load(f), language='az', beam_size=5)
        txt = ' '.join(s.text.strip() for s in segs)
        res.append(f'{f}\t{txt}')
    except Exception as e:  # noqa: BLE001
        res.append(f'{f}\tERROR {type(e).__name__}: {e}')
    print(res[-1], flush=True)
open(out, 'w', encoding='utf-8').write('\n'.join(res) + '\n')
