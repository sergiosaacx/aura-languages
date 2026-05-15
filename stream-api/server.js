const express  = require('express');
const cors     = require('cors');
const { exec } = require('child_process');
const https    = require('https');

const app  = express();
const PORT = process.env.PORT || 3000;

const GH_TOKEN = process.env.GH_TOKEN;
const GH_REPO  = 'sergiosaacx/aura-languages';

app.use(cors({ origin: '*' }));
app.use(express.json());

/* ─── youtube-transcript-api → lyrics array ─────────────── */
function getTranscriptPython(videoId, startSec, endSec) {
  return new Promise((resolve, reject) => {
    const script = `
import json, sys
try:
    from youtube_transcript_api import YouTubeTranscriptApi
    api = YouTubeTranscriptApi()
    # Try multiple language options
    result = None
    for lang in [['en'], ['en-US'], ['en-GB'], None]:
        try:
            result = api.fetch('${videoId}', languages=lang) if lang else api.fetch('${videoId}')
            break
        except Exception:
            continue
    if result is None:
        raise Exception('No transcript found in any language')
    out = [{'text': s.text, 'start': s.start, 'duration': s.duration} for s in result]
    print(json.dumps(out))
except Exception as e:
    print(json.dumps({'error': str(e)}), file=sys.stderr)
    sys.exit(1)
`.replace(/'/g, "'").replace(/\n/g, '\\n');

    const cmd = `python3 -c "${script.replace(/\n/g, '').replace(/"/g, '\\"')}"`;
    const fullCmd = `python3 << 'PYEOF'\nimport json, sys\ntry:\n    from youtube_transcript_api import YouTubeTranscriptApi\n    api = YouTubeTranscriptApi()\n    result = None\n    for lang in [['en'], ['en-US'], ['en-GB']]:\n        try:\n            result = api.fetch('${videoId}', languages=lang)\n            break\n        except Exception:\n            continue\n    if result is None:\n        result = api.fetch('${videoId}')\n    out = [{'text': s.text, 'start': s.start, 'duration': s.duration} for s in result]\n    print(json.dumps(out))\nexcept Exception as e:\n    print(json.dumps({'error': str(e)}), file=sys.stderr)\n    sys.exit(1)\nPYEOF`;

    exec(fullCmd, { timeout: 30000 }, (err, stdout, stderr) => {
      if (err) {
        const errMsg = stderr ? stderr.slice(0, 300) : err.message;
        return reject(new Error('transcript-api: ' + errMsg));
      }
      try {
        const raw = JSON.parse(stdout.trim());
        if (!Array.isArray(raw)) return reject(new Error('Respuesta inesperada del transcript'));

        const startMs = startSec;
        const endMs   = endSec;
        const MARGIN  = 5; // 5s margin

        const lyrics = raw
          .filter(s => s.start >= startMs - MARGIN && s.start <= endMs + MARGIN)
          .map(s => ({
            t:    Math.round(s.start * 100) / 100,
            end:  Math.round((s.start + (s.duration || 2)) * 100) / 100,
            text: (s.text || '').replace(/\n/g, ' ').replace(/\[.*?\]/g, '').trim(),
            words: (s.text || '').replace(/\[.*?\]/g, '').trim()
              .split(/\s+/)
              .filter(w => w)
              .map(w => ({ w, t: Math.round(s.start * 100) / 100 }))
          }))
          .filter(l => l.text.length > 0);

        if (lyrics.length === 0)
          return reject(new Error('Transcripción obtenida pero ninguna línea en el rango de la escena (start=' + startSec + 's end=' + endSec + 's)'));

        console.log('[transcript] OK — ' + lyrics.length + ' líneas para ' + videoId);
        resolve(lyrics);
      } catch(e) {
        reject(new Error('parse error: ' + e.message + ' | raw: ' + stdout.slice(0, 100)));
      }
    });
  });
}

/* ─── GitHub: subir archivo ─────────────────────────────── */
function githubPut(filePath, content, message) {
  return new Promise((resolve, reject) => {
    const encoded = Buffer.from(content, 'utf-8').toString('base64');

    function doRequest(sha) {
      const body = JSON.stringify({ message, content: encoded, ...(sha ? { sha } : {}) });
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
   Body: { videoId, slug, escenaNum, startTime, endTime }
══════════════════════════════════════════════════════════ */
app.post('/api/whisper-sync', async (req, res) => {
  const { videoId, slug, escenaNum, startTime, endTime } = req.body;

  if (!videoId || !slug || !escenaNum)
    return res.status(400).json({ error: 'Faltan campos: videoId, slug, escenaNum' });

  const start = parseFloat(startTime) || 0;
  const end   = parseFloat(endTime)   || start + 300;

  console.log('[whisper-sync] ' + slug + '/escena-' + escenaNum + ' | yt:' + videoId + ' | ' + start + 's–' + end + 's');

  let lyrics = null;

  try {
    console.log('[whisper-sync] obteniendo transcript via youtube-transcript-api...');
    lyrics = await getTranscriptPython(videoId, start, end);
  } catch(e) {
    console.error('[whisper-sync] transcript falló:', e.message);
    return res.status(500).json({
      error: 'No se pudo obtener el transcript del video. ' +
             'Causa: ' + e.message.slice(0, 250) + '. ' +
             'Si el video no tiene subtítulos en inglés activados en YouTube, ' +
             'agrega la frase y el banco de palabras manualmente.'
    });
  }

  try {
    const sceneJson = {
      videoId,
      gaps: [{ start: 0, end: start, nextT: start }],
      lyrics
    };

    const jsonStr  = JSON.stringify(sceneJson, null, 2);
    const filePath = 'data/movies/' + slug + '/escena-' + escenaNum + '.json';

    console.log('[whisper-sync] subiendo a GitHub: ' + filePath);
    await githubPut(filePath, jsonStr, 'sync: ' + slug + ' escena-' + escenaNum + ' — ' + lyrics.length + ' líneas');

    console.log('[whisper-sync] ✅ ' + lyrics.length + ' líneas');
    res.json({ ok: true, filePath, dataUrl: filePath, lyricsCount: lyrics.length, json: sceneJson });

  } catch(e) {
    console.error('[whisper-sync] ERROR GitHub:', e.message);
    res.status(500).json({ error: 'Transcript OK pero error al subir a GitHub: ' + e.message.slice(0, 200) });
  }
});

/* ─── health ─────────────────────────────────────────────── */
app.get('/health', (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log('Aura Stream API en :' + PORT));
