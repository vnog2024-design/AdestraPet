#!/usr/bin/env python3
"""Detecta componentes UI shadcn não importados em nenhum lugar do projeto."""
import re
from pathlib import Path

SRC = Path("/home/z/my-project/src")
UI_DIR = SRC / "components" / "ui"
EXCLUDE = {"ui"}  # pastas a ignorar

def used_components():
    """Retorna o set de nomes de componentes ui que aparecem importados em outros arquivos."""
    pattern = re.compile(r'@/components/ui/([a-zA-Z0-9_-]+)')
    used = set()
    for path in SRC.rglob("*.tsx"):
        if "components/ui" in str(path):
            continue
        try:
            text = path.read_text(encoding="utf-8")
        except Exception:
            continue
        for m in pattern.finditer(text):
            used.add(m.group(1))
    return used

def list_ui_files():
    return {p.stem for p in UI_DIR.glob("*.tsx")}

def main():
    used = used_components()
    files = list_ui_files()
    unused = sorted(files - used)
    print(f"Total UI components: {len(files)}")
    print(f"Used: {len(used)}")
    print(f"Unused ({len(unused)}):")
    for u in unused:
        print(f"  - {u}")

if __name__ == "__main__":
    main()
