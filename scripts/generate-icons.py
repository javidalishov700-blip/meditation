#!/usr/bin/env python3
"""Tiny PNG icons for the Steady PWA (no extra deps)."""
from __future__ import annotations

import struct
import zlib
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public"


def chunk(tag: bytes, data: bytes) -> bytes:
    return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)


def write_png(path: Path, size: int) -> None:
    rows = []
    cx = cy = size / 2
    r_outer = size * 0.36
    r_inner = size * 0.14
    for y in range(size):
        row = [b"\x00"]
        for x in range(size):
            dx, dy = x - cx, y - cy
            d = (dx * dx + dy * dy) ** 0.5
            if d <= r_inner:
                row.append(bytes((249, 168, 212, 255)))
            elif d <= r_outer:
                t = (d - r_inner) / (r_outer - r_inner)
                r = int(244 * (1 - t) + 74 * t)
                g = int(114 * (1 - t) + 4 * t)
                b = int(182 * (1 - t) + 78 * t)
                row.append(bytes((r, g, b, 255)))
            else:
                row.append(bytes((18, 8, 20, 255)))
        rows.append(b"".join(row))
    raw = b"".join(rows)
    ihdr = struct.pack(">IIBBBBB", size, size, 8, 6, 0, 0, 0)
    png = b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr) + chunk(b"IDAT", zlib.compress(raw, 9)) + chunk(b"IEND", b"")
    path.write_bytes(png)


def main() -> None:
    OUT.mkdir(exist_ok=True)
    write_png(OUT / "icon-192.png", 192)
    write_png(OUT / "icon-512.png", 512)
    write_png(OUT / "apple-touch-icon.png", 180)
    print("wrote icons")


if __name__ == "__main__":
    main()
