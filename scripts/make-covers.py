#!/usr/bin/env python3
"""Soft dusk/mist covers, skill marks, and presence dots. No stock photos."""
from __future__ import annotations

import hashlib
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

# (top, bottom, accent) — dusk, water, ember. Accents stay close to the field.
PALETTE: dict[str, tuple[tuple[int, int, int], tuple[int, int, int], tuple[int, int, int]]] = {
    "mountain": ((18, 16, 28), (8, 8, 14), (110, 108, 128)),
    "lighthouse": ((16, 18, 30), (7, 8, 14), (168, 142, 118)),
    "moon": ((12, 14, 26), (5, 6, 12), (168, 170, 186)),
    "clouds": ((22, 20, 32), (10, 10, 18), (140, 138, 154)),
    "palms": ((14, 22, 24), (6, 10, 12), (70, 110, 100)),
    "forest": ((10, 18, 16), (5, 8, 8), (58, 88, 72)),
    "lake": ((12, 18, 30), (6, 9, 16), (90, 120, 148)),
    "nebula": ((22, 12, 28), (8, 6, 14), (130, 90, 128)),
    "kids": ((20, 16, 26), (9, 8, 14), (150, 122, 128)),
    "myth": ((20, 14, 16), (8, 6, 10), (148, 118, 88)),
    "talk": ((18, 16, 28), (8, 8, 14), (128, 116, 148)),
    "work": ((16, 16, 22), (7, 7, 12), (108, 112, 124)),
    "news": ((16, 17, 26), (7, 8, 14), (118, 124, 140)),
    "guide": ((18, 16, 30), (8, 8, 16), (132, 118, 150)),
    "podcast": ((20, 14, 26), (9, 8, 14), (140, 110, 128)),
    "path": ((16, 18, 22), (7, 9, 12), (124, 118, 100)),
    "radio": ((20, 16, 24), (9, 8, 14), (148, 118, 108)),
    "freeze": ((12, 18, 30), (6, 9, 16), (118, 148, 168)),
    "cat": ((20, 16, 22), (9, 8, 12), (148, 124, 108)),
    "well": ((14, 16, 20), (7, 8, 10), (108, 112, 114)),
    "room": ((20, 16, 22), (9, 8, 12), (150, 124, 104)),
    "task": ((16, 16, 26), (7, 8, 14), (114, 118, 140)),
    "about-sleep": ((12, 11, 24), (6, 6, 12), (128, 118, 150)),
    "kind": ((22, 16, 24), (10, 8, 14), (150, 118, 124)),
    "54321": ((16, 14, 26), (7, 7, 14), (124, 114, 144)),
    "roomsound": ((14, 16, 24), (7, 8, 14), (108, 124, 140)),
    "objects": ((18, 16, 24), (8, 8, 14), (140, 124, 108)),
    "tension": ((22, 12, 18), (9, 6, 10), (140, 96, 104)),
    "wave": ((12, 18, 30), (6, 9, 16), (96, 130, 150)),
    "box": ((16, 15, 26), (7, 7, 14), (118, 114, 140)),
    "478": ((14, 14, 28), (7, 7, 14), (122, 114, 148)),
    "sigh": ((18, 16, 24), (8, 8, 14), (140, 122, 128)),
    "equal": ((14, 16, 26), (7, 8, 14), (114, 120, 140)),
    "count8": ((16, 14, 24), (7, 7, 14), (128, 116, 138)),
    "rain": ((14, 16, 24), (6, 8, 12), (96, 112, 128)),
    "ocean": ((10, 16, 26), (5, 8, 14), (88, 120, 140)),
    "fire": ((24, 12, 12), (10, 6, 8), (160, 96, 70)),
    "wind": ((16, 18, 24), (7, 9, 12), (120, 128, 130)),
    "night": ((10, 12, 22), (4, 5, 10), (128, 132, 150)),
    "storm": ((12, 14, 22), (5, 6, 10), (90, 100, 118)),
    "river": ((12, 18, 22), (6, 9, 12), (90, 118, 120)),
    "birds": ((16, 18, 22), (7, 9, 12), (118, 130, 112)),
    "cafe": ((22, 16, 14), (10, 8, 8), (150, 118, 90)),
    "snow": ((16, 18, 26), (8, 10, 16), (150, 156, 168)),
    "bowl": ((16, 14, 20), (8, 7, 12), (128, 112, 100)),
    "fan": ((16, 16, 22), (8, 8, 12), (120, 124, 130)),
    "waves": ((12, 18, 28), (6, 9, 14), (96, 128, 144)),
    "piano": ((14, 14, 20), (6, 6, 10), (118, 112, 120)),
    "drone": ((14, 12, 22), (6, 6, 12), (108, 100, 128)),
    "ohm": ((16, 14, 20), (7, 7, 12), (130, 118, 108)),
    "chime": ((16, 16, 26), (7, 8, 14), (128, 132, 150)),
    "crystal": ((16, 14, 28), (7, 7, 14), (130, 118, 150)),
    "gong": ((18, 14, 16), (8, 7, 10), (140, 118, 90)),
    "swell": ((14, 16, 26), (6, 8, 14), (110, 122, 144)),
    "harp": ((16, 14, 24), (7, 7, 12), (140, 124, 128)),
    "white": ((18, 18, 24), (10, 10, 14), (150, 150, 156)),
    "pink": ((22, 16, 22), (10, 8, 12), (150, 120, 128)),
    "brown": ((18, 14, 12), (8, 7, 8), (130, 108, 88)),
    "174": ((14, 12, 22), (6, 6, 12), (108, 100, 128)),
    "396": ((16, 14, 20), (7, 7, 12), (120, 108, 118)),
    "417": ((14, 16, 22), (6, 8, 12), (108, 118, 124)),
    "528": ((14, 18, 18), (6, 9, 10), (100, 128, 118)),
    "639": ((16, 14, 22), (7, 7, 12), (124, 110, 128)),
    "741": ((14, 16, 24), (6, 8, 14), (110, 122, 140)),
    "852": ((16, 14, 26), (7, 7, 14), (124, 114, 144)),
    "wellbeing": ((16, 16, 24), (7, 8, 12), (120, 124, 130)),
    "performance": ((16, 14, 22), (7, 7, 12), (124, 112, 120)),
    "focus": ((14, 16, 24), (6, 8, 14), (108, 118, 136)),
    "sleep": ((12, 12, 24), (5, 6, 12), (120, 118, 148)),
    "breath": ((14, 18, 24), (6, 9, 12), (100, 128, 130)),
    "ground": ((16, 14, 16), (8, 7, 10), (120, 108, 96)),
    "kindness": ((20, 16, 22), (9, 8, 12), (148, 120, 124)),
    "patience": ((16, 16, 22), (7, 8, 12), (118, 118, 124)),
    "presence": ((16, 14, 24), (7, 7, 14), (124, 114, 138)),
    "body": ((18, 14, 16), (8, 7, 10), (140, 116, 104)),
    "courage": ((18, 14, 18), (8, 7, 10), (140, 108, 100)),
}


def rng_for(name: str) -> random.Random:
    return random.Random(int(hashlib.sha256(name.encode()).hexdigest()[:12], 16))


def mix(a: tuple[int, int, int], b: tuple[int, int, int], t: float) -> tuple[int, int, int]:
    t = max(0.0, min(1.0, t))
    return (
        int(a[0] + (b[0] - a[0]) * t),
        int(a[1] + (b[1] - a[1]) * t),
        int(a[2] + (b[2] - a[2]) * t),
    )


def hashed_palette(name: str) -> tuple[tuple[int, int, int], tuple[int, int, int], tuple[int, int, int]]:
    key = name.split("-")[-1] if name.startswith("snd-") or name.startswith("skill-") else name
    if key in PALETTE:
        return PALETTE[key]
    if name in PALETTE:
        return PALETTE[name]
    r = rng_for(name + ":pal")
    top = (10 + r.randint(0, 12), 10 + r.randint(0, 10), 16 + r.randint(0, 14))
    bot = (5 + r.randint(0, 5), 5 + r.randint(0, 5), 8 + r.randint(0, 8))
    acc = (90 + r.randint(0, 40), 90 + r.randint(0, 36), 100 + r.randint(0, 40))
    return top, bot, acc


def gradient(size: tuple[int, int], top: tuple[int, int, int], bot: tuple[int, int, int]) -> Image.Image:
    w, h = size
    strip = Image.new("RGB", (2, h))
    px = strip.load()
    for y in range(h):
        t = (y / max(1, h - 1)) ** 1.12
        px[0, y] = mix(top, bot, t)
        px[1, y] = mix(top, bot, min(1.0, t + 0.04))
    return strip.resize(size, Image.Resampling.BICUBIC)


def add_grain(im: Image.Image, name: str, amount: float = 0.04) -> Image.Image:
    r = rng_for(name + ":grain")
    noise = Image.effect_noise(im.size, 18 + r.randint(0, 6)).convert("RGB")
    noise = ImageEnhance.Contrast(noise).enhance(0.85)
    return Image.blend(im, noise, amount)


def vignette(im: Image.Image, strength: float = 0.42) -> Image.Image:
    w, h = im.size
    mask = Image.new("L", (w, h), 0)
    d = ImageDraw.Draw(mask)
    d.ellipse((-w * 0.12, -h * 0.08, w * 1.12, h * 1.08), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(radius=max(w, h) // 6))
    dark = Image.new("RGB", (w, h), (4, 4, 8))
    return Image.composite(im, Image.blend(im, dark, strength), mask)


def soft_blob(
    layer: Image.Image,
    cx: float,
    cy: float,
    rx: float,
    ry: float,
    color: tuple[int, int, int],
    alpha: float,
) -> Image.Image:
    tmp = Image.new("RGBA", layer.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(tmp)
    d.ellipse((cx - rx, cy - ry, cx + rx, cy + ry), fill=(*color, max(1, int(alpha * 255))))
    blur = max(8, int(max(rx, ry) * 0.42))
    tmp = tmp.filter(ImageFilter.GaussianBlur(radius=blur))
    return Image.alpha_composite(layer, tmp)


def atmosphere(im: Image.Image, name: str, accent: tuple[int, int, int]) -> Image.Image:
    w, h = im.size
    r = rng_for(name + ":air")
    key = name.split("-")[-1] if name.startswith("snd-") or name.startswith("skill-") else name
    layer = im.convert("RGBA")
    mute = mix(accent, (18, 16, 24), 0.55)
    pale = mix(accent, (210, 204, 214), 0.28)
    warm = mix(accent, (190, 150, 120), 0.22)

    family = "dusk"
    if key in {"lake", "ocean", "waves", "wave", "river", "rain", "storm"}:
        family = "water"
    elif key in {"forest", "palms", "path", "birds", "ground"}:
        family = "woods"
    elif key in {"fire", "cafe", "room", "gong", "ohm", "body"}:
        family = "ember"
    elif key in {"moon", "night", "about-sleep", "sleep", "freeze", "snow"}:
        family = "night"
    elif key in {"nebula", "myth", "crystal", "drone", "852", "741"}:
        family = "veil"
    elif key in {"kids", "kind", "kindness", "cat", "sigh"}:
        family = "warm"

    # Always a high wash so the field never sits as a flat tile.
    layer = soft_blob(layer, w * 0.5, h * -0.05, w * 0.9, h * 0.55, mute, 0.22)
    layer = soft_blob(layer, w * (0.18 + r.random() * 0.2), h * 0.22, w * 0.55, h * 0.4, pale, 0.16)

    if family == "water":
        layer = soft_blob(layer, w * 0.7, h * 0.18, w * 0.28, h * 0.16, pale, 0.28)
        layer = soft_blob(layer, w * 0.5, h * 0.72, w * 1.1, h * 0.42, mute, 0.34)
        layer = soft_blob(layer, w * 0.48, h * 0.62, w * 0.9, h * 0.18, pale, 0.14)
        layer = soft_blob(layer, w * 0.52, h * 0.84, w * 0.8, h * 0.16, mix(mute, (6, 10, 16), 0.4), 0.28)
    elif family == "woods":
        layer = soft_blob(layer, w * 0.5, h * 0.78, w * 1.05, h * 0.5, mix(mute, (8, 14, 10), 0.3), 0.4)
        layer = soft_blob(layer, w * 0.22, h * 0.55, w * 0.28, h * 0.55, mute, 0.22)
        layer = soft_blob(layer, w * 0.78, h * 0.5, w * 0.3, h * 0.6, mute, 0.2)
        layer = soft_blob(layer, w * 0.62, h * 0.2, w * 0.22, h * 0.14, pale, 0.18)
    elif family == "ember":
        layer = soft_blob(layer, w * 0.5, h * 0.82, w * 0.7, h * 0.38, warm, 0.32)
        layer = soft_blob(layer, w * 0.46, h * 0.7, w * 0.28, h * 0.22, mix(warm, (220, 160, 110), 0.2), 0.2)
        layer = soft_blob(layer, w * 0.18, h * 0.28, w * 0.4, h * 0.3, mute, 0.18)
    elif family == "night":
        layer = soft_blob(layer, w * 0.68, h * 0.24, w * 0.22, h * 0.16, pale, 0.34)
        layer = soft_blob(layer, w * 0.7, h * 0.26, w * 0.08, h * 0.06, mix(pale, (230, 230, 240), 0.4), 0.22)
        layer = soft_blob(layer, w * 0.5, h * 0.78, w * 1.0, h * 0.4, mute, 0.3)
    elif family == "veil":
        layer = soft_blob(layer, w * 0.42, h * 0.4, w * 0.5, h * 0.38, mute, 0.28)
        layer = soft_blob(layer, w * 0.62, h * 0.48, w * 0.38, h * 0.3, pale, 0.18)
        layer = soft_blob(layer, w * 0.3, h * 0.62, w * 0.34, h * 0.28, mix(mute, warm, 0.4), 0.16)
    elif family == "warm":
        layer = soft_blob(layer, w * 0.5, h * 0.46, w * 0.42, h * 0.32, mix(warm, pale, 0.5), 0.26)
        layer = soft_blob(layer, w * 0.38, h * 0.58, w * 0.28, h * 0.22, mute, 0.16)
        layer = soft_blob(layer, w * 0.64, h * 0.6, w * 0.26, h * 0.2, warm, 0.14)
    else:
        layer = soft_blob(layer, w * 0.62, h * 0.28, w * 0.4, h * 0.28, pale, 0.2)
        layer = soft_blob(layer, w * 0.36, h * 0.7, w * 0.7, h * 0.36, mute, 0.26)

    # One last low fog so nothing reads as a cut-out shape.
    layer = soft_blob(layer, w * 0.5, h * 0.92, w * 1.2, h * 0.28, mix(mute, (6, 6, 10), 0.5), 0.22)
    return layer.convert("RGB")


def compact(im: Image.Image, colors: int = 180) -> Image.Image:
    return im.quantize(colors=colors, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE)


def make_cover(name: str, size: tuple[int, int] = (540, 720)) -> Image.Image:
    top, bot, acc = hashed_palette(name)
    im = gradient(size, top, bot)
    im = atmosphere(im, name, acc)
    im = add_grain(im, name, 0.035)
    im = vignette(im, 0.38)
    im = im.filter(ImageFilter.SMOOTH_MORE)
    return compact(im)


def make_skill(name: str) -> Image.Image:
    top, bot, acc = hashed_palette(name)
    im = gradient((256, 256), top, bot)
    im = atmosphere(im, f"skill-{name}", acc)
    im = add_grain(im, f"skill-{name}", 0.03)
    im = vignette(im, 0.28)
    mask = Image.new("L", im.size, 0)
    ImageDraw.Draw(mask).ellipse((4, 4, 252, 252), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(radius=3))
    bg = Image.new("RGB", im.size, bot)
    bg.paste(im, mask=mask)
    return compact(bg, 120)


def make_face(i: int) -> Image.Image:
    hues = [
        ((22, 18, 32), (150, 128, 148)),
        ((16, 20, 32), (128, 140, 158)),
        ((24, 16, 22), (160, 124, 128)),
        ((16, 22, 22), (122, 144, 132)),
        ((22, 18, 16), (158, 132, 112)),
        ((18, 16, 30), (136, 126, 154)),
    ]
    bg, acc = hues[i % len(hues)]
    im = gradient((128, 128), bg, mix(bg, (6, 6, 10), 0.45))
    layer = im.convert("RGBA")
    layer = soft_blob(layer, 64, 54, 42, 48, acc, 0.28)
    layer = soft_blob(layer, 64, 48, 22, 24, mix(acc, (220, 210, 214), 0.25), 0.16)
    im = layer.convert("RGB")
    im = add_grain(im, f"face-{i}", 0.03)
    im = vignette(im, 0.22)
    return compact(im.filter(ImageFilter.SMOOTH_MORE), 80)


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
