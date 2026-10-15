"""Səsləndirmənin intonasiyasını canlandır: Praat PSOLA ilə ton diapazonunu genişləndir (müddət dəyişmir).
request.json: {"src": "voice/out/ismayil3", "dst": "voice/prosody/out/ismayil3_k125", "k": 1.25, "files": [...] | null}"""
import json, os, sys, glob
import parselmouth
from parselmouth.praat import call
req = json.load(open(sys.argv[1], encoding='utf-8'))
src, dst, k = req['src'], req['dst'], float(req['k'])
os.makedirs(dst, exist_ok=True)
files = req.get('files') or sorted(os.path.basename(p) for p in glob.glob(os.path.join(src, '*.mp3')))
log = []
for f in files:
    try:
        snd = parselmouth.Sound(os.path.join(src, f))
        pitch = snd.to_pitch(0.01, 70, 320)
        med = call(pitch, 'Get quantile', 0, 0, 0.5, 'Hertz')
        manip = call(snd, 'To Manipulation', 0.01, 70, 320)
        pt = call(manip, 'Extract pitch tier')
        call(pt, 'Formula', f'{med} * (self / {med}) ^ {k}')
        call([pt, manip], 'Replace pitch tier')
        out = call(manip, 'Get resynthesis (overlap-add)')
        out.save(os.path.join(dst, f.rsplit('.', 1)[0] + '.flac'), 'FLAC')
        log.append(f'ok {f} med {med:.1f}')
    except Exception as e:  # noqa: BLE001
        log.append(f'FAIL {f} {type(e).__name__}: {e}')
    print(log[-1], flush=True)
open(os.path.join(dst, 'log.txt'), 'w').write('\n'.join(log) + '\n')
