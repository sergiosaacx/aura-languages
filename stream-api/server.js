const express  = require('express');
const cors     = require('cors');
const { exec } = require('child_process');
const fs       = require('fs');
const path     = require('path');
const os       = require('os');
const https    = require('https');

const app  = express();
const PORT = process.env.PORT || 3000;

const OPENAI_KEY = process.env.OPENAI_API_KEY;
const GH_TOKEN   = process.env.GH_TOKEN;
const GH_REPO    = 'sergiosaacx/aura-languages';

app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '2mb' })); // cookies pueden ser grandes

/* ─── escribir cookies a /tmp ───────────────────────────── */
function writeCookies(cookiesContent) {
  const cookiePath = path.join(os.tmpdir(), 'yt_cookies.txt');
  if (cookiesContent && cookiesContent.trim()) {
    fs.writeFileSync(cookiePath, cookiesContent, 'utf-8');
    return cookiePath;
  }
  return null;
}

/* ─── yt-dlp: descargar con formato 18 (360p mp4, sin DASH, sin ffmpeg) ── */
// Formato 18 = único stream progresivo, funciona en cloud sin JS runtime ni ffmpeg.
// Whisper acepta mp4 nativamente — sin conversión.
function downloadAudioFromYouTube(videoId, cookiePath) {
  return new Promise((resolve, reject) => {
    const cookieFlag = cookiePath ? `--cookies "${cookiePath}"` : '';
    const ts      = Date.now();
    const outPath = path.join(os.tmpdir(), `whisper_${videoId}_${ts}.mp4`);

    const cmd = [
      'python3 -m yt_dlp',
      '-f "18"',
      '--no-playlist',
      '--no-check-certificates',
      '--no-warnings',
      '--extractor-args "youtube:player_client=android,web"',
      cookieFlag,
      `-o "${outPath}"`,
      `"https://www.youtube.com/watch?v=${videoId}"`
    ].filter(Boolean).join(' ');

    console.log('[yt-dlp] descargando formato 18...');
    exec(cmd, { timeout: 180000 }, (err, _out, stderr) => {
      if (err) return reject(new Error(stderr.slice(-600) || err.message));
      if (!fs.existsSync(outPath)) return reject(new Error('yt-dlp: archivo no generado'));
      const mb = (fs.statSync(outPath).size / 1024 / 1024).toFixed(1);
      console.log(`[yt-dlp] OK → ${outPath} (${mb} MB)`);
      resolve(outPath);
    });
  });
}

/* ─── Whisper API ───────────────────────────────────────── */
function callWhisper(audioPath) {
  return new Promise((resolve, reject) => {
    const FormData = require('form-data');
    const form = new FormData();
    form.append('model', 'whisper-1');
    form.append('response_format', 'verbose_json');
    form.append('timestamp_granularities[]', 'word');
    form.append('timestamp_granularities[]', 'segment');
    form.append('file', fs.createReadStream(audioPath), {
      filename: 'audio.mp3',
      contentType: 'audio/mpeg'
    });

    const options = {
      hostname: 'api.openai.com',
      path: '/v1/audio/transcriptions',
      method: 'POST',
      headers: {
        ...form.getHeaders(),
        'Authorization': `Bearer ${OPENAI_KEY}`
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) return reject(new Error(parsed.error.message));
          resolve(parsed);
        } catch(e) {
          reject(new Error('Respuesta inválida de Whisper: ' + data.slice(0, 200)));
        }
      });
    });
    req.on('error', reject);
    form.pipe(req);
  });
}

/* ─── GitHub: subir archivo ─────────────────────────────── */
function githubPut(filePath, content, message) {
  return new Promise((resolve, reject) => {
    const encoded = Buffer.from(content, 'utf-8').toString('base64');

    function doRequest(sha) {
      const body = JSON.stringify({
        message,
        content: encoded,
        ...(sha ? { sha } : {})
      });
      const opts = {
        hostname: 'api.github.com',
        path: `/repos/${GH_REPO}/contents/${filePath}`,
        method: 'PUT',
        headers: {
          'Authorization': `token ${GH_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
          'User-Agent': 'aura-stream-api',
          'Content-Length': Buffer.byteLength(body)
        }
      };
      const req = https.request(opts, (res) => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => {
          try {
            const r = JSON.parse(data);
            if (r.commit) return resolve(r.commit.sha);
            reject(new Error(r.message || JSON.stringify(r).slice(0, 200)));
          } catch(e) { reject(e); }
        });
      });
      req.on('error', reject);
      req.write(body);
      req.end();
    }

    const getOpts = {
      hostname: 'api.github.com',
      path: `/repos/${GH_REPO}/contents/${filePath}`,
      method: 'GET',
      headers: {
        'Authorization': `token ${GH_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'aura-stream-api'
      }
    };
    const getReq = https.request(getOpts, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try { doRequest(JSON.parse(d).sha); }
        catch(e) { doRequest(null); }
      });
    });
    getReq.on('error', () => doRequest(null));
    getReq.end();
  });
}

/* ══════════════════════════════════════════════════════════
   ENDPOINT: /api/whisper-sync
   Body: { videoId, slug, escenaNum, startTime, endTime, cookies }
   - cookies: contenido del archivo cookies.txt (string)
══════════════════════════════════════════════════════════ */
app.post('/api/whisper-sync', async (req, res) => {
  const { videoId, slug, escenaNum, startTime, endTime, cookies } = req.body;

  if (!videoId || !slug || !escenaNum)
    return res.status(400).json({ error: 'Faltan campos: videoId, slug, escenaNum' });

  if (!cookies || !cookies.trim())
    return res.status(400).json({
      error: 'COOKIES_MISSING',
      message: 'No hay cookies de YouTube configuradas. Ve a Configuración Whisper en el admin y pega tu archivo cookies.txt.'
    });

  const start    = parseFloat(startTime) || 0;
  const end      = parseFloat(endTime)   || start + 300;
  let tmpAudio  = null;
  let cookiePath = null;

  console.log(`[whisper-sync] ${slug}/escena-${escenaNum} | yt:${videoId} | ${start}s–${end}s`);

  try {
    // 1. Escribir cookies al disco
    cookiePath = writeCookies(cookies);
    console.log('[whisper-sync] cookies escritas en', cookiePath);

    // 2. Descargar video completo con formato 18 (360p mp4, sin DASH, sin ffmpeg)
    console.log('[whisper-sync] descargando con yt-dlp formato 18...');
    const audioPath = await downloadAudioFromYouTube(videoId, cookiePath);
    tmpAudio = audioPath;
    const fileSize = fs.statSync(audioPath).size;
    console.log(`[whisper-sync] descargado: ${(fileSize/1024/1024).toFixed(1)} MB`);

    if (fileSize > 100 * 1024 * 1024)
      return res.status(400).json({ error: 'Video muy grande — usa un clip más corto' });

    // 3. Llamar a Whisper API (acepta mp4 nativamente)
    console.log('[whisper-sync] enviando a Whisper...');
    const result          = await callWhisper(audioPath);
    const whisperWords    = result.words    || [];
    const whisperSegments = result.segments || [];
    console.log(`[whisper-sync] Whisper: ${whisperSegments.length} segmentos, ${whisperWords.length} palabras`);

    // Los timestamps de Whisper son absolutos desde t=0 del video — coinciden exactamente
    const offset = 0;
    const adjustedWords = whisperWords.map(w => ({
      word:  w.word,
      start: Math.round(w.start * 1000) / 1000,
      end:   Math.round(w.end   * 1000) / 1000
    }));

    const adjustedSegments = whisperSegments.map(s => ({
      text:  s.text.trim(),
      start: Math.round(s.start * 1000) / 1000,
      end:   Math.round(s.end   * 1000) / 1000
    })).filter(s => s.start >= start - 2 && s.start <= end + 2 && s.text);

    // 6. Construir lyrics con words
    const lyrics = adjustedSegments.map(seg => {
      const words = adjustedWords
        .filter(w => w.start >= seg.start - 0.3 && w.start <= seg.end + 0.3)
        .map(w => ({ w: w.word.trim(), t: w.start }));
      return { t: seg.start, end: seg.end, text: seg.text, words };
    }).filter(l => l.words.length > 0);

    // 7. Construir JSON de la escena y subir a GitHub
    const sceneJson = {
      videoId,
      gaps: [{ start: 0, end: start, nextT: start }],
      lyrics
    };
    const jsonStr  = JSON.stringify(sceneJson, null, 2);
    const filePath = `data/movies/${slug}/escena-${escenaNum}.json`;

    console.log(`[whisper-sync] subiendo a GitHub: ${filePath}`);
    await githubPut(filePath, jsonStr,
      `whisper: ${slug} escena-${escenaNum} — ${lyrics.length} líneas sincronizadas`);

    console.log(`[whisper-sync] ✅ ${lyrics.length} líneas`);
    res.json({ ok: true, filePath, dataUrl: filePath, lyricsCount: lyrics.length, json: sceneJson });

  } catch(e) {
    console.error('[whisper-sync] ERROR:', e.message);

    // Detectar error de cookies/autenticación de YouTube
    const msg = e.message || '';
    const isCookieError = msg.includes('Sign in') || msg.includes('bot') ||
                          msg.includes('403') || msg.includes('Private') ||
                          msg.includes('confirm your age') || msg.includes('cookies');

    res.status(500).json({
      error: isCookieError ? 'COOKIES_EXPIRED' : msg.slice(0, 400),
      message: isCookieError
        ? 'Las cookies de YouTube expiraron. Ve a Configuración Whisper en el admin y pega un nuevo cookies.txt.'
        : msg.slice(0, 400)
    });
  } finally {
    try { fs.unlinkSync(tmpAudio); } catch(_) {}
    try { if (cookiePath) fs.unlinkSync(cookiePath); } catch(_) {}
  }
});

/* ─── health ─────────────────────────────────────────────── */
app.get('/health', (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`Aura Stream API en :${PORT}`));
