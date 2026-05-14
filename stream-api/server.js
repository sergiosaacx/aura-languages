const express = require('express');
const cors    = require('cors');
const { exec } = require('youtube-dl-exec');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── CORS: permite GitHub Pages + localhost ─────────────────────────────────
app.use(cors({
  origin: [
    /\.github\.io$/,
    /localhost/,
    /127\.0\.0\.1/
  ]
}));

// ── Cache en memoria (4 h — las URLs expiran en ~6 h) ─────────────────────
const cache   = new Map();
const CACHE_TTL = 4 * 60 * 60 * 1000;

// ── GET /stream?videoId=XXXX ──────────────────────────────────────────────
app.get('/stream', async (req, res) => {
  const { videoId } = req.query;

  // Validar formato de videoId de YouTube
  if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
    return res.status(400).json({ error: 'videoId inválido' });
  }

  // Devolver desde caché si está fresco
  const cached = cache.get(videoId);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    console.log('[cache hit]', videoId);
    return res.json({ url: cached.url });
  }

  console.log('[yt-dlp]', videoId);
  try {
    const result = await exec(
      `https://www.youtube.com/watch?v=${videoId}`,
      {
        format: 'best[ext=mp4]/bestvideo[ext=mp4]+bestaudio[ext=m4a]/best',
        getUrl: true,
        noPlaylist: true,
        noCheckCertificates: true,
        noWarnings: true,
        addHeader: [
          'referer:youtube.com',
          'user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        ]
      }
    );

    // stdout puede traer varias líneas (video + audio); tomamos la primera
    const url = result.stdout.trim().split('\n')[0];
    if (!url) throw new Error('yt-dlp no devolvió URL');

    cache.set(videoId, { url, ts: Date.now() });
    res.json({ url });

  } catch (err) {
    console.error('[error]', videoId, err.message);
    res.status(500).json({ error: 'No se pudo obtener el stream', detail: err.message });
  }
});

// ── GET /health — para el keep-alive del cliente ──────────────────────────
app.get('/health', (_req, res) => res.json({ ok: true, ts: Date.now() }));

app.listen(PORT, () => console.log(`Aura Stream API corriendo en puerto ${PORT}`));
