const express = require('express');
const cors    = require('cors');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));

const cache     = new Map();
const CACHE_TTL = 2 * 60 * 60 * 1000; // 2 horas

// Instancias públicas de Piped — intenta en orden hasta que una responda
const PIPED = [
  'https://pipedapi.kavin.rocks',
  'https://api.piped.projectsegfault.net',
  'https://pipedapi.tokhmi.xyz',
  'https://piped-api.garudalinux.org'
];

async function getStream(videoId) {
  for (const base of PIPED) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 9000);
      const r  = await fetch(`${base}/streams/${videoId}`, { signal: ctrl.signal });
      clearTimeout(t);

      if (!r.ok) { console.log(`[skip] ${base} → ${r.status}`); continue; }

      const data = await r.json();

      // Buscar stream de video+audio (no video-only) en mp4
      const s = (data.videoStreams || []).find(x => !x.videoOnly && x.mimeType?.includes('mp4'))
             || (data.videoStreams || []).find(x => !x.videoOnly);

      if (s?.url)    { console.log(`[ok] ${base}`); return s.url; }
      if (data.hls)  { console.log(`[hls] ${base}`); return data.hls; }

      console.log(`[miss] ${base} — sin stream útil`);
    } catch(e) {
      console.log(`[err] ${base} — ${e.message}`);
    }
  }
  throw new Error('Todas las instancias de Piped fallaron');
}

app.get('/stream', async (req, res) => {
  const { videoId } = req.query;
  if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId))
    return res.status(400).json({ error: 'videoId inválido' });

  const hit = cache.get(videoId);
  if (hit && Date.now() - hit.ts < CACHE_TTL) {
    console.log('[cache]', videoId);
    return res.json({ url: hit.url });
  }

  console.log('[fetch]', videoId);
  try {
    const url = await getStream(videoId);
    cache.set(videoId, { url, ts: Date.now() });
    res.json({ url });
  } catch(e) {
    console.error('[500]', e.message);
    res.status(500).json({ error: e.message });
  }
});

app.get('/health', (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`Aura Stream API en :${PORT}`));
