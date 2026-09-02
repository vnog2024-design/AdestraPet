"""Gera imagens de produto 600x600 para a Hotmart (capa + thumbnails).

Cria 3 imagens:
- product-cover-600.png (capa principal com logo + título)
- product-feature-600.png (ícone + nome + tagline)
- product-benefits-600.png (logo + lista de features resumida)

Usa a identidade visual já existente (pata âmbar em fundo creme).
"""
import subprocess
import sys
from pathlib import Path

try:
    import cairosvg
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "cairosvg", "--quiet"])
    import cairosvg

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow", "--quiet"])
    from PIL import Image, ImageDraw, ImageFont

PUBLIC = Path("/home/z/my-project/public")
SVG = PUBLIC / "icon.svg"

# Cores da identidade visual (coincidem com globals.css)
BG_COLOR = (253, 246, 227)       # #fdf6e3 (background amber claro)
PRIMARY = (184, 115, 51)          # oklch ~#b87333 (amber/marrom)
PRIMARY_DARK = (138, 80, 30)      # variação mais escura
TEXT = (44, 32, 18)                # foreground amber
MUTED = (124, 108, 84)            # muted foreground

# Tenta encontrar uma fonte bonita; fallback para default
def get_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def render_paw_logo(size: int) -> Image.Image:
    """Renderiza o logo pata a partir do SVG, retorna como PIL Image RGBA."""
    tmp_png = PUBLIC / "_tmp_paw.png"
    cairosvg.svg2png(url=str(SVG), write_to=str(tmp_png), output_width=size, output_height=size)
    img = Image.open(tmp_png).convert("RGBA")
    tmp_png.unlink()
    return img


def create_cover():
    """Capa principal: logo grande + nome + tagline."""
    W = H = 600
    img = Image.new("RGB", (W, H), BG_COLOR)
    draw = ImageDraw.Draw(img)

    # Borda sutil âmbar
    draw.rectangle([0, 0, W - 1, H - 1], outline=PRIMARY, width=6)

    # Logo pata (220x220) centralizado no topo
    paw = render_paw_logo(220)
    img.paste(paw, ((W - 220) // 2, 70), paw)

    # Nome "AdestraPet"
    font_name = get_font(58, bold=True)
    text = "AdestraPet"
    bbox = draw.textbbox((0, 0), text, font=font_name)
    text_w = bbox[2] - bbox[0]
    draw.text(((W - text_w) // 2, 310), text, fill=PRIMARY_DARK, font=font_name)

    # Tagline
    font_tag = get_font(22)
    tagline = "Treinamento de Cães com Método Positivo"
    bbox = draw.textbbox((0, 0), tagline, font=font_tag)
    text_w = bbox[2] - bbox[0]
    draw.text(((W - text_w) // 2, 385), tagline, fill=MUTED, font=font_tag)

    # Faixa âmbar inferior
    draw.rectangle([0, 470, W, 540], fill=PRIMARY)
    font_cta = get_font(24, bold=True)
    cta = "Programa Completo • 12 Exercícios • Acesso Vitalício"
    bbox = draw.textbbox((0, 0), cta, font=font_cta)
    text_w = bbox[2] - bbox[0]
    draw.text(((W - text_w) // 2, 493), cta, fill=BG_COLOR, font=font_cta)

    # Pequenas patas decorativas no canto
    paw_small = render_paw_logo(50)
    paw_small.putalpha(80)  # semi-transparente
    img.paste(paw_small, (30, 525), paw_small)
    img.paste(paw_small, (520, 525), paw_small)

    out = PUBLIC / "product-cover-600.png"
    img.save(out, "PNG", optimize=True)
    print(f"OK: {out.name} ({out.stat().st_size // 1024} KB)")


def create_feature():
    """Imagem secundária: ícone + nome + 3 features principais."""
    W = H = 600
    img = Image.new("RGB", (W, H), BG_COLOR)
    draw = ImageDraw.Draw(img)

    # Logo pata no canto superior esquerdo
    paw = render_paw_logo(140)
    img.paste(paw, (40, 40), paw)

    # Nome
    font_name = get_font(48, bold=True)
    draw.text((200, 80), "AdestraPet", fill=PRIMARY_DARK, font=font_name)
    font_tag = get_font(20)
    draw.text((200, 140), "Adestramento de Cães", fill=MUTED, font=font_tag)

    # Features
    font_feat = get_font(26, bold=True)
    font_desc = get_font(20)
    features = [
        ("🐾", "12 exercícios completos", "Passo a passo em 4 categorias"),
        ("📱", "Funciona no celular", "PWA — instala como app"),
        (" offline", "Modo offline", "Use mesmo sem internet"),
        ("♾️", "Acesso vitalício", "Paga uma vez, usa para sempre"),
    ]
    y = 230
    for emoji, title, desc in features:
        draw.text((60, y), emoji, fill=PRIMARY, font=font_feat)
        draw.text((110, y), title, fill=TEXT, font=font_feat)
        draw.text((110, y + 35), desc, fill=MUTED, font=font_desc)
        y += 85

    out = PUBLIC / "product-feature-600.png"
    img.save(out, "PNG", optimize=True)
    print(f"OK: {out.name} ({out.stat().st_size // 1024} KB)")


def create_benefits():
    """Imagem de benefícios: layout simples com lista de transformações."""
    W = H = 600
    img = Image.new("RGB", (W, H), PRIMARY_DARK)
    draw = ImageDraw.Draw(img)

    # Título no topo
    font_title = get_font(36, bold=True)
    title = "Resultados em poucas semanas"
    bbox = draw.textbbox((0, 0), title, font=font_title)
    text_w = bbox[2] - bbox[0]
    draw.text(((W - text_w) // 2, 40), title, fill=BG_COLOR, font=font_title)

    # Linha decorativa
    draw.rectangle([(W - 100) // 2, 95, (W + 100) // 2, 100], fill=PRIMARY)

    # Lista de benefícios
    font_item = get_font(24, bold=True)
    items = [
        "✓  Sentar, deitar e ficar quando pedir",
        "✓  Vir quando chamado (mesmo distraído)",
        "✓  Andar junto sem puxar a guia",
        "✓  Fazer necessidades no lugar certo",
        "✓  Parar de latir em excesso",
        "✓  Fazer truques que encantam visitas",
        "✓  Socializar com cães e pessoas",
        "✓  Vínculo forte com o dono",
    ]
    y = 140
    for item in items:
        draw.text((50, y), item, fill=BG_COLOR, font=font_item)
        y += 50

    # Logo pata no canto
    paw = render_paw_logo(100)
    img.paste(paw, (470, 470), paw)

    out = PUBLIC / "product-benefits-600.png"
    img.save(out, "PNG", optimize=True)
    print(f"OK: {out.name} ({out.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    create_cover()
    create_feature()
    create_benefits()
    print("\nTodas as imagens 600x600 criadas em /public/")
