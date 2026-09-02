// Service Worker do AdestraPet — otimizado para PWA + TWA (Trusted Web Activity).
//
// Estratégia:
// - Precache de rotas críticas na instalação (home + manifest + ícones)
// - HTML: network-first com fallback offline (conteúdo sempre fresco)
// - Assets estáticos (CSS/JS/fontes/imagens): stale-while-revalidate
// - Navegação offline: fallback para home cacheada

const CACHE_VERSION = "adestrapet-v2";
const PRECACHE_URLS = [
  "/",
  "/manifest.webmanifest",
  "/icon.svg",
  "/icon-192.png",
  "/icon-512.png",
  "/favicon.ico",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) =>
        // addAll falha se algum recurso não existir; usamos add individual com catch
        Promise.all(
          PRECACHE_URLS.map((url) =>
            cache.add(url).catch((err) => {
              console.warn(`[SW] Falha ao precachear ${url}:`, err);
            })
          )
        )
      )
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== CACHE_VERSION)
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Não interceptar requisições cross-origin (CDNs, etc.)
  if (url.origin !== self.location.origin) return;

  // Não interceptar chamadas de API internas (se houver no futuro)
  if (url.pathname.startsWith("/api/")) return;

  // HTML/navegação → network-first com fallback offline
  if (
    request.mode === "navigate" ||
    request.headers.get("accept")?.includes("text/html")
  ) {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((c) => c.put(request, copy));
          return res;
        })
        .catch(() =>
          caches.match(request).then((r) => r || caches.match("/"))
        )
    );
    return;
  }

  // Assets estáticos → stale-while-revalidate
  event.respondWith(
    caches.match(request).then((cached) => {
      const fetchPromise = fetch(request)
        .then((res) => {
          if (res && res.status === 200 && res.type === "basic") {
            const copy = res.clone();
            caches.open(CACHE_VERSION).then((c) => c.put(request, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })
  );
});

// Permite que a página dispare skipWaiting via postMessage
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
