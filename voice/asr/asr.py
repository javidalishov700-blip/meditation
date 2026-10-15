"""request.txt-dəki hər mp3 faylını Whisper (az) ilə yazıya çevir."""
import sys, subprocess
import numpy as np
from faster_whisper import WhisperModel
req, out = sys.argv[1], sys.argv[2]
files = [l.strip() for l in open(req, encoding='utf-8') if l.strip() and not l.startswith('#')]
model = WhisperModel('small', device='cpu', compute_type='int8')
def load(p):
    import av
    c = av.open(p)
    rs = av.AudioResampler(format='flt', layout='mono', rate=16000)
    out = []
    for fr in c.decode(audio=0):
        res = rs.resample(fr)
        for r in (res if isinstance(res, list) else [res]):
            if r is not None: out.append(r.to_ndarray().reshape(-1))
    for r in (rs.resample(None) or []):
        out.append(r.to_ndarray().reshape(-1))
    return np.concatenate(out).astype(np.float32)
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
