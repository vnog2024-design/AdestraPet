"""Gera ícones PNG e ICO a partir do icon.svg do AdestraPet."""
import subprocess
import sys
from pathlib import Path

PUBLIC = Path("/home/z/my-project/public")
SVG = PUBLIC / "icon.svg"

if not SVG.exists():
    print(f"ERRO: {SVG} não encontrado")
    sys.exit(1)

try:
    import cairosvg
except ImportError:
    print("Instalando cairosvg...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "cairosvg", "--quiet"])
    import cairosvg

try:
    from PIL import Image
except ImportError:
    print("Instalando Pillow...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow", "--quiet"])
    from PIL import Image

targets = [
    ("icon-192.png", 192, 192),
    ("icon-512.png", 512, 512),
    ("icon-512-maskable.png", 512, 512),
    ("apple-icon.png", 180, 180),
]

for name, w, h in targets:
    out = PUBLIC / name
    cairosvg.svg2png(url=str(SVG), write_to=str(out), output_width=w, output_height=h)
    print(f"OK: {name} ({w}x{h})")

# OG image 1200x630 (rectangular) — render with background color
og = PUBLIC / "og-image.png"
cairosvg.svg2png(
    url=str(SVG),
    write_to=str(og),
    output_width=1200,
    output_height=630,
    background_color="#d4912a",
)
print("OK: og-image.png (1200x630)")

# favicon.ico (multiresolution)
ico_sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
imgs = []
for s in ico_sizes:
    tmp = PUBLIC / f"_tmp_{s[0]}.png"
    cairosvg.svg2png(url=str(SVG), write_to=str(tmp), output_width=s[0], output_height=s[1])
    imgs.append(Image.open(tmp))
imgs[0].save(
    PUBLIC / "favicon.ico",
    format="ICO",
    sizes=ico_sizes,
    append_images=imgs[1:],
)
for s in ico_sizes:
    (PUBLIC / f"_tmp_{s[0]}.png").unlink(missing_ok=True)
print("OK: favicon.ico")
