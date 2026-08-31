#!/usr/bin/env python3
"""Detecta pacotes npm que não são mais importados em nenhum arquivo .ts/.tsx."""
import re
from pathlib import Path

ROOT = Path("/home/z/my-project")
SRC_DIRS = [ROOT / "src"]

# Pacotes a sempre manter (framework ou configs que não são "importadas" diretamente)
KEEP = {
    "next",
    "react",
    "react-dom",
    "typescript",
    "tailwindcss",
    "@tailwindcss/postcss",
    "tailwindcss-animate",
    "tailwind-merge",
    "tw-animate-css",
    "eslint",
    "eslint-config-next",
    "@types/react",
    "@types/react-dom",
    "@types/node",
    "class-variance-authority",
    "clsx",
    "lucide-react",
    "next-themes",
    "sonner",
    "date-fns",
}

def collect_imports():
    pattern = re.compile(r'(?:from\s+["\']|import\s+["\'])(@?[a-zA-Z0-9][\w\-/.]*)["\']')
    imports = set()
    for d in SRC_DIRS:
        for f in d.rglob("*"):
            if f.suffix not in {".ts", ".tsx"}:
                continue
            try:
                text = f.read_text(encoding="utf-8")
            except Exception:
                continue
            for m in pattern.finditer(text):
                pkg = m.group(1)
                # normaliza para o nome do pacote raiz
                if pkg.startswith("@"):
                    parts = pkg.split("/")
                    if len(parts) >= 2:
                        pkg = f"{parts[0]}/{parts[1]}"
                else:
                    pkg = pkg.split("/")[0]
                imports.add(pkg)
    return imports

def main():
    imports = collect_imports()
    import json
    pkg = json.loads((ROOT / "package.json").read_text())
    deps = set(pkg.get("dependencies", {}).keys())
    devdeps = set(pkg.get("devDependencies", {}).keys())
    all_deps = deps | devdeps

    unused = sorted((all_deps - imports) - KEEP)
    print(f"Total packages: {len(all_deps)}")
    print(f"Imports found: {len(imports)}")
    print(f"Unused ({len(unused)}):")
    for u in unused:
        print(f"  - {u}")

if __name__ == "__main__":
    main()
