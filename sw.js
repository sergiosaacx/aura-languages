/* ============================================================
   AURA LANGUAGES — Service Worker
   Estrategia: Network-first para HTML/JS/CSS (siempre fresco)
                Cache-first para imágenes/fuentes (estáticos)
   ============================================================ */

const CACHE_NAME = 'aura-v16';
const CACHE_STATIC = 'aura-static-v9';

// Assets que cacheamos de inmediato al instalar
const PRECACHE = [
  '/',
  '/home.html',
  '/login.html',
  '/aura-supabase.js',
  '/aura-shell.js',
  '/site.webmanifest',
  '/apple-touch-icon.png',
  '/icon-192.png',
  '/icon-512.png'
];

// ── INSTALL: precachear assets críticos ──────────────────────
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_STATIC).then(cache => {
      // Intentamos cachear cada asset individualmente
      // Si uno falla no bloquea el resto
      return Promise.allSettled(
        PRECACHE.map(url => cache.add(url).catch(() => {}))
      );
    })
  );
});

// ── ACTIVATE: limpiar caches viejos ─────────────────────────
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== CACHE_STATIC)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH: estrategia por tipo de recurso ────────────────────
self.addEventListener('fetch', e => {
  const { request } = e;
  const url = new URL(request.url);

  // Solo interceptar requests del mismo origen o GitHub Pages
  if (url.origin !== self.location.origin) return;

  // Ignorar requests que no son GET
  if (request.method !== 'GET') return;

  // Nunca cachear páginas de admin
  if (url.pathname.includes('admin-')) return;
  
  // Ignorar Supabase y APIs externas
  if (url.hostname.includes('supabase.co')) return;
  if (url.hostname.includes('googleapis.com')) return;
  if (url.hostname.includes('youtube.com')) return;

  const isHTML = request.destination === 'document' ||
                 url.pathname.endsWith('.html') ||
                 url.pathname === '/';

  const isStatic = request.destination === 'image' ||
                   request.destination === 'font' ||
                   url.pathname.match(/\.(png|jpg|jpeg|svg|gif|ico|woff|woff2|ttf)$/i);

  const isScript = request.destination === 'script' ||
                   request.destination === 'style' ||
                   url.pathname.match(/\.(js|css)$/i);

  if (isHTML || isScript) {
    // Network-first: intenta red, si falla usa caché
    e.respondWith(networkFirst(request));
  } else if (isStatic) {
    // Cache-first: usa caché, si no hay va a red
    e.respondWith(cacheFirst(request));
  }
  // Resto: comportamiento normal del browser
});

// ── Network-first ────────────────────────────────────────────
async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request, { cache: "reload" });
    if (response && response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;
    // Fallback offline para HTML
    const fallback = await caches.match('/home.html');
    return fallback || new Response('Sin conexión', { status: 503 });
  }
}

// ── Cache-first ───────────────────────────────────────────────
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(CACHE_STATIC);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('', { status: 404 });
  }
}

// ── PUSH NOTIFICATIONS ───────────────────────────────────────
self.addEventListener('push', e => {
  let data = { title: 'Aura Languages', body: '¡Tienes una notificación nueva!' };
  try { data = e.data.json(); } catch {}

  e.waitUntil(
    self.registration.showNotification(data.title || 'Aura Languages', {
      body: data.body || '',
      icon: '/icon-192.png',
      badge: '/apple-touch-icon.png',
      vibrate: [100, 50, 100],
      data: { url: data.url || '/home.html' }
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = e.notification.data?.url || '/home.html';
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      const existing = list.find(c => c.url.includes(url));
      if (existing) return existing.focus();
      return clients.openWindow(url);
    })
  );
});
