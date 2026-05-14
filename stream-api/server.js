const express  = require('express');
const cors     = require('cors');
const { exec } = require('child_process');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));

const cache     = new Map();
const CACHE_TTL = 4 * 60 * 60 * 1000; // 4 horas

function getStreamUrl(videoId) {
  return new Promise((resolve, reject) => {
    const cmd = [
      'python3 -m yt_dlp',
      '-f "best[ext=mp4]/bestvideo[ext=mp4]+bestaudio[ext=m4a]/best"',
      '--get-url',
      '--no-playlist',
      '--no-check-certificates',
      '--no-warnings',
      '--extractor-args "youtube:player_client=android,web"',
      `"https://www.youtube.com/watch?v=${videoId}"`
    ].join(' ');

    exec(cmd, { timeout: 30000 }, (err, stdout, stderr) => {
      if (err) return reject(new Error(stderr || err.message));
      const url = stdout.trim().split('\n')[0];
      if (!url) return reject(new Error('yt-dlp no devolvió URL'));
      resolve(url);
    });
  });
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

  console.log('[yt-dlp]', videoId);
  try {
    const url = await getStreamUrl(videoId);
    cache.set(videoId, { url, ts: Date.now() });
    console.log('[ok]', videoId, url.slice(0, 60));
    res.json({ url });
  } catch(e) {
    console.error('[500]', e.message.slice(0, 200));
    res.status(500).json({ error: e.message.slice(0, 200) });
  }
});

app.get('/health', (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`Aura Stream API en :${PORT}`));
