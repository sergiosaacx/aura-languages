const express = require('express');
const cors    = require('cors');
const { exec } = require('youtube-dl-exec');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));

const cache   = new Map();
const CACHE_TTL = 4 * 60 * 60 * 1000;

app.get('/stream', async (req, res) => {
  const { videoId } = req.query;
  if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
    return res.status(400).json({ error: 'videoId inválido' });
  }

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
        extractor_args: 'youtube:player_client=android,web',
        addHeader: [
          'referer:youtube.com',
          'user-agent:com.google.android.youtube/17.36.4 (Linux; U; Android 12; GB) gzip'
        ]
      }
    );

    const url = result.stdout.trim().split('\n')[0];
    if (!url) throw new Error('yt-dlp no devolvió URL');

    cache.set(videoId, { url, ts: Date.now() });
    res.json({ url });

  } catch (err) {
    console.error('[error]', videoId, err.stderr || err.message);
    res.status(500).json({ error: 'No se pudo obtener el stream', detail: err.stderr || err.message });
  }
});

app.get('/health', (_req, res) => res.json({ ok: true, ts: Date.now() }));

app.listen(PORT, () => console.log(`Aura Stream API en puerto ${PORT}`));
