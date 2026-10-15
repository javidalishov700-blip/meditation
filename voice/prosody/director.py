"""Səsləndirməyə "rejissor" intonasiyası: vacib sözlərə ton vurğusu, əhvala görə diapazon və enmə (Praat PSOLA; müddət dəyişmir).
request2.json: {"src": ..., "dst": ..., "clips": {"L01a": {"mood": "epic", "emph": ["İsmayılsan"]}, ...}}"""
import json, os, re, sys
import parselmouth
from parselmouth.praat import call
req = json.load(open(sys.argv[1], encoding='utf-8'))
src, dst = req['src'], req['dst']
os.makedirs(dst, exist_ok=True)
MOOD = {'epic': (1.45, 1.03, -1.0, 3.0), 'calm': (1.30, 1.00, -1.0, 2.2), 'sad': (1.25, 0.95, -2.0, 2.0),
        'tense': (1.35, 1.00, -0.5, 2.6), 'proud': (1.40, 1.02, -1.0, 2.8)}
def norm(w): return re.sub(r'[^\wəğıöüşçİ]', '', w.lower().replace('İ', 'i'))
log = []
for cid, spec in req['clips'].items():
    try:
        mp = os.path.join(src, cid + '.mp3')
        snd = parselmouth.Sound(mp)
        dur = snd.get_total_duration()
        words = []
        wp = os.path.join(src, cid + '.words.json')
        if os.path.exists(wp):
            words = [w for w in json.load(open(wp, encoding='utf-8')) if w.get('t') == 'W']
        k, ms, decl, amp = MOOD[spec.get('mood', 'calm')]
        pitch = snd.to_pitch(0.01, 70, 320)
        med = call(pitch, 'Get quantile', 0, 0, 0.5, 'Hertz')
        terms = []
        used = set()
        hits = []
        for e in spec.get('emph', []):
            ne = norm(e)
            for i, w in enumerate(words):
                if i in used: continue
                if norm(w['w']) == ne or (len(ne) > 3 and norm(w['w']).startswith(ne)):
                    used.add(i)
                    c = w['o'] + 0.35 * w['d']; wd = max(0.07, 0.35 * w['d'])
                    terms.append(f'{amp:.2f}*exp(-((x-{c:.3f})/{wd:.3f})^2)')
                    hits.append(f"{w['w']}@{w['o']:.2f}")
                    break
        bump = '+'.join(terms) if terms else '0'
        f = f'{med:.2f}*{ms}*(self/{med:.2f})^{k}*2^(({bump}+({decl})*x/{dur:.3f})/12)'
        manip = call(snd, 'To Manipulation', 0.01, 70, 320)
        pt = call(manip, 'Extract pitch tier')
        call(pt, 'Formula', f)
        call([pt, manip], 'Replace pitch tier')
        out = call(manip, 'Get resynthesis (overlap-add)')
        out.save(os.path.join(dst, cid + '.flac'), 'FLAC')
        log.append(f'ok {cid} med {med:.0f} mood {spec.get("mood")} hits {hits} words {len(words)}')
    except Exception as ex:  # noqa: BLE001
        log.append(f'FAIL {cid} {type(ex).__name__}: {ex}')
    print(log[-1], flush=True)
open(os.path.join(dst, 'log.txt'), 'w', encoding='utf-8').write('\n'.join(log) + '\n')
