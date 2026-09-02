import type { MetadataRoute } from "next";
import { PRODUCT } from "@/config/product";

/**
 * Web App Manifest do AdestraPet — preparado para TWA (Trusted Web Activity).
 *
 * Campos críticos para TWA/Android:
 * - `start_url`: deve ser absoluta (https://adestrapet.vercel.app/)
 * - `scope`: raiz do app (define até onde o TWA "abraça" o site)
 * - `id`: identificador único (PWA >= 2024)
 * - `display: standalone`:remove barra do navegador
 * - `display_override: ["window-controls-overlay", "standalone", "browser"]`:
 *   permite fullscreen sem barra superior no Android
 * - `display_override` é reconhecido por TWA via Bubblewrap/Lighthouse
 * - ícones maskable em 192 e 512 (necessários para Android adaptive icons)
 */
export default function manifest(): MetadataRoute.Manifest {
  const siteUrl = PRODUCT.siteUrl;

  return {
    id: "/adestrapet/",
    name: `${PRODUCT.name} — ${PRODUCT.tagline}`,
    short_name: PRODUCT.name,
    description: PRODUCT.description,
    start_url: `${siteUrl}/?source=pwa`,
    scope: `${siteUrl}/`,
    display: "standalone",
    display_override: ["window-controls-overlay", "standalone", "minimal-ui"],
    orientation: "portrait-primary",
    background_color: "#fdf6e3",
    theme_color: "#b87333",
    lang: "pt-BR",
    dir: "ltr",
    categories: ["education", "lifestyle", "productivity"],
    prefer_related_applications: false,
    icons: [
      // SVG (escalável, ideal para Android)
      {
        src: `${siteUrl}/icon.svg`,
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      // PNG 192x192 (qualquer uso)
      {
        src: `${siteUrl}/icon-192.png`,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      // PNG 192x192 (maskable — adaptive icon Android)
      {
        src: `${siteUrl}/icon-192-maskable.png`,
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      // PNG 512x512 (qualquer uso)
      {
        src: `${siteUrl}/icon-512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      // PNG 512x512 (maskable — adaptive icon Android)
      {
        src: `${siteUrl}/icon-512-maskable.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Treinos",
        short_name: "Treinos",
        description: "Ver todos os exercícios de adestramento",
        url: `${siteUrl}/?tab=training`,
        icons: [{ src: `${siteUrl}/icon-192.png`, sizes: "192x192" }],
      },
      {
        name: "Agenda",
        short_name: "Agenda",
        description: "Próximos treinos agendados",
        url: `${siteUrl}/?tab=schedule`,
        icons: [{ src: `${siteUrl}/icon-192.png`, sizes: "192x192" }],
      },
      {
        name: "Progresso",
        short_name: "Progresso",
        description: "Acompanhe sua evolução",
        url: `${siteUrl}/?tab=progress`,
        icons: [{ src: `${siteUrl}/icon-192.png`, sizes: "192x192" }],
      },
    ],
  };
}
