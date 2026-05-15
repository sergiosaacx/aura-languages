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
const GH_TOKEN  = process.env.GH_TOKEN;
const GH_REPO   = 'sergiosaacx/aura-languages';

app.use(cors({ origin: '*' }));
app.use(express.json());

/* ─── cache de URLs de stream ───────────────────────────── */
const cache     = new Map();
const CACHE_TTL = 4 * 60 * 60 * 1000;

function getStreamUrl(videoId) {
  return new Promise((resolve, reject) => {
    const cmd = [
      'python3 -m yt_dlp',
      '-f "bestaudio[ext=m4a]/bestaudio/best"',
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

/* ─── descargar solo la sección de audio con ffmpeg ─────── */
function downloadAudioSection(streamUrl, startSec, endSec, outPath) {
  return new Promise((resolve, reject) => {
    const offset   = Math.max(0, startSec - 30);
    const duration = (endSec - offset) + 30;
    const cmd = [
      'ffmpeg -y',
      `-ss ${offset}`,
      `-t ${duration}`,
      `-i "${streamUrl}"`,
      '-vn -acodec libmp3lame -q:a 4',
      `"${outPath}"`
    ].join(' ');
    exec(cmd, { timeout: 120000 }, (err, _out, stderr) => {
      if (err) return reject(new Error(stderr.slice(-300) || err.message));
      resolve(offset);
    });
  });
}

/* ─── llamar a Whisper via HTTPS (sin SDK) ───────────────── */
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
          reject(new Error('Respuesta inválida de Whisper: ' + data.slice(0,200)));
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

    // Primero intentar obtener SHA existente
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
            reject(new Error(r.message || JSON.stringify(r).slice(0,200)));
          } catch(e) { reject(e); }
        });
      });
      req.on('error', reject);
      req.write(body);
      req.end();
    }

    // Obtener SHA si existe
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
   ENDPOINT: /stream — obtener URL de stream (existente)
══════════════════════════════════════════════════════════ */
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

/* ══════════════════════════════════════════════════════════
   ENDPOINT: /api/whisper-sync — procesar escena con Whisper
   Body: { videoId, slug, escenaNum, startTime, endTime }
══════════════════════════════════════════════════════════ */
app.post('/api/whisper-sync', async (req, res) => {
  const { videoId, slug, escenaNum, startTime, endTime } = req.body;

  if (!videoId || !slug || !escenaNum)
    return res.status(400).json({ error: 'Faltan campos: videoId, slug, escenaNum' });

  const start  = parseFloat(startTime) || 0;
  const end    = parseFloat(endTime)   || start + 300;
  const tmpAudio = path.join(os.tmpdir(), `whisper_${videoId}_${Date.now()}.mp3`);

  console.log(`[whisper-sync] ${slug}/escena-${escenaNum} | yt:${videoId} | ${start}s–${end}s`);

  try {
    // 1. Obtener URL del stream
    console.log('[whisper-sync] obteniendo stream URL...');
    const streamUrl = await getStreamUrl(videoId);

    // 2. Descargar sección de audio con ffmpeg
    console.log('[whisper-sync] descargando audio...');
    const offset = await downloadAudioSection(streamUrl, start, end, tmpAudio);
    const fileSize = fs.statSync(tmpAudio).size;
    console.log(`[whisper-sync] audio listo: ${(fileSize/1024/1024).toFixed(1)} MB, offset=${offset}s`);

    if (fileSize > 24 * 1024 * 1024)
      return res.status(400).json({ error: 'Sección muy larga — reduce el rango de la escena' });

    // 3. Llamar a Whisper API
    console.log('[whisper-sync] enviando a Whisper...');
    const result = await callWhisper(tmpAudio);
    const whisperWords    = result.words    || [];
    const whisperSegments = result.segments || [];
    console.log(`[whisper-sync] Whisper: ${whisperSegments.length} segmentos, ${whisperWords.length} palabras`);

    // 4. Ajustar timestamps (sumar offset) y filtrar al rango de la escena
    const adjustedWords = whisperWords.map(w => ({
      word: w.word,
      start: Math.round((w.start + offset) * 1000) / 1000,
      end:   Math.round((w.end   + offset) * 1000) / 1000
    }));

    const adjustedSegments = whisperSegments.map(s => ({
      text:  s.text.trim(),
      start: Math.round((s.start + offset) * 1000) / 1000,
      end:   Math.round((s.end   + offset) * 1000) / 1000
    })).filter(s => s.start >= start - 2 && s.start <= end + 2 && s.text);

    // 5. Construir lyrics con words
    const lyrics = adjustedSegments.map(seg => {
      const words = adjustedWords
        .filter(w => w.start >= seg.start - 0.3 && w.start <= seg.end + 0.3)
        .map(w => ({ w: w.word.trim(), t: w.start }));

      return {
        t:     seg.start,
        end:   seg.end,
        text:  seg.text,
        words: words
      };
    }).filter(l => l.words.length > 0);

    // 6. Construir JSON completo de la escena
    const sceneJson = {
      videoId,
      gaps: [{ start: 0, end: start, nextT: start }],
      lyrics
    };

    const jsonStr   = JSON.stringify(sceneJson, null, 2);
    const filePath  = `data/movies/${slug}/escena-${escenaNum}.json`;

    // 7. Subir a GitHub
    console.log(`[whisper-sync] subiendo a GitHub: ${filePath}`);
    await githubPut(
      filePath,
      jsonStr,
      `whisper: ${slug} escena-${escenaNum} — ${lyrics.length} líneas sincronizadas`
    );

    console.log(`[whisper-sync] ✅ completado — ${lyrics.length} líneas`);
    res.json({
      ok:          true,
      filePath,
      dataUrl:     filePath,
      lyricsCount: lyrics.length,
      json:        sceneJson
    });

  } catch(e) {
    console.error('[whisper-sync] ERROR:', e.message);
    res.status(500).json({ error: e.message.slice(0, 400) });
  } finally {
    try { fs.unlinkSync(tmpAudio); } catch(_) {}
  }
});

/* ─── health ─────────────────────────────────────────────── */
app.get('/health', (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`Aura Stream API en :${PORT}`));
