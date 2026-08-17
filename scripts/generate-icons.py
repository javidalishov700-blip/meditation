#!/usr/bin/env python3
"""PWA / Apple touch icons matching public/favicon.svg (dawn + standing figure)."""
from __future__ import annotations

import math
import struct
import zlib
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public"

SKY = [
    (0.00, (26, 12, 46)),
    (0.32, (74, 42, 120)),
    (0.58, (212, 137, 122)),
    (0.78, (240, 196, 138)),
    (1.00, (246, 215, 168)),
]


def lerp(a: float, b: float, t: float) -> float:
    return a + (b - a) * t


def mix(c1: tuple[int, int, int], c2: tuple[int, int, int], t: float) -> tuple[int, int, int]:
    t = max(0.0, min(1.0, t))
    return (
        int(lerp(c1[0], c2[0], t)),
        int(lerp(c1[1], c2[1], t)),
        int(lerp(c1[2], c2[2], t)),
    )


def sky_at(ny: float) -> tuple[int, int, int]:
    for i in range(len(SKY) - 1):
        a, ca = SKY[i]
        b, cb = SKY[i + 1]
        if ny <= b:
            return mix(ca, cb, (ny - a) / (b - a) if b > a else 0)
    return SKY[-1][1]


def chunk(tag: bytes, data: bytes) -> bytes:
    return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)


def dist(x: float, y: float, cx: float, cy: float) -> float:
    return math.hypot(x - cx, y - cy)


def stamp_disk(buf: list[list[tuple[int, int, int]]], cx: float, cy: float, r: float, color: tuple[int, int, int], scale: int) -> None:
    r2 = r * r
    x0, x1 = max(0, int(cx - r - 1)), min(scale, int(cx + r + 2))
    y0, y1 = max(0, int(cy - r - 1)), min(scale, int(cy + r + 2))
    for y in range(y0, y1):
        for x in range(x0, x1):
            d2 = (x + 0.5 - cx) ** 2 + (y + 0.5 - cy) ** 2
            if d2 <= r2:
                edge = math.sqrt(d2) / r if r else 0
                buf[y][x] = mix(color, buf[y][x], edge**6 * 0.15)


def stamp_line(
    buf: list[list[tuple[int, int, int]]],
    x0: float,
    y0: float,
    x1: float,
    y1: float,
    width: float,
    color: tuple[int, int, int],
    scale: int,
) -> None:
    steps = max(int(dist(x0, y0, x1, y1) * 2), 8)
    for i in range(steps + 1):
        t = i / steps
        stamp_disk(buf, lerp(x0, x1, t), lerp(y0, y1, t), width / 2, color, scale)


def paint(size: int) -> list[list[tuple[int, int, int]]]:
    scale = size * 2
    buf = [[(0, 0, 0) for _ in range(scale)] for _ in range(scale)]
    cream = (255, 246, 232)

    for y in range(scale):
        ny = y / (scale - 1)
        sky = sky_at(ny)
        row = buf[y]
        for x in range(scale):
            nx = x / (scale - 1)
            col = sky
            d = dist(nx, ny, 0.50, 0.42)
            if d < 0.48:
                t = d / 0.48
                sun = mix((255, 248, 228), (232, 144, 144), t)
                a = max(0.0, 1.0 - t) ** 1.15
                col = mix(col, sun, a)
            hill_y = 0.66 + 0.07 * math.cos((nx - 0.5) * math.pi)
            if ny > hill_y:
                ht = min(1.0, (ny - hill_y) / 0.18)
                col = mix(col, (16, 8, 24), 0.62 + 0.38 * ht)
            row[x] = col

    hx, hy = scale * 0.50, scale * 0.565
    stamp_disk(buf, hx, hy, scale * 0.038, cream, scale)
    stamp_line(buf, hx, hy + scale * 0.045, hx, hy + scale * 0.155, scale * 0.031, cream, scale)
    stamp_line(buf, hx - scale * 0.055, hy + scale * 0.095, hx + scale * 0.055, hy + scale * 0.095, scale * 0.024, cream, scale)
    stamp_line(buf, hx, hy + scale * 0.155, hx - scale * 0.038, hy + scale * 0.25, scale * 0.024, cream, scale)
    stamp_line(buf, hx, hy + scale * 0.155, hx + scale * 0.038, hy + scale * 0.25, scale * 0.024, cream, scale)

    out: list[list[tuple[int, int, int]]] = []
    for y in range(size):
        row: list[tuple[int, int, int]] = []
        for x in range(size):
            r = g = b = 0
            for oy in range(2):
                for ox in range(2):
                    c = buf[y * 2 + oy][x * 2 + ox]
                    r += c[0]
                    g += c[1]
                    b += c[2]
            row.append((r // 4, g // 4, b // 4))
        out.append(row)
    return out


def write_png(path: Path, size: int, *, alpha: bool = True) -> None:
    pixels = paint(size)
    rows = []
    color_type = 6 if alpha else 2
    for y in range(size):
        row = [b"\x00"]
        for x in range(size):
            r, g, b = pixels[y][x]
            row.append(bytes((r, g, b, 255) if alpha else (r, g, b)))
        rows.append(b"".join(row))
    raw = b"".join(rows)
    ihdr = struct.pack(">IIBBBBB", size, size, 8, color_type, 0, 0, 0)
    png = b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr) + chunk(b"IDAT", zlib.compress(raw, 9)) + chunk(b"IEND", b"")
    path.write_bytes(png)


def main() -> None:
    OUT.mkdir(exist_ok=True)
    write_png(OUT / "icon-192.png", 192)
    write_png(OUT / "icon-512.png", 512)
    write_png(OUT / "apple-touch-icon.png", 180)
    # iOS App Store marketing icon: 1024² RGB, no alpha (actool rejects 512@2x + RGBA).
    write_png(OUT / "icon-1024.png", 1024, alpha=False)
    print("wrote icons")


if __name__ == "__main__":
    main()
