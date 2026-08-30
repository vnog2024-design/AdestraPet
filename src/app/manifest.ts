import type { MetadataRoute } from "next";
import { PRODUCT } from "@/config/product";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${PRODUCT.name} — ${PRODUCT.tagline}`,
    short_name: PRODUCT.name,
    description: PRODUCT.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fdf6e3",
    theme_color: "#b87333",
    orientation: "portrait-primary",
    lang: "pt-BR",
    categories: ["education", "lifestyle", "productivity"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
