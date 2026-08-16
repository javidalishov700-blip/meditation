#!/usr/bin/env python3
"""Painterly dusk covers: recognizable nature and rooms. No stock photos, no toy geometry."""
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
    "clarity",
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

RGB = tuple[int, int, int]
RGBA = tuple[int, int, int, int]


def rng_for(name: str) -> random.Random:
    return random.Random(int(hashlib.sha256(name.encode()).hexdigest()[:12], 16))


def mix(a: RGB, b: RGB, t: float) -> RGB:
    t = max(0.0, min(1.0, t))
    return (
        int(a[0] + (b[0] - a[0]) * t),
        int(a[1] + (b[1] - a[1]) * t),
        int(a[2] + (b[2] - a[2]) * t),
    )


def rgba(c: RGB, a: int) -> RGBA:
    return (c[0], c[1], c[2], max(0, min(255, a)))


def key_of(name: str) -> str:
    if name.startswith("snd-") or name.startswith("skill-"):
        return name.split("-", 1)[-1]
    return name


def gradient(size: tuple[int, int], top: RGB, bot: RGB, gamma: float = 1.05) -> Image.Image:
    w, h = size
    strip = Image.new("RGB", (2, h))
    px = strip.load()
    for y in range(h):
        t = (y / max(1, h - 1)) ** gamma
        px[0, y] = mix(top, bot, t)
        px[1, y] = mix(top, bot, min(1.0, t + 0.03))
    return strip.resize(size, Image.Resampling.BICUBIC)


def add_grain(im: Image.Image, name: str, amount: float = 0.05) -> Image.Image:
    r = rng_for(name + ":grain")
    noise = Image.effect_noise(im.size, 20 + r.randint(0, 8)).convert("RGB")
    noise = ImageEnhance.Contrast(noise).enhance(0.9)
    return Image.blend(im, noise, amount)


def vignette(im: Image.Image, strength: float = 0.36) -> Image.Image:
    w, h = im.size
    mask = Image.new("L", (w, h), 0)
    d = ImageDraw.Draw(mask)
    d.ellipse((-int(w * 0.1), -int(h * 0.06), int(w * 1.1), int(h * 1.06)), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(radius=max(w, h) // 7))
    dark = Image.new("RGB", (w, h), (6, 5, 10))
    return Image.composite(im, Image.blend(im, dark, strength), mask)


def compact(im: Image.Image, colors: int = 240) -> Image.Image:
    return im.quantize(colors=colors, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE)


def overlay(base: Image.Image, layer: Image.Image, blur: float = 0) -> Image.Image:
    if blur:
        layer = layer.filter(ImageFilter.GaussianBlur(radius=blur))
    return Image.alpha_composite(base.convert("RGBA"), layer)


def glow(size: tuple[int, int], cx: float, cy: float, rx: float, ry: float, color: RGB, alpha: int) -> Image.Image:
    tmp = Image.new("RGBA", size, (0, 0, 0, 0))
    ImageDraw.Draw(tmp).ellipse((cx - rx, cy - ry, cx + rx, cy + ry), fill=rgba(color, alpha))
    return tmp.filter(ImageFilter.GaussianBlur(radius=max(6, int(max(rx, ry) * 0.35))))


def sky_for(kind: str) -> tuple[RGB, RGB]:
    skies: dict[str, tuple[RGB, RGB]] = {
        "dusk": ((78, 62, 92), (22, 16, 28)),
        "dawn": ((186, 118, 92), (42, 28, 38)),
        "night": ((28, 34, 58), (8, 10, 18)),
        "storm": ((48, 54, 66), (14, 16, 22)),
        "mist": ((92, 98, 108), (36, 40, 46)),
        "teal": ((46, 78, 88), (12, 22, 28)),
        "ember": ((92, 42, 36), (22, 10, 12)),
        "forest": ((58, 78, 68), (12, 20, 16)),
        "gold": ((168, 122, 78), (36, 24, 22)),
        "violet": ((72, 48, 98), (16, 10, 28)),
        "snow": ((120, 132, 148), (40, 46, 58)),
        "rose": ((128, 78, 92), (32, 18, 28)),
        "sage": ((70, 92, 78), (18, 26, 22)),
        "ink": ((36, 32, 52), (10, 8, 18)),
    }
    return skies.get(kind, skies["dusk"])


def stars(layer: Image.Image, rng: random.Random, n: int = 48, color: RGB = (220, 220, 230)) -> None:
    w, h = layer.size
    d = ImageDraw.Draw(layer)
    for _ in range(n):
        x = rng.randint(0, w - 1)
        y = rng.randint(0, int(h * 0.55))
        s = rng.choice((1, 1, 1, 2))
        a = rng.randint(90, 210)
        d.ellipse((x, y, x + s, y + s), fill=rgba(color, a))


def moon(base: Image.Image, cx: float, cy: float, r: float, color: RGB = (228, 224, 214)) -> Image.Image:
    w, h = base.size
    g = glow((w, h), cx, cy, r * 2.8, r * 2.8, mix(color, (180, 170, 140), 0.25), 55)
    disc = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    ImageDraw.Draw(disc).ellipse((cx - r, cy - r * 0.96, cx + r, cy + r * 1.02), fill=rgba(color, 225))
    return overlay(overlay(base, g), disc, 0.8)


def blob_poly(cx: float, cy: float, rx: float, ry: float, rng: random.Random, n: int = 11) -> list[tuple[float, float]]:
    pts = []
    for i in range(n):
        a = (2 * math.pi * i / n) + rng.uniform(-0.12, 0.12)
        rr = rng.uniform(0.62, 1.18)
        pts.append((cx + math.cos(a) * rx * rr, cy + math.sin(a) * ry * rr))
    return pts


def jagged_ridge(w: int, y: float, amp: float, steps: int, rng: random.Random) -> list[tuple[float, float]]:
    pts = [(0.0, y + amp * 0.4)]
    x = 0.0
    while x < w:
        x += rng.uniform(max(6.0, w / (steps * 2)), max(10.0, w / steps))
        bump = rng.uniform(-amp, amp) + math.sin(x * 0.04) * amp * 0.25
        pts.append((min(w, x), y + bump))
    pts.append((float(w), y + amp * 0.5))
    return pts


def fill_poly(layer: Image.Image, pts: list[tuple[float, float]], color: RGBA, close_bottom: tuple[int, int] | None = None) -> None:
    w, h = layer.size
    if close_bottom:
        pts = list(pts) + [(w, close_bottom[1]), (0, close_bottom[1])]
    ImageDraw.Draw(layer).polygon(pts, fill=color)


def trees(
    layer: Image.Image,
    rng: random.Random,
    y_ground: float,
    n: int,
    trunk: RGB,
    canopy: RGB,
    scale: float = 1.0,
    lean: float = 0.0,
) -> None:
    w, h = layer.size
    d = ImageDraw.Draw(layer)
    for i in range(n):
        x = w * (0.03 + 0.94 * i / max(1, n - 1)) + rng.uniform(-22, 22)
        ht = (110 + rng.uniform(0, 160)) * scale
        tw = max(4, ht * 0.038)
        top = y_ground - ht
        d.polygon(
            [
                (x - tw + lean * 6, y_ground),
                (x + tw + lean * 6, y_ground),
                (x + tw * 0.35 + lean * 18, top + ht * 0.38),
                (x - tw * 0.35 + lean * 18, top + ht * 0.38),
            ],
            fill=rgba(trunk, 240),
        )
        for _ in range(6 + rng.randint(0, 4)):
            cx = x + lean * 16 + rng.uniform(-ht * 0.2, ht * 0.2)
            cy = top + ht * rng.uniform(0.02, 0.42)
            d.polygon(
                blob_poly(cx, cy, ht * rng.uniform(0.12, 0.22), ht * rng.uniform(0.09, 0.16), rng, 9),
                fill=rgba(mix(canopy, trunk, rng.uniform(0, 0.25)), rng.randint(180, 230)),
            )


def pine_stand(layer: Image.Image, rng: random.Random, y_ground: float, n: int, color: RGB) -> None:
    w, h = layer.size
    d = ImageDraw.Draw(layer)
    for _ in range(n):
        x = rng.uniform(-10, w + 10)
        ht = rng.uniform(h * 0.28, h * 0.72)
        tw = rng.uniform(5, 13)
        d.polygon(
            [(x - tw, y_ground), (x + tw, y_ground), (x + tw * 0.35, y_ground - ht), (x - tw * 0.25, y_ground - ht)],
            fill=rgba(mix(color, (8, 12, 10), rng.uniform(0, 0.4)), 245),
        )
        top = y_ground - ht
        for k in range(4):
            cy = top + ht * (0.08 + k * 0.12)
            rx = 18 + k * 7 + rng.uniform(-4, 8)
            d.polygon(blob_poly(x, cy, rx, 16 + k * 3, rng, 8), fill=rgba(mix(color, (20, 40, 28), 0.15), 210))


def palms(layer: Image.Image, rng: random.Random, y_ground: float, xs: list[float], color: RGB) -> None:
    d = ImageDraw.Draw(layer)
    for x0 in xs:
        x, y = x0, y_ground
        ht = 200 + rng.uniform(-16, 36)
        steps = 14
        for i in range(steps):
            x2 = x + rng.uniform(0.6, 2.4)
            y2 = y - ht / steps
            d.line([(x, y), (x2, y2)], fill=rgba(color, 235), width=max(3, int(9 - i * 0.35)))
            x, y = x2, y2
        crown = (x, y)
        for a in range(-7, 8):
            ang = math.radians(a * 16 - 90 + rng.uniform(-4, 4))
            length = 78 + rng.uniform(-12, 22)
            x2 = crown[0] + math.cos(ang) * length
            y2 = crown[1] + abs(math.sin(ang)) * (32 + rng.uniform(0, 18)) + 8
            d.line([crown, (x2, y2)], fill=rgba(color, 210), width=3)
            d.line([crown, (x2 + rng.uniform(-10, 10), y2 + 8)], fill=rgba(mix(color, (12, 28, 18), 0.2), 150), width=2)


def grass(layer: Image.Image, rng: random.Random, y: float, color: RGB, n: int = 90, lean: float = 8) -> None:
    w, h = layer.size
    d = ImageDraw.Draw(layer)
    for _ in range(n):
        x = rng.uniform(0, w)
        hh = rng.uniform(14, 46)
        d.line([(x, y), (x + lean + rng.uniform(-4, 4), y - hh)], fill=rgba(color, rng.randint(90, 170)), width=1)


def water_bands(layer: Image.Image, y0: float, color: RGB, n: int = 9, rng: random.Random | None = None) -> None:
    w, h = layer.size
    d = ImageDraw.Draw(layer)
    rng = rng or random.Random(3)
    horizon = jagged_ridge(w, y0, 7, 18, rng)
    fill_poly(layer, horizon, rgba(color, 230), (w, h))
    for i in range(n):
        yy = y0 + 12 + i * ((h - y0) / n)
        c = mix(color, (8, 12, 18), i / max(1, n - 1) * 0.5)
        wave = [(0, yy)]
        x = 0.0
        while x < w:
            x += rng.uniform(16, 40)
            wave.append((min(w, x), yy + math.sin(x * 0.05 + i) * 5 + rng.uniform(-3, 3)))
        wave += [(w, h), (0, h)]
        d.polygon(wave, fill=rgba(c, 70 if i else 160))


def window_casement(
    d: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    color: RGB,
    thick: int = 11,
) -> None:
    x0, y0, x1, y1 = box
    d.rectangle((x0 - 6, y0 - 8, x1 + 6, y1 + 10), outline=rgba(mix(color, (10, 8, 8), 0.3), 240), width=thick + 4)
    d.rectangle(box, outline=rgba(color, 240), width=thick)
    split = x0 + int((x1 - x0) * 0.46)
    d.line([(split, y0), (split, y1)], fill=rgba(color, 230), width=max(5, thick // 2))
    sill_y = y1 + 6
    d.polygon([(x0 - 14, sill_y), (x1 + 14, sill_y), (x1 + 8, sill_y + 12), (x0 - 8, sill_y + 12)], fill=rgba(mix(color, (80, 60, 40), 0.2), 230))


def curtains(d: ImageDraw.ImageDraw, box: tuple[int, int, int, int], color: RGB) -> None:
    x0, y0, x1, y1 = box
    left = [(x0 - 4, y0 - 4), (x0 + (x1 - x0) * 0.18, y0), (x0 + (x1 - x0) * 0.12, y1 + 8), (x0 - 10, y1 + 4)]
    right = [(x1 + 4, y0 - 4), (x1 - (x1 - x0) * 0.16, y0), (x1 - (x1 - x0) * 0.1, y1 + 8), (x1 + 10, y1 + 4)]
    d.polygon(left, fill=rgba(color, 200))
    d.polygon(right, fill=rgba(color, 200))


def rain_streaks(layer: Image.Image, rng: random.Random, n: int = 70, color: RGB = (190, 205, 220)) -> None:
    w, h = layer.size
    d = ImageDraw.Draw(layer)
    for _ in range(n):
        x = rng.uniform(0, w)
        y = rng.uniform(0, h)
        ln = rng.uniform(18, 70)
        d.line([(x, y), (x + rng.uniform(-2, 4), y + ln)], fill=rgba(color, rng.randint(50, 140)), width=1)
        if rng.random() < 0.35:
            rr = rng.uniform(2, 5)
            d.ellipse((x - rr, y + ln - rr, x + rr, y + ln + rr), fill=rgba(color, 120))


# --- scenes -----------------------------------------------------------------


def scene_lake(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    rng = rng_for(name)
    im = gradient((w, h), *sky_for("teal"))
    im = moon(im, w * 0.74, h * 0.2, 26)
    hills = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    fill_poly(hills, jagged_ridge(w, h * 0.44, 36, 22, rng), rgba((28, 42, 48), 255), (w, h))
    fill_poly(hills, jagged_ridge(w, h * 0.52, 22, 26, rng), rgba((16, 28, 34), 255), (w, h))
    im = overlay(im, hills, 0.6)
    water = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    water_bands(water, h * 0.56, (36, 70, 88), rng=rng)
    im = overlay(im, water, 0.8)
    shore = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    fill_poly(shore, jagged_ridge(w, h * 0.8, 18, 14, rng)[:8] + [(0, h)], rgba((22, 20, 18), 255), (w, h))
    ImageDraw.Draw(shore).polygon(
        [(0, h), (0, h * 0.74)] + jagged_ridge(int(w * 0.55), h * 0.78, 14, 10, rng) + [(w * 0.5, h)],
        fill=rgba((24, 22, 20), 255),
    )
    trees(shore, rng, h * 0.78, 5, (16, 22, 18), (22, 42, 32), 0.62)
    return overlay(im, shore, 0.2)


def scene_mountain(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    rng = rng_for(name)
    im = gradient((w, h), *sky_for("dusk"))
    im = moon(im, w * 0.22, h * 0.18, 16, (232, 214, 190))
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    fill_poly(layer, jagged_ridge(w, h * 0.42, 90, 28, rng), rgba((52, 44, 68), 255), (w, h))
    fill_poly(layer, jagged_ridge(w, h * 0.52, 70, 34, rng), rgba((28, 22, 38), 255), (w, h))
    fill_poly(layer, jagged_ridge(w, h * 0.68, 28, 18, rng), rgba((16, 14, 22), 255), (w, h))
    return overlay(im, layer, 0.35)


def scene_clouds(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    rng = rng_for(name)
    im = gradient((w, h), (118, 96, 118), (36, 32, 48))
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for i in range(7):
        cx = w * rng.uniform(0.1, 0.9)
        cy = h * (0.22 + i * 0.07)
        d.polygon(blob_poly(cx, cy, w * rng.uniform(0.22, 0.4), h * 0.07, rng, 14), fill=rgba(mix((214, 200, 204), (70, 62, 80), i / 8), 90 + i * 8))
    land = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    fill_poly(land, jagged_ridge(w, h * 0.78, 14, 16, rng), rgba((28, 24, 32), 255), (w, h))
    im = overlay(im, layer, 5)
    return overlay(im, land, 0.3)


def scene_forest(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    rng = rng_for(name)
    im = gradient((w, h), *sky_for("forest"))
    im = overlay(im, glow((w, h), w * 0.5, h * 0.18, 90, 36, (200, 210, 160), 45))
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    pine_stand(layer, rng, h * 0.9, 28, (14, 28, 20))
    pine_stand(layer, rng_for(name + "f"), h * 0.94, 16, (8, 16, 12))
    fill_poly(layer, jagged_ridge(w, h * 0.9, 8, 12, rng), rgba((8, 12, 10), 255), (w, h))
    return overlay(im, layer, 0.15)


def scene_palms(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    rng = rng_for(name)
    im = gradient((w, h), *sky_for("gold"))
    im = moon(im, w * 0.78, h * 0.18, 24, (255, 214, 160))
    water = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    water_bands(water, h * 0.6, (40, 78, 88), rng=rng)
    im = overlay(im, water, 0.7)
    sand = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    fill_poly(sand, jagged_ridge(w, h * 0.7, 10, 12, rng), rgba((62, 48, 36), 255), (w, h))
    palms(sand, rng, h * 0.74, [w * 0.16, w * 0.3, w * 0.8], (16, 34, 26))
    return overlay(im, sand, 0.2)


def scene_lighthouse(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    rng = rng_for(name)
    im = gradient((w, h), *sky_for("night"))
    star_l = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    stars(star_l, rng, 55)
    im = overlay(im, star_l)
    im = moon(im, w * 0.78, h * 0.16, 15)
    water = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    water_bands(water, h * 0.6, (24, 40, 58), rng=rng)
    im = overlay(im, water, 0.7)
    rock = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(rock)
    fill_poly(rock, jagged_ridge(int(w * 0.72), h * 0.74, 16, 12, rng) + [(w * 0.55, h), (0, h)], rgba((28, 26, 32), 255), None)
    tx = w * 0.36
    d.polygon([(tx - 20, h * 0.74), (tx + 22, h * 0.74), (tx + 13, h * 0.3), (tx - 11, h * 0.3)], fill=rgba((214, 206, 192), 255))
    d.polygon(blob_poly(tx + 1, h * 0.28, 18, 10, rng, 8), fill=rgba((48, 40, 36), 255))
    d.polygon([(tx - 5, h * 0.24), (tx + 6, h * 0.24), (tx + 1, h * 0.17)], fill=rgba((48, 40, 36), 255))
    beam = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    ImageDraw.Draw(beam).polygon([(tx + 8, h * 0.28), (w, h * 0.14), (w, h * 0.5)], fill=rgba((255, 220, 150), 36))
    im = overlay(im, rock, 0.15)
    return overlay(im, beam, 5)


def scene_moon(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    rng = rng_for(name)
    im = gradient((w, h), *sky_for("night"))
    sl = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    stars(sl, rng, 70)
    im = overlay(im, sl)
    im = moon(im, w * 0.5, h * 0.26, 44)
    meadow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    fill_poly(meadow, jagged_ridge(w, h * 0.68, 18, 18, rng), rgba((18, 28, 22), 255), (w, h))
    grass(meadow, rng, h * 0.72, (40, 70, 50), 110, 6)
    return overlay(im, meadow, 0.25)


def scene_path(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    rng = rng_for(name)
    im = gradient((w, h), *sky_for("forest"))
    im = overlay(im, glow((w, h), w * 0.5, h * 0.26, 90, 42, (210, 180, 110), 50))
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    pine_stand(layer, rng, h * 0.86, 14, (18, 32, 22))
    trees(layer, rng_for(name + "t"), h * 0.88, 6, (22, 30, 20), (32, 54, 36), 0.8)
    path = [
        (w * 0.18, h),
        (w * 0.42, h * 0.78),
        (w * 0.46, h * 0.62),
        (w * 0.52, h * 0.5),
        (w * 0.56, h * 0.5),
        (w * 0.54, h * 0.62),
        (w * 0.62, h * 0.78),
        (w * 0.84, h),
    ]
    d.polygon(path, fill=rgba((110, 90, 62), 230))
    fill_poly(layer, jagged_ridge(w, h * 0.9, 6, 10, rng), rgba((12, 16, 12), 200), (w, h))
    return overlay(im, layer, 0.12)


def scene_room(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    im = gradient((w, h), (52, 38, 32), (18, 14, 14))
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.polygon([(0, 0), (w, 0), (w, h * 0.64), (0, h * 0.7)], fill=rgba((68, 50, 42), 255))
    d.polygon([(0, h * 0.68), (w, h * 0.62), (w, h), (0, h)], fill=rgba((36, 26, 22), 255))
    win = (int(w * 0.16), int(h * 0.12), int(w * 0.78), int(h * 0.48))
    d.rectangle(win, fill=rgba((92, 118, 138), 255))
    d.polygon(blob_poly(w * 0.62, h * 0.22, 36, 18, rng_for(name), 10), fill=rgba((255, 210, 150), 70))
    window_casement(d, win, (48, 34, 28), 11)
    curtains(d, win, (92, 58, 46))
    d.polygon([(w * 0.1, h * 0.72), (w * 0.9, h * 0.66), (w * 0.86, h * 0.74), (w * 0.12, h * 0.8)], fill=rgba((78, 52, 38), 255))
    d.polygon([(w * 0.18, h * 0.78), (w * 0.24, h * 0.78), (w * 0.23, h * 0.92), (w * 0.17, h * 0.92)], fill=rgba((48, 32, 24), 255))
    d.polygon([(w * 0.76, h * 0.72), (w * 0.82, h * 0.72), (w * 0.81, h * 0.9), (w * 0.75, h * 0.9)], fill=rgba((48, 32, 24), 255))
    d.polygon(blob_poly(w * 0.48, h * 0.68, 28, 10, rng_for(name + "b"), 8), fill=rgba((190, 150, 100), 120))
    im = overlay(im, glow((w, h), w * 0.48, h * 0.28, 130, 70, (255, 200, 140), 32))
    return overlay(im, layer, 0.2)


def scene_rain(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    rng = rng_for(name)
    im = gradient((w, h), (24, 28, 42), (8, 10, 16))
    lights = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    for cx, cy, col, r in [
        (w * 0.28, h * 0.38, (255, 180, 90), 22),
        (w * 0.42, h * 0.5, (255, 160, 70), 16),
        (w * 0.7, h * 0.32, (180, 210, 230), 18),
        (w * 0.82, h * 0.46, (160, 190, 220), 14),
        (w * 0.18, h * 0.58, (220, 150, 80), 12),
    ]:
        lights = overlay(lights, glow((w, h), cx, cy, r * 2, r * 2, col, 90))
    im = overlay(im, lights)
    wet = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    rain_streaks(wet, rng, 110)
    frame = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    window_casement(ImageDraw.Draw(frame), (int(w * 0.07), int(h * 0.07), int(w * 0.93), int(h * 0.9)), (16, 14, 20), 14)
    im = overlay(im, wet, 0.25)
    return overlay(im, frame, 0.15)


def scene_ocean(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    rng = rng_for(name)
    im = gradient((w, h), *sky_for("night"))
    sl = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    stars(sl, rng, 40)
    im = overlay(im, sl)
    im = moon(im, w * 0.7, h * 0.18, 20)
    water = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    water_bands(water, h * 0.48, (28, 52, 72), 12, rng=rng)
    d = ImageDraw.Draw(water)
    for i in range(8):
        y = h * (0.54 + i * 0.05)
        pts = [(0, y)]
        x = 0.0
        while x < w:
            x += rng.uniform(20, 48)
            pts.append((min(w, x), y + math.sin(x * 0.04 + i) * 7))
        d.line(pts, fill=rgba((180, 200, 214), 45 + i * 6), width=2)
    rock = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    fill_poly(rock, [(0, h)] + jagged_ridge(int(w * 0.48), h * 0.8, 16, 10, rng) + [(w * 0.4, h)], rgba((24, 22, 26), 255), None)
    im = overlay(im, water, 0.55)
    return overlay(im, rock, 0.2)


def scene_fire(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    rng = rng_for(name)
    im = gradient((w, h), (38, 22, 18), (10, 6, 8))
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.polygon([(0, 0), (w, 0), (w, h * 0.78), (0, h * 0.82)], fill=rgba((46, 30, 24), 255))
    x0, y0, x1, y1 = int(w * 0.2), int(h * 0.4), int(w * 0.8), int(h * 0.88)
    d.pieslice((x0, y0, x1, y0 + (x1 - x0) * 0.7), 180, 0, fill=rgba((18, 10, 8), 255))
    d.rectangle((x0, int((y0 + y1) / 2 - 20), x1, y1), fill=rgba((18, 10, 8), 255))
    for _ in range(8):
        cx = w * rng.uniform(0.34, 0.66)
        cy = h * rng.uniform(0.52, 0.74)
        d.polygon(blob_poly(cx, cy, rng.uniform(18, 42), rng.uniform(28, 60), rng, 9), fill=rgba((255, rng.randint(90, 170), 40), rng.randint(80, 140)))
    d.polygon(blob_poly(w * 0.42, h * 0.78, 36, 12, rng, 8), fill=rgba((42, 24, 16), 230))
    d.polygon(blob_poly(w * 0.58, h * 0.8, 32, 11, rng, 8), fill=rgba((36, 20, 14), 230))
    im = overlay(im, glow((w, h), w * 0.5, h * 0.64, 130, 90, (255, 130, 50), 70))
    return overlay(im, layer, 0.7)


def scene_wind(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    rng = rng_for(name)
    im = gradient((w, h), *sky_for("mist"))
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    fill_poly(layer, jagged_ridge(w, h * 0.58, 10, 14, rng), rgba((70, 78, 70), 255), (w, h))
    grass(layer, rng, h * 0.62, (90, 100, 80), 140, 22)
    grass(layer, rng_for(name + "g"), h * 0.7, (60, 70, 52), 100, 18)
    return overlay(im, layer, 0.6)


def scene_night(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    rng = rng_for(name)
    im = gradient((w, h), *sky_for("night"))
    sl = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    stars(sl, rng, 80)
    im = overlay(im, sl)
    im = moon(im, w * 0.78, h * 0.18, 20)
    field = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    fill_poly(field, jagged_ridge(w, h * 0.7, 14, 10, rng), rgba((16, 24, 18), 255), (w, h))
    grass(field, rng, h * 0.74, (32, 50, 36), 70, 4)
    return overlay(im, field, 0.5)


def scene_storm(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    rng = rng_for(name)
    im = gradient((w, h), *sky_for("storm"))
    clouds = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(clouds)
    for cx, cy, rx, ry in [(w * 0.3, h * 0.22, w * 0.4, 50), (w * 0.7, h * 0.18, w * 0.38, 44), (w * 0.5, h * 0.32, w * 0.5, 40)]:
        d.ellipse((cx - rx, cy - ry, cx + rx, cy + ry), fill=rgba((70, 76, 86), 180))
    im = overlay(im, clouds, 5)
    bolt = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    ImageDraw.Draw(bolt).line([(w * 0.62, h * 0.2), (w * 0.58, h * 0.38), (w * 0.66, h * 0.4), (w * 0.52, h * 0.62)], fill=rgba((230, 230, 240), 160), width=3)
    rain = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    rain_streaks(rain, rng, 110, (170, 180, 190))
    land = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    fill_poly(land, jagged_ridge(w, h * 0.72, 16, 8, rng), rgba((18, 20, 24), 255), (w, h))
    im = overlay(im, bolt, 0.8)
    im = overlay(im, rain, 0.3)
    return overlay(im, land, 0.4)


def scene_river(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    rng = rng_for(name)
    im = gradient((w, h), *sky_for("sage"))
    banks = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(banks)
    d.polygon([(0, h * 0.45), (w * 0.38, h * 0.5), (w * 0.32, h), (0, h)], fill=rgba((36, 48, 32), 255))
    d.polygon([(w, h * 0.48), (w * 0.58, h * 0.52), (w * 0.64, h), (w, h)], fill=rgba((28, 40, 28), 255))
    d.polygon([(w * 0.34, h * 0.5), (w * 0.62, h * 0.52), (w * 0.58, h), (w * 0.4, h)], fill=rgba((70, 110, 118), 230))
    for i in range(7):
        y = h * (0.56 + i * 0.06)
        d.arc((w * 0.32, y, w * 0.66, y + 16), 0, 180, fill=rgba((180, 210, 214), 60), width=2)
    trees(banks, rng, h * 0.5, 5, (20, 32, 22), (30, 50, 32), 0.55)
    return overlay(im, banks, 0.5)


def scene_birds(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    rng = rng_for(name)
    im = gradient((w, h), *sky_for("dawn"))
    im = overlay(im, glow((w, h), w * 0.5, h * 0.28, 100, 40, (255, 180, 90), 70))
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    fill_poly(layer, jagged_ridge(w, h * 0.68, 12, 8, rng), rgba((32, 44, 30), 255), (w, h))
    trees(layer, rng, h * 0.7, 6, (28, 24, 20), (40, 48, 28), 0.7)
    for _ in range(7):
        x, y = rng.uniform(w * 0.15, w * 0.85), rng.uniform(h * 0.18, h * 0.42)
        d.arc((x, y, x + 14, y + 8), 200, 340, fill=rgba((30, 24, 22), 200), width=2)
        d.arc((x + 10, y, x + 22, y + 8), 200, 340, fill=rgba((30, 24, 22), 200), width=2)
    return overlay(im, layer, 0.45)


def scene_cafe(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    im = gradient((w, h), (48, 32, 24), (16, 10, 8))
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.rectangle((0, 0, w, h * 0.58), fill=rgba((72, 48, 36), 255))
    d.rectangle((0, h * 0.58, w, h), fill=rgba((40, 26, 20), 255))
    win = (int(w * 0.12), int(h * 0.1), int(w * 0.88), int(h * 0.48))
    d.rectangle(win, fill=rgba((40, 52, 64), 255))
    window_casement(d, win, (86, 56, 40), 10)
    d.rectangle((w * 0.08, h * 0.62, w * 0.92, h * 0.7), fill=rgba((92, 62, 42), 255))
    d.ellipse((w * 0.28, h * 0.58, w * 0.4, h * 0.64), fill=rgba((210, 180, 140), 230))
    d.ellipse((w * 0.3, h * 0.54, w * 0.38, h * 0.6), fill=rgba((160, 120, 80), 230))
    d.ellipse((w * 0.58, h * 0.58, w * 0.7, h * 0.64), fill=rgba((210, 180, 140), 230))
    im = overlay(im, glow((w, h), w * 0.5, h * 0.28, 140, 70, (255, 170, 90), 40))
    return overlay(im, layer, 0.5)


def scene_snow(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    rng = rng_for(name)
    im = gradient((w, h), *sky_for("snow"))
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    fill_poly(layer, jagged_ridge(w, h * 0.62, 20, 9, rng), rgba((210, 218, 226), 255), (w, h))
    trees(layer, rng, h * 0.64, 7, (40, 48, 52), (70, 88, 78), 0.85)
    for _ in range(90):
        x, y = rng.randint(0, w), rng.randint(0, h)
        s = rng.choice((1, 2, 2, 3))
        d.ellipse((x, y, x + s, y + s), fill=rgba((240, 244, 250), rng.randint(80, 200)))
    return overlay(im, layer, 0.5)


def scene_bowl(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    im = gradient((w, h), (36, 30, 40), (12, 10, 14))
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.rectangle((0, h * 0.62, w, h), fill=rgba((28, 22, 24), 255))
    d.ellipse((w * 0.22, h * 0.5, w * 0.78, h * 0.78), fill=rgba((140, 112, 78), 240))
    d.ellipse((w * 0.3, h * 0.52, w * 0.7, h * 0.68), fill=rgba((48, 40, 36), 255))
    d.ellipse((w * 0.34, h * 0.54, w * 0.66, h * 0.64), fill=rgba((190, 160, 110), 80))
    im = overlay(im, glow((w, h), w * 0.5, h * 0.58, 140, 80, (220, 170, 90), 50))
    return overlay(im, layer, 0.7)


def scene_fan(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    im = gradient((w, h), (48, 52, 58), (20, 22, 26))
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.rectangle((0, h * 0.7, w, h), fill=rgba((32, 34, 38), 255))
    cx, cy = w * 0.5, h * 0.38
    d.ellipse((cx - 12, cy - 12, cx + 12, cy + 12), fill=rgba((180, 184, 190), 230))
    for i in range(3):
        ang = i * 120
        pts = []
        for t in (ang - 18, ang, ang + 18):
            rad = math.radians(t)
            pts.append((cx + math.cos(rad) * 90, cy + math.sin(rad) * 90))
        d.polygon([(cx, cy), pts[0], pts[2]], fill=rgba((160, 166, 174), 140))
    d.rectangle((w * 0.1, h * 0.12, w * 0.9, h * 0.16), fill=rgba((70, 74, 80), 200))
    return overlay(im, layer, 0.8)


def scene_piano(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    im = gradient((w, h), (32, 28, 36), (10, 8, 12))
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.rectangle((0, h * 0.58, w, h), fill=rgba((22, 18, 20), 255))
    d.polygon([(w * 0.12, h * 0.7), (w * 0.88, h * 0.62), (w * 0.88, h * 0.78), (w * 0.12, h * 0.86)], fill=rgba((18, 14, 16), 255))
    d.polygon([(w * 0.18, h * 0.68), (w * 0.82, h * 0.62), (w * 0.82, h * 0.7), (w * 0.18, h * 0.76)], fill=rgba((236, 228, 214), 230))
    for i in range(12):
        x = w * (0.2 + i * 0.05)
        d.rectangle((x, h * 0.62, x + w * 0.018, h * 0.7), fill=rgba((16, 12, 14), 230))
    d.rectangle((w * 0.72, h * 0.48, w * 0.78, h * 0.64), fill=rgba((48, 36, 28), 255))
    d.ellipse((w * 0.7, h * 0.42, w * 0.8, h * 0.5), fill=rgba((255, 200, 120), 90))
    im = overlay(im, glow((w, h), w * 0.75, h * 0.46, 50, 40, (255, 190, 100), 60))
    return overlay(im, layer, 0.6)


def scene_drone(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    rng = rng_for(name)
    im = gradient((w, h), *sky_for("violet"))
    sl = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    stars(sl, rng, 40, (200, 180, 230))
    im = overlay(im, sl)
    veil = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    ImageDraw.Draw(veil).ellipse((w * 0.1, h * 0.2, w * 0.9, h * 0.55), fill=rgba((120, 80, 160), 50))
    hill = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    fill_poly(hill, jagged_ridge(w, h * 0.7, 18, 8, rng), rgba((18, 12, 28), 255), (w, h))
    im = overlay(im, veil, 8)
    return overlay(im, hill, 0.5)


def scene_ohm(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    im = gradient((w, h), (58, 42, 36), (16, 12, 12))
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.polygon([(w * 0.18, h * 0.72), (w * 0.5, h * 0.28), (w * 0.82, h * 0.72)], fill=rgba((86, 64, 48), 0))  # skip triangle temple
    d.rectangle((w * 0.28, h * 0.42, w * 0.72, h * 0.78), fill=rgba((72, 52, 40), 255))
    d.rectangle((w * 0.22, h * 0.38, w * 0.78, h * 0.44), fill=rgba((92, 68, 50), 255))
    d.ellipse((w * 0.42, h * 0.48, w * 0.58, h * 0.78), fill=rgba((28, 18, 14), 255))
    d.rectangle((0, h * 0.76, w, h), fill=rgba((28, 20, 16), 255))
    im = overlay(im, glow((w, h), w * 0.5, h * 0.3, 90, 50, (255, 190, 110), 45))
    return overlay(im, layer, 0.5)


def scene_chime(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    rng = rng_for(name)
    im = gradient((w, h), *sky_for("dawn"))
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.rectangle((0, h * 0.7, w, h), fill=rgba((48, 40, 32), 255))
    d.rectangle((0, 0, w, h * 0.16), fill=rgba((42, 32, 26), 255))
    for i, hh in enumerate((90, 120, 80, 140, 100)):
        x = w * (0.28 + i * 0.11)
        d.line([(x, h * 0.16), (x, h * 0.16 + hh)], fill=rgba((180, 160, 110), 220), width=6)
        d.ellipse((x - 6, h * 0.16 + hh, x + 6, h * 0.16 + hh + 12), fill=rgba((140, 120, 80), 230))
    trees(layer, rng, h * 0.72, 3, (30, 40, 28), (40, 60, 36), 0.5)
    return overlay(im, layer, 0.4)


def scene_crystal(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    im = gradient((w, h), *sky_for("violet"))
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.rectangle((0, h * 0.7, w, h), fill=rgba((22, 16, 28), 255))
    d.polygon([(w * 0.5, h * 0.28), (w * 0.62, h * 0.72), (w * 0.38, h * 0.72)], fill=rgba((180, 160, 220), 140))
    d.polygon([(w * 0.5, h * 0.28), (w * 0.54, h * 0.7), (w * 0.46, h * 0.7)], fill=rgba((230, 220, 255), 90))
    im = overlay(im, glow((w, h), w * 0.5, h * 0.5, 80, 100, (180, 140, 220), 60))
    return overlay(im, layer, 0.8)


def scene_gong(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    im = gradient((w, h), (42, 32, 24), (12, 10, 10))
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.rectangle((0, h * 0.72, w, h), fill=rgba((24, 18, 14), 255))
    d.line([(w * 0.22, h * 0.22), (w * 0.78, h * 0.22)], fill=rgba((80, 60, 40), 230), width=8)
    d.ellipse((w * 0.28, h * 0.28, w * 0.72, h * 0.72), fill=rgba((168, 128, 64), 240))
    d.ellipse((w * 0.38, h * 0.38, w * 0.62, h * 0.62), fill=rgba((120, 88, 40), 180))
    im = overlay(im, glow((w, h), w * 0.5, h * 0.5, 110, 110, (220, 160, 70), 40))
    return overlay(im, layer, 0.5)


def scene_harp(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    im = gradient((w, h), (48, 36, 44), (16, 12, 16))
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.rectangle((0, h * 0.7, w, h), fill=rgba((28, 20, 22), 255))
    d.arc((w * 0.28, h * 0.22, w * 0.78, h * 0.78), 270, 90, fill=rgba((180, 150, 110), 230), width=8)
    d.line([(w * 0.38, h * 0.28), (w * 0.38, h * 0.78)], fill=rgba((160, 130, 90), 230), width=6)
    for i in range(8):
        x = w * (0.4 + i * 0.035)
        d.line([(x, h * (0.3 + i * 0.02)), (x + 40, h * 0.76)], fill=rgba((220, 210, 200), 140), width=1)
    d.ellipse((w * 0.7, h * 0.22, w * 0.84, h * 0.32), fill=rgba((255, 200, 120), 70))
    return overlay(im, layer, 0.5)


def scene_radio(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    im = gradient((w, h), (40, 32, 28), (14, 10, 10))
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.rectangle((0, h * 0.62, w, h), fill=rgba((32, 24, 20), 255))
    d.rounded_rectangle((w * 0.18, h * 0.38, w * 0.82, h * 0.68), radius=18, fill=rgba((92, 62, 42), 255))
    d.rounded_rectangle((w * 0.24, h * 0.44, w * 0.62, h * 0.56), radius=8, fill=rgba((30, 36, 32), 255))
    d.ellipse((w * 0.68, h * 0.44, w * 0.78, h * 0.56), fill=rgba((40, 32, 28), 255))
    d.rectangle((w * 0.72, h * 0.22, w * 0.76, h * 0.4), fill=rgba((60, 50, 44), 255))
    im = overlay(im, glow((w, h), w * 0.42, h * 0.5, 70, 30, (80, 180, 90), 50))
    return overlay(im, layer, 0.5)


def scene_well(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    rng = rng_for(name)
    im = gradient((w, h), *sky_for("sage"))
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    fill_poly(layer, jagged_ridge(w, h * 0.62, 10, 8, rng), rgba((46, 62, 42), 255), (w, h))
    d.ellipse((w * 0.28, h * 0.62, w * 0.72, h * 0.82), fill=rgba((80, 78, 70), 255))
    d.ellipse((w * 0.34, h * 0.64, w * 0.66, h * 0.78), fill=rgba((18, 28, 32), 255))
    d.rectangle((w * 0.3, h * 0.48, w * 0.36, h * 0.66), fill=rgba((70, 56, 42), 255))
    d.rectangle((w * 0.64, h * 0.48, w * 0.7, h * 0.66), fill=rgba((70, 56, 42), 255))
    d.line([(w * 0.3, h * 0.48), (w * 0.7, h * 0.48)], fill=rgba((70, 56, 42), 255), width=8)
    trees(layer, rng, h * 0.62, 3, (30, 40, 28), (36, 56, 36), 0.45)
    return overlay(im, layer, 0.45)


def scene_cat(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    im = scene_room(im, name + ":room")
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    # sill cat silhouette — no cartoon face
    d.ellipse((w * 0.58, h * 0.46, w * 0.78, h * 0.56), fill=rgba((28, 22, 20), 230))
    d.ellipse((w * 0.72, h * 0.42, w * 0.82, h * 0.52), fill=rgba((28, 22, 20), 230))
    d.polygon([(w * 0.74, h * 0.44), (w * 0.76, h * 0.36), (w * 0.78, h * 0.44)], fill=rgba((28, 22, 20), 230))
    d.polygon([(w * 0.78, h * 0.44), (w * 0.81, h * 0.36), (w * 0.82, h * 0.46)], fill=rgba((28, 22, 20), 230))
    d.arc((w * 0.78, h * 0.5, w * 0.92, h * 0.62), 200, 320, fill=rgba((28, 22, 20), 200), width=4)
    return overlay(im, layer, 0.4)


def scene_desk(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    im = gradient((w, h), (44, 48, 58), (18, 20, 26))
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    win = (int(w * 0.08), int(h * 0.08), int(w * 0.92), int(h * 0.42))
    d.rectangle(win, fill=rgba((110, 140, 160), 255))
    window_casement(d, win, (48, 50, 58), 10)
    d.rectangle((0, h * 0.58, w, h * 0.7), fill=rgba((92, 72, 54), 255))
    d.rectangle((w * 0.18, h * 0.48, w * 0.62, h * 0.58), fill=rgba((230, 224, 210), 230))
    d.rectangle((w * 0.22, h * 0.5, w * 0.5, h * 0.56), fill=rgba((40, 50, 80), 180))
    d.polygon([(w * 0.72, h * 0.52), (w * 0.86, h * 0.44), (w * 0.88, h * 0.58), (w * 0.74, h * 0.58)], fill=rgba((40, 36, 42), 230))
    im = overlay(im, glow((w, h), w * 0.8, h * 0.48, 40, 30, (255, 200, 120), 50))
    return overlay(im, layer, 0.45)


def scene_bed(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    im = gradient((w, h), (32, 28, 48), (12, 10, 18))
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.rectangle((0, 0, w, h * 0.5), fill=rgba((40, 34, 56), 255))
    d.rectangle((w * 0.08, h * 0.12, w * 0.48, h * 0.4), fill=rgba((60, 70, 100), 200))
    window_casement(d, (int(w * 0.08), int(h * 0.12), int(w * 0.48), int(h * 0.4)), (28, 24, 36), 8)
    d.polygon([(0, h * 0.62), (w, h * 0.54), (w, h), (0, h)], fill=rgba((48, 40, 58), 255))
    d.ellipse((w * 0.15, h * 0.58, w * 0.42, h * 0.7), fill=rgba((210, 200, 214), 200))
    d.ellipse((w * 0.7, h * 0.22, w * 0.86, h * 0.34), fill=rgba((255, 210, 140), 70))
    im = overlay(im, glow((w, h), w * 0.78, h * 0.28, 40, 30, (255, 200, 120), 55))
    return overlay(im, layer, 0.5)


def scene_objects(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    im = gradient((w, h), (52, 44, 40), (20, 16, 16))
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.rectangle((0, h * 0.62, w, h), fill=rgba((70, 54, 42), 255))
    d.ellipse((w * 0.16, h * 0.5, w * 0.36, h * 0.68), fill=rgba((140, 90, 70), 230))
    d.rectangle((w * 0.42, h * 0.48, w * 0.62, h * 0.66), fill=rgba((80, 90, 70), 230))
    d.polygon([(w * 0.72, h * 0.66), (w * 0.78, h * 0.46), (w * 0.88, h * 0.66)], fill=rgba((90, 70, 50), 0))
    d.ellipse((w * 0.7, h * 0.52, w * 0.9, h * 0.68), fill=rgba((180, 160, 120), 230))
    d.ellipse((w * 0.22, h * 0.52, w * 0.3, h * 0.56), fill=rgba((40, 30, 24), 180))
    im = overlay(im, glow((w, h), w * 0.5, h * 0.3, 100, 60, (255, 190, 120), 35))
    return overlay(im, layer, 0.5)


def scene_nebula(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    rng = rng_for(name)
    im = gradient((w, h), *sky_for("ink"))
    sl = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    stars(sl, rng, 90, (220, 200, 255))
    im = overlay(im, sl)
    im = overlay(im, glow((w, h), w * 0.4, h * 0.36, 140, 80, (140, 70, 160), 70))
    im = overlay(im, glow((w, h), w * 0.68, h * 0.42, 100, 70, (70, 90, 180), 55))
    hill = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    fill_poly(hill, jagged_ridge(w, h * 0.78, 14, 8, rng), rgba((8, 8, 16), 255), (w, h))
    return overlay(im, hill, 0.4)


def scene_myth(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    rng = rng_for(name)
    im = gradient((w, h), *sky_for("gold"))
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    fill_poly(layer, jagged_ridge(w, h * 0.58, 12, 9, rng), rgba((46, 58, 36), 255), (w, h))
    for i in range(5):
        x = w * (0.15 + i * 0.16)
        d.ellipse((x - 28, h * 0.46, x + 28, h * 0.62), fill=rgba((36, 52, 28), 220))
        d.rectangle((x - 4, h * 0.58, x + 4, h * 0.72), fill=rgba((48, 36, 22), 230))
    d.ellipse((w * 0.42, h * 0.7, w * 0.58, h * 0.78), fill=rgba((70, 56, 36), 200))
    return overlay(im, layer, 0.5)


def scene_kids(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    rng = rng_for(name)
    im = gradient((w, h), (140, 170, 190), (48, 70, 72))
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    fill_poly(layer, jagged_ridge(w, h * 0.62, 10, 8, rng), rgba((70, 110, 72), 255), (w, h))
    trees(layer, rng, h * 0.64, 4, (50, 40, 30), (50, 90, 50), 0.55)
    ImageDraw.Draw(layer).ellipse((w * 0.7, h * 0.16, w * 0.86, h * 0.28), fill=rgba((255, 220, 140), 90))
    return overlay(im, layer, 0.5)


def scene_talk(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    im = gradient((w, h), (48, 36, 52), (16, 12, 18))
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.rectangle((0, h * 0.62, w, h), fill=rgba((36, 28, 34), 255))
    d.polygon([(w * 0.18, h * 0.78), (w * 0.32, h * 0.58), (w * 0.48, h * 0.78)], fill=rgba((62, 46, 42), 230))
    d.polygon([(w * 0.52, h * 0.8), (w * 0.68, h * 0.56), (w * 0.84, h * 0.8)], fill=rgba((62, 46, 42), 230))
    d.ellipse((w * 0.42, h * 0.22, w * 0.58, h * 0.34), fill=rgba((255, 200, 120), 70))
    im = overlay(im, glow((w, h), w * 0.5, h * 0.28, 70, 50, (255, 180, 100), 50))
    return overlay(im, layer, 0.6)


def scene_guide(im: Image.Image, name: str) -> Image.Image:
    return scene_path(im, name + ":path")


def scene_podcast(im: Image.Image, name: str) -> Image.Image:
    return scene_talk(im, name + ":talk")


def scene_news(im: Image.Image, name: str) -> Image.Image:
    return scene_desk(im, name + ":desk")


def scene_work(im: Image.Image, name: str) -> Image.Image:
    return scene_desk(im, name)


def scene_task(im: Image.Image, name: str) -> Image.Image:
    return scene_desk(im, name + ":task")


def scene_freeze(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    rng = rng_for(name)
    im = gradient((w, h), (70, 92, 112), (18, 28, 40))
    frost = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(frost)
    window_casement(d, (int(w * 0.08), int(h * 0.08), int(w * 0.92), int(h * 0.92)), (200, 214, 226), 14)
    for _ in range(40):
        x, y = rng.uniform(w * 0.1, w * 0.9), rng.uniform(h * 0.1, h * 0.9)
        d.line([(x, y), (x + rng.uniform(-18, 18), y + rng.uniform(8, 28))], fill=rgba((210, 230, 240), 80), width=1)
    return overlay(im, frost, 0.4)


def scene_kind(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    rng = rng_for(name)
    im = gradient((w, h), *sky_for("rose"))
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    fill_poly(layer, jagged_ridge(w, h * 0.6, 12, 8, rng), rgba((70, 48, 52), 255), (w, h))
    trees(layer, rng, h * 0.62, 4, (48, 32, 30), (90, 50, 58), 0.55)
    return overlay(im, layer, 0.5)


def scene_54321(im: Image.Image, name: str) -> Image.Image:
    return scene_objects(im, name)


def scene_roomsound(im: Image.Image, name: str) -> Image.Image:
    return scene_room(im, name)


def scene_tension(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    im = gradient((w, h), (72, 32, 36), (18, 8, 12))
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    fill_poly(layer, jagged_ridge(w, h * 0.7, 22, 7, rng_for(name)), rgba((28, 12, 16), 255), (w, h))
    d.line([(0, h * 0.42), (w, h * 0.38)], fill=rgba((180, 80, 70), 90), width=3)
    return overlay(im, layer, 0.6)


def scene_wave(im: Image.Image, name: str) -> Image.Image:
    return scene_ocean(im, name + ":wave")


def scene_box(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    im = gradient((w, h), *sky_for("dusk"))
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.rectangle((0, h * 0.58, w, h), fill=rgba((28, 24, 36), 255))
    win = (int(w * 0.22), int(h * 0.18), int(w * 0.78), int(h * 0.52))
    d.rectangle(win, fill=rgba((90, 80, 110), 200))
    window_casement(d, win, (32, 28, 40), 10)
    return overlay(im, layer, 0.45)


def scene_478(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    im = gradient((w, h), *sky_for("violet"))
    im = moon(im, w * 0.7, h * 0.24, 24)
    land = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    fill_poly(land, jagged_ridge(w, h * 0.68, 14, 8, rng_for(name)), rgba((20, 16, 32), 255), (w, h))
    return overlay(im, land, 0.5)


def scene_sigh(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    im = gradient((w, h), *sky_for("mist"))
    mist = glow((w, h), w * 0.5, h * 0.45, 180, 80, (210, 214, 220), 50)
    land = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    fill_poly(land, jagged_ridge(w, h * 0.7, 10, 10, rng_for(name)), rgba((40, 44, 48), 255), (w, h))
    im = overlay(im, mist, 4)
    return overlay(im, land, 0.5)


def scene_equal(im: Image.Image, name: str) -> Image.Image:
    return scene_lake(im, name + ":eq")


def scene_count8(im: Image.Image, name: str) -> Image.Image:
    return scene_moon(im, name + ":c8")


def scene_clarity(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    rng = rng_for(name)
    im = gradient((w, h), (186, 148, 108), (46, 34, 38))
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.polygon([(0, 0), (w, 0), (w, h * 0.58), (0, h * 0.64)], fill=rgba((64, 48, 40), 255))
    d.polygon([(0, h * 0.6), (w, h * 0.54), (w, h), (0, h)], fill=rgba((40, 30, 26), 255))
    win = (int(w * 0.14), int(h * 0.1), int(w * 0.82), int(h * 0.46))
    d.rectangle(win, fill=rgba((220, 168, 108), 255))
    d.polygon(blob_poly(w * 0.64, h * 0.2, 40, 20, rng, 10), fill=rgba((255, 220, 150), 80))
    window_casement(d, win, (48, 34, 28), 11)
    curtains(d, win, (120, 72, 52))
    d.polygon([(w * 0.08, h * 0.68), (w * 0.92, h * 0.62), (w * 0.88, h * 0.72), (w * 0.1, h * 0.78)], fill=rgba((92, 64, 46), 255))
    d.polygon(blob_poly(w * 0.5, h * 0.64, 32, 12, rng, 8), fill=rgba((220, 196, 160), 190))
    im = overlay(im, glow((w, h), w * 0.5, h * 0.26, 150, 70, (255, 190, 110), 50))
    return overlay(im, layer, 0.18)


def scene_white(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    rng = rng_for(name)
    im = gradient((w, h), (168, 174, 182), (70, 76, 84))
    land = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    fill_poly(land, jagged_ridge(w, h * 0.68, 8, 10, rng), rgba((120, 126, 132), 255), (w, h))
    return overlay(im, land, 0.6)


def scene_pink(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    rng = rng_for(name)
    im = gradient((w, h), *sky_for("rose"))
    land = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    fill_poly(land, jagged_ridge(w, h * 0.66, 12, 8, rng), rgba((48, 28, 34), 255), (w, h))
    return overlay(im, land, 0.5)


def scene_brown(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    rng = rng_for(name)
    im = gradient((w, h), (92, 68, 48), (28, 18, 14))
    land = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    fill_poly(land, jagged_ridge(w, h * 0.6, 16, 8, rng), rgba((56, 38, 26), 255), (w, h))
    trees(land, rng, h * 0.62, 4, (40, 28, 18), (48, 40, 22), 0.5)
    return overlay(im, land, 0.5)


def scene_swell(im: Image.Image, name: str) -> Image.Image:
    return scene_ocean(im, name + ":swell")


def scene_tone(im: Image.Image, name: str) -> Image.Image:
    w, h = im.size
    rng = rng_for(name)
    key = key_of(name)
    pal = {
        "174": sky_for("violet"),
        "396": sky_for("ember"),
        "417": sky_for("teal"),
        "528": sky_for("sage"),
        "639": sky_for("rose"),
        "741": sky_for("dusk"),
        "852": sky_for("night"),
    }.get(key, sky_for("dusk"))
    im = gradient((w, h), *pal)
    sl = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    stars(sl, rng, 30)
    im = overlay(im, sl)
    im = overlay(im, glow((w, h), w * 0.5, h * 0.32, 120, 60, mix(pal[0], (255, 255, 255), 0.3), 60))
    hill = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    fill_poly(hill, jagged_ridge(w, h * 0.7, 16, 8, rng), rgba(mix(pal[1], (0, 0, 0), 0.2), 255), (w, h))
    return overlay(im, hill, 0.5)


SCENES: dict[str, callable] = {
    "mountain": scene_mountain,
    "lighthouse": scene_lighthouse,
    "moon": scene_moon,
    "clouds": scene_clouds,
    "palms": scene_palms,
    "forest": scene_forest,
    "lake": scene_lake,
    "nebula": scene_nebula,
    "kids": scene_kids,
    "myth": scene_myth,
    "talk": scene_talk,
    "work": scene_work,
    "news": scene_news,
    "guide": scene_guide,
    "podcast": scene_podcast,
    "path": scene_path,
    "radio": scene_radio,
    "freeze": scene_freeze,
    "cat": scene_cat,
    "well": scene_well,
    "room": scene_room,
    "task": scene_task,
    "about-sleep": scene_bed,
    "kind": scene_kind,
    "54321": scene_54321,
    "roomsound": scene_roomsound,
    "objects": scene_objects,
    "tension": scene_tension,
    "wave": scene_wave,
    "box": scene_box,
    "478": scene_478,
    "sigh": scene_sigh,
    "equal": scene_equal,
    "count8": scene_count8,
    "clarity": scene_clarity,
    "rain": scene_rain,
    "ocean": scene_ocean,
    "fire": scene_fire,
    "wind": scene_wind,
    "night": scene_night,
    "storm": scene_storm,
    "river": scene_river,
    "birds": scene_birds,
    "cafe": scene_cafe,
    "snow": scene_snow,
    "bowl": scene_bowl,
    "fan": scene_fan,
    "waves": scene_ocean,
    "piano": scene_piano,
    "drone": scene_drone,
    "ohm": scene_ohm,
    "chime": scene_chime,
    "crystal": scene_crystal,
    "gong": scene_gong,
    "swell": scene_swell,
    "harp": scene_harp,
    "white": scene_white,
    "pink": scene_pink,
    "brown": scene_brown,
    "174": scene_tone,
    "396": scene_tone,
    "417": scene_tone,
    "528": scene_tone,
    "639": scene_tone,
    "741": scene_tone,
    "852": scene_tone,
}

SKILL_SCENE = {
    "wellbeing": scene_kind,
    "performance": scene_path,
    "focus": scene_desk,
    "sleep": scene_bed,
    "breath": scene_wave,
    "ground": scene_forest,
    "kindness": scene_kind,
    "patience": scene_lake,
    "presence": scene_room,
    "body": scene_objects,
    "night": scene_night,
    "courage": scene_mountain,
}


def paint(name: str, size: tuple[int, int]) -> Image.Image:
    fn = SCENES.get(key_of(name), scene_lake)
    im = Image.new("RGB", size, (12, 10, 16))
    painted = fn(im, name)
    if painted.mode != "RGB":
        painted = painted.convert("RGB")
    painted = add_grain(painted, name, 0.05)
    painted = vignette(painted, 0.3)
    return compact(painted)


def make_skill(name: str) -> Image.Image:
    fn = SKILL_SCENE.get(name, scene_lake)
    im = Image.new("RGB", (256, 256), (12, 10, 16))
    painted = fn(im, f"skill-{name}")
    if painted.mode != "RGB":
        painted = painted.convert("RGB")
    painted = add_grain(painted, f"skill-{name}", 0.04)
    painted = vignette(painted, 0.28)
    mask = Image.new("L", painted.size, 0)
    ImageDraw.Draw(mask).ellipse((4, 4, 252, 252), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(radius=3))
    bg = Image.new("RGB", painted.size, (10, 8, 12))
    bg.paste(painted, mask=mask)
    return compact(bg, 140)


def make_face(i: int) -> Image.Image:
    hues = [
        ((48, 36, 52), (186, 150, 160)),
        ((32, 44, 58), (150, 170, 186)),
        ((52, 32, 36), (190, 140, 140)),
        ((32, 48, 42), (140, 170, 150)),
        ((48, 38, 28), (186, 150, 120)),
        ((40, 32, 56), (160, 148, 186)),
    ]
    bg, acc = hues[i % len(hues)]
    im = gradient((128, 128), bg, mix(bg, (8, 8, 12), 0.4))
    layer = Image.new("RGBA", im.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.ellipse((38, 28, 90, 88), fill=rgba(acc, 90))
    d.ellipse((48, 40, 80, 76), fill=rgba(mix(acc, (230, 220, 220), 0.25), 70))
    im = overlay(im, layer, 2)
    im = add_grain(im.convert("RGB"), f"face-{i}", 0.03)
    return compact(vignette(im, 0.2).filter(ImageFilter.SMOOTH), 80)


def save(im: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    im.save(path, "PNG", optimize=True, compress_level=9)


def main() -> None:
    COVERS.mkdir(parents=True, exist_ok=True)
    SKILLS.mkdir(parents=True, exist_ok=True)
    for name in COVER_NAMES:
        save(paint(name, (540, 720)), COVERS / f"cover-{name}.png")
    for name in SND_NAMES:
        save(paint(name, (540, 720)), COVERS / f"snd-{name}.png")
    for name in SKILL_NAMES:
        save(make_skill(name), SKILLS / f"skill-{name}.png")
    for i in range(1, 7):
        save(make_face(i), COVERS / f"face-{i}.png")
    print(f"wrote {len(COVER_NAMES)} covers, {len(SND_NAMES)} sounds, {len(SKILL_NAMES)} skills, 6 faces")


if __name__ == "__main__":
    main()
