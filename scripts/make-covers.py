#!/usr/bin/env python3
"""Abstract Steady covers, skill marks, and presence dots. No stock photos."""
from __future__ import annotations

import hashlib
import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
COVERS = ROOT / "public" / "covers"
SKILLS = ROOT / "public" / "skills"

COVER_NAMES = [
    "mountain",
    "lighthouse",
    "moon",
    "clouds",
    "palms",
    "forest",
    "lake",
    "nebula",
    "kids",
    "myth",
    "talk",
    "work",
    "news",
    "guide",
    "podcast",
    "path",
    "radio",
    "freeze",
    "cat",
    "well",
    "room",
    "task",
    "about-sleep",
    "kind",
    "54321",
    "roomsound",
    "objects",
    "tension",
    "wave",
    "box",
    "478",
    "sigh",
    "equal",
    "count8",
]

SND_NAMES = [
    "rain",
    "ocean",
    "forest",
    "fire",
    "wind",
    "night",
    "storm",
    "river",
    "birds",
    "cafe",
    "snow",
    "bowl",
    "fan",
    "waves",
    "piano",
    "drone",
    "ohm",
    "chime",
    "crystal",
    "gong",
    "swell",
    "harp",
    "white",
    "pink",
    "brown",
    "radio",
    "174",
    "396",
    "417",
    "528",
    "639",
    "741",
    "852",
]

SKILL_NAMES = [
    "wellbeing",
    "performance",
    "focus",
    "sleep",
    "breath",
    "ground",
    "kindness",
    "patience",
    "presence",
    "body",
    "night",
    "courage",
]

# Hand palettes: (top, bottom, accent)
PALETTE: dict[str, tuple[tuple[int, int, int], tuple[int, int, int], tuple[int, int, int]]] = {
    "mountain": ((18, 14, 36), (8, 8, 16), (156, 140, 210)),
    "lighthouse": ((16, 20, 42), (8, 10, 20), (244, 196, 140)),
    "moon": ((10, 12, 28), (6, 6, 14), (230, 220, 255)),
    "clouds": ((28, 24, 48), (12, 12, 24), (180, 176, 210)),
    "palms": ((14, 28, 32), (8, 12, 18), (80, 160, 140)),
    "forest": ((10, 22, 20), (6, 10, 12), (70, 130, 100)),
    "lake": ((12, 22, 40), (6, 10, 20), (120, 170, 210)),
    "nebula": ((28, 10, 40), (8, 6, 18), (200, 110, 180)),
    "kids": ((36, 22, 48), (14, 10, 24), (240, 180, 160)),
    "myth": ((22, 14, 18), (10, 6, 12), (210, 160, 90)),
    "talk": ((20, 16, 36), (10, 8, 18), (180, 150, 230)),
    "work": ((18, 18, 28), (8, 8, 14), (140, 150, 180)),
    "news": ((16, 18, 32), (8, 8, 16), (160, 170, 200)),
    "guide": ((20, 16, 40), (8, 8, 18), (170, 140, 230)),
    "podcast": ((24, 14, 36), (10, 8, 18), (200, 130, 190)),
    "path": ((16, 20, 28), (8, 10, 14), (170, 160, 130)),
    "radio": ((22, 16, 30), (10, 8, 16), (210, 140, 120)),
    "freeze": ((12, 20, 40), (6, 10, 18), (160, 200, 230)),
    "cat": ((24, 16, 28), (10, 8, 14), (220, 170, 130)),
    "well": ((16, 18, 24), (8, 8, 12), (140, 150, 150)),
    "room": ((22, 16, 28), (10, 8, 14), (200, 160, 120)),
    "task": ((18, 18, 32), (8, 8, 16), (150, 160, 200)),
    "about-sleep": ((12, 10, 28), (6, 6, 14), (180, 150, 220)),
    "kind": ((28, 16, 32), (12, 8, 16), (230, 150, 170)),
    "54321": ((18, 14, 36), (8, 8, 16), (180, 150, 230)),
    "roomsound": ((16, 16, 30), (8, 8, 16), (140, 170, 200)),
    "objects": ((20, 16, 32), (8, 8, 16), (200, 170, 140)),
    "tension": ((28, 12, 24), (10, 6, 12), (210, 110, 130)),
    "wave": ((12, 20, 40), (6, 10, 18), (120, 180, 210)),
    "box": ((18, 16, 32), (8, 8, 16), (160, 150, 210)),
    "478": ((16, 14, 36), (8, 8, 16), (170, 140, 220)),
    "sigh": ((22, 16, 30), (10, 8, 16), (200, 160, 180)),
    "equal": ((16, 18, 34), (8, 8, 16), (150, 160, 210)),
    "count8": ((18, 14, 32), (8, 8, 16), (180, 150, 200)),
}


def rng_for(name: str) -> random.Random:
    return random.Random(int(hashlib.sha256(name.encode()).hexdigest()[:12], 16))


def mix(a: tuple[int, int, int], b: tuple[int, int, int], t: float) -> tuple[int, int, int]:
    return (
        int(a[0] + (b[0] - a[0]) * t),
        int(a[1] + (b[1] - a[1]) * t),
        int(a[2] + (b[2] - a[2]) * t),
    )


def hashed_palette(name: str) -> tuple[tuple[int, int, int], tuple[int, int, int], tuple[int, int, int]]:
    if name in PALETTE:
        return PALETTE[name]
    r = rng_for(name + ":pal")
    top = (12 + r.randint(0, 20), 8 + r.randint(0, 16), 20 + r.randint(0, 28))
    bot = (6 + r.randint(0, 8), 6 + r.randint(0, 8), 10 + r.randint(0, 12))
    acc = (120 + r.randint(0, 100), 90 + r.randint(0, 90), 140 + r.randint(0, 90))
    return top, bot, acc


def gradient(size: tuple[int, int], top: tuple[int, int, int], bot: tuple[int, int, int]) -> Image.Image:
    w, h = size
    im = Image.new("RGB", size)
    px = im.load()
    for y in range(h):
        t = y / max(1, h - 1)
        # slight left-right tilt
        c = mix(top, bot, t**1.15)
        for x in range(w):
            wobble = (x / w - 0.5) * 0.08
            px[x, y] = mix(c, top if wobble < 0 else bot, abs(wobble))
    return im


def add_grain(im: Image.Image, name: str, amount: float = 0.11) -> Image.Image:
    r = rng_for(name + ":grain")
    noise = Image.effect_noise(im.size, 26 + r.randint(0, 10)).convert("RGB")
    noise = ImageEnhance.Contrast(noise).enhance(1.4)
    return Image.blend(im, noise, amount)


def ellipse(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], fill: tuple[int, int, int], blur: Image.Image | None = None) -> None:
    draw.ellipse(box, fill=fill)


def draw_motif(im: Image.Image, name: str, accent: tuple[int, int, int]) -> Image.Image:
    w, h = im.size
    layer = Image.new("RGBA", im.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    r = rng_for(name + ":motif")
    a = (*accent, 170)
    a_soft = (*accent, 70)
    a_hard = (*mix(accent, (255, 255, 255), 0.25), 210)

    key = name.split("-")[-1] if name.startswith("snd-") or name.startswith("skill-") else name

    def orb(cx: float, cy: float, rad: float, col: tuple[int, int, int, int]) -> None:
        d.ellipse((cx - rad, cy - rad, cx + rad, cy + rad), fill=col)

    if key in {"moon", "night", "about-sleep"}:
        orb(w * 0.68, h * 0.28, w * 0.18, a_soft)
        orb(w * 0.74, h * 0.26, w * 0.14, (*mix(accent, (8, 8, 16), 0.35), 230))
        orb(w * 0.62, h * 0.30, w * 0.055, a_hard)
    elif key in {"lighthouse", "guide"}:
        d.polygon(
            [(w * 0.46, h * 0.22), (w * 0.54, h * 0.22), (w * 0.58, h * 0.78), (w * 0.42, h * 0.78)],
            fill=a,
        )
        d.polygon([(w * 0.50, h * 0.12), (w * 0.62, h * 0.28), (w * 0.38, h * 0.28)], fill=a_hard)
        d.rectangle((0, h * 0.42, w, h * 0.46), fill=(*accent, 40))
    elif key in {"mountain", "path"}:
        d.polygon([(0, h * 0.82), (w * 0.32, h * 0.42), (w * 0.55, h * 0.70), (w, h * 0.50), (w, h), (0, h)], fill=a_soft)
        d.polygon([(w * 0.18, h), (w * 0.48, h * 0.38), (w * 0.78, h)], fill=a)
    elif key in {"forest", "palms"}:
        for i in range(7):
            x = w * (0.12 + i * 0.12)
            d.polygon([(x, h * 0.82), (x + w * 0.04, h * (0.28 + (i % 3) * 0.06)), (x + w * 0.08, h * 0.82)], fill=a if i % 2 else a_soft)
        d.rectangle((0, h * 0.78, w, h), fill=(*mix(accent, (6, 10, 8), 0.6), 160))
    elif key in {"lake", "ocean", "waves", "wave", "river"}:
        for i, yy in enumerate((0.52, 0.62, 0.72, 0.82)):
            d.arc((-w * 0.2, h * yy, w * 1.2, h * (yy + 0.28)), 0, 180, fill=a if i % 2 == 0 else a_soft, width=max(4, w // 48))
        orb(w * 0.7, h * 0.22, w * 0.08, a_hard)
    elif key in {"clouds", "wind", "snow"}:
        for cx, cy, rad in ((0.3, 0.32, 0.16), (0.48, 0.28, 0.2), (0.68, 0.34, 0.14), (0.4, 0.42, 0.12)):
            orb(w * cx, h * cy, w * rad, a_soft)
    elif key in {"nebula", "myth", "crystal"}:
        orb(w * 0.5, h * 0.42, w * 0.28, a_soft)
        orb(w * 0.38, h * 0.36, w * 0.1, a_hard)
        orb(w * 0.62, h * 0.48, w * 0.07, a)
        for _ in range(18):
            x, y = r.randint(20, w - 20), r.randint(20, int(h * 0.7))
            d.ellipse((x, y, x + 3, y + 3), fill=a_hard)
    elif key in {"kids", "cat", "kind"}:
        orb(w * 0.5, h * 0.42, w * 0.16, a)
        orb(w * 0.38, h * 0.58, w * 0.09, a_soft)
        orb(w * 0.62, h * 0.58, w * 0.09, a_soft)
    elif key in {"talk", "podcast", "radio"}:
        orb(w * 0.5, h * 0.38, w * 0.12, a)
        d.arc((w * 0.28, h * 0.22, w * 0.72, h * 0.66), 200, 340, fill=a_hard, width=max(5, w // 40))
        d.arc((w * 0.18, h * 0.14, w * 0.82, h * 0.76), 200, 340, fill=a_soft, width=max(4, w // 50))
    elif key in {"work", "task", "news"}:
        d.rounded_rectangle((w * 0.22, h * 0.28, w * 0.78, h * 0.72), radius=w * 0.04, outline=a, width=max(5, w // 36))
        d.line((w * 0.32, h * 0.42, w * 0.68, h * 0.42), fill=a_hard, width=max(3, w // 80))
        d.line((w * 0.32, h * 0.52, w * 0.58, h * 0.52), fill=a_soft, width=max(3, w // 80))
        d.line((w * 0.32, h * 0.62, w * 0.64, h * 0.62), fill=a_soft, width=max(3, w // 80))
    elif key in {"well", "bowl", "gong", "ohm"}:
        d.arc((w * 0.22, h * 0.34, w * 0.78, h * 0.78), 10, 170, fill=a, width=max(8, w // 22))
        orb(w * 0.5, h * 0.36, w * 0.06, a_hard)
    elif key in {"room", "objects", "54321"}:
        d.rectangle((w * 0.22, h * 0.28, w * 0.78, h * 0.72), outline=a, width=max(5, w // 36))
        orb(w * 0.36, h * 0.48, w * 0.05, a_hard)
        d.rectangle((w * 0.48, h * 0.44, w * 0.62, h * 0.58), fill=a_soft)
        d.polygon([(w * 0.66, h * 0.58), (w * 0.72, h * 0.44), (w * 0.78, h * 0.58)], fill=a)
    elif key in {"box", "equal"}:
        d.rounded_rectangle((w * 0.28, h * 0.32, w * 0.72, h * 0.68), radius=w * 0.03, outline=a_hard, width=max(6, w // 28))
    elif key in {"478", "count8", "sigh", "tension"}:
        for i, yy in enumerate((0.34, 0.48, 0.62)):
            d.arc((w * 0.2, h * yy, w * 0.8, h * (yy + 0.16)), 200, 340, fill=a if i != 1 else a_hard, width=max(5, w // 36))
    elif key in {"roomsound", "chime", "harp", "piano", "drone", "swell"}:
        for i in range(5):
            x = w * (0.22 + i * 0.13)
            ht = h * (0.28 + (i % 3) * 0.08)
            d.rectangle((x, ht, x + w * 0.04, h * 0.72), fill=a if i % 2 == 0 else a_soft)
    elif key in {"rain", "storm"}:
        for _ in range(28):
            x = r.randint(10, w - 10)
            y = r.randint(int(h * 0.12), int(h * 0.7))
            d.line((x, y, x - 6, y + 28), fill=a_hard, width=2)
        d.ellipse((w * 0.2, h * 0.12, w * 0.8, h * 0.36), fill=a_soft)
    elif key in {"fire"}:
        d.polygon([(w * 0.32, h * 0.72), (w * 0.5, h * 0.28), (w * 0.68, h * 0.72)], fill=a)
        d.polygon([(w * 0.4, h * 0.72), (w * 0.5, h * 0.42), (w * 0.6, h * 0.72)], fill=a_hard)
    elif key in {"cafe", "fan"}:
        orb(w * 0.5, h * 0.46, w * 0.16, a_soft)
        for ang in range(0, 360, 45):
            rad = math.radians(ang)
            d.line(
                (w * 0.5, h * 0.46, w * 0.5 + math.cos(rad) * w * 0.22, h * 0.46 + math.sin(rad) * w * 0.22),
                fill=a,
                width=max(3, w // 70),
            )
    elif key in {"birds"}:
        for cx, cy in ((0.3, 0.36), (0.5, 0.28), (0.68, 0.4)):
            d.arc((w * (cx - 0.08), h * (cy - 0.04), w * cx, h * (cy + 0.04)), 200, 350, fill=a_hard, width=3)
            d.arc((w * cx, h * (cy - 0.04), w * (cx + 0.08), h * (cy + 0.04)), 190, 340, fill=a_hard, width=3)
    elif key in {"white", "pink", "brown"}:
        orb(w * 0.5, h * 0.45, w * 0.22, a_soft)
        orb(w * 0.5, h * 0.45, w * 0.08, a_hard)
    elif key in {"174", "396", "417", "528", "639", "741", "852"}:
        n = int(key[0])
        for i in range(3 + n % 3):
            rad = w * (0.1 + i * 0.08)
            d.ellipse((w * 0.5 - rad, h * 0.42 - rad, w * 0.5 + rad, h * 0.42 + rad), outline=a if i % 2 == 0 else a_soft, width=max(3, w // 60))
    elif key in {"freeze"}:
        d.polygon([(w * 0.5, h * 0.22), (w * 0.68, h * 0.5), (w * 0.5, h * 0.78), (w * 0.32, h * 0.5)], fill=a_soft)
        d.polygon([(w * 0.5, h * 0.32), (w * 0.6, h * 0.5), (w * 0.5, h * 0.68), (w * 0.4, h * 0.5)], fill=a_hard)
    else:
        orb(w * 0.62, h * 0.3, w * 0.16, a_soft)
        orb(w * 0.36, h * 0.58, w * 0.22, a)
        d.arc((w * 0.18, h * 0.22, w * 0.82, h * 0.78), 200, 40, fill=a_hard, width=max(4, w // 40))

    # still-point mark, faint
    orb(w * 0.5, h * 0.88, w * 0.035, (*mix(accent, (249, 168, 212), 0.5), 140))
    blurred = layer.filter(ImageFilter.GaussianBlur(radius=max(1, w // 180)))
    out = im.convert("RGBA")
    out = Image.alpha_composite(out, blurred)
    out = Image.alpha_composite(out, layer)
    return out.convert("RGB")


def compact(im: Image.Image, colors: int = 72) -> Image.Image:
    return im.quantize(colors=colors, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.FLOYDSTEINBERG)


def make_cover(name: str, size: tuple[int, int] = (540, 720)) -> Image.Image:
    top, bot, acc = hashed_palette(name)
    im = gradient(size, top, bot)
    im = draw_motif(im, name, acc)
    im = add_grain(im, name, 0.08)
    im = im.filter(ImageFilter.SMOOTH)
    return compact(im)


def make_skill(name: str) -> Image.Image:
    top, bot, acc = hashed_palette(name)
    im = gradient((256, 256), top, bot)
    im = draw_motif(im, f"skill-{name}", acc)
    im = add_grain(im, f"skill-{name}", 0.07)
    mask = Image.new("L", im.size, 0)
    ImageDraw.Draw(mask).ellipse((6, 6, 250, 250), fill=255)
    bg = Image.new("RGB", im.size, bot)
    bg.paste(im, mask=mask)
    return compact(bg, 56)


def make_face(i: int) -> Image.Image:
    hues = [
        ((40, 28, 56), (180, 140, 210)),
        ((28, 36, 56), (140, 170, 210)),
        ((40, 24, 36), (220, 150, 170)),
        ((24, 36, 36), (140, 190, 170)),
        ((36, 28, 24), (220, 180, 140)),
        ((28, 24, 48), (170, 150, 230)),
    ]
    bg, acc = hues[i % len(hues)]
    im = Image.new("RGB", (128, 128), bg)
    d = ImageDraw.Draw(im)
    d.ellipse((24, 18, 104, 98), fill=acc)
    d.ellipse((46, 46, 60, 60), fill=mix(acc, (20, 16, 28), 0.45))
    d.ellipse((72, 46, 86, 60), fill=mix(acc, (20, 16, 28), 0.45))
    d.arc((48, 58, 80, 86), 20, 160, fill=mix(acc, (20, 16, 28), 0.35), width=3)
    im = add_grain(im, f"face-{i}", 0.06)
    return compact(im.filter(ImageFilter.SMOOTH), 40)


def save(im: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    im.save(path, "PNG", optimize=True, compress_level=9)


def main() -> None:
    COVERS.mkdir(parents=True, exist_ok=True)
    SKILLS.mkdir(parents=True, exist_ok=True)
    for name in COVER_NAMES:
        save(make_cover(name), COVERS / f"cover-{name}.png")
    for name in SND_NAMES:
        save(make_cover(name), COVERS / f"snd-{name}.png")
    for name in SKILL_NAMES:
        save(make_skill(name), SKILLS / f"skill-{name}.png")
    for i in range(1, 7):
        save(make_face(i), COVERS / f"face-{i}.png")
    print(f"wrote {len(COVER_NAMES)} covers, {len(SND_NAMES)} sounds, {len(SKILL_NAMES)} skills, 6 faces")


if __name__ == "__main__":
    main()
