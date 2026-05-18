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


/* ══════════════════════════════════════════════════════════════════════════
   ENDPOINT: /api/parse-content
   Usa GPT-4o-mini para extraer y estructurar contenido desde texto crudo
   de un documento Word (procesado con mammoth en el navegador).

   Body: { type: 'collocations' | 'flashcards', rawText: string }
   Response: { ok: true, data: [...] }
══════════════════════════════════════════════════════════════════════════ */
app.post('/api/parse-content', express.json({ limit: '2mb' }), async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { type, rawText } = req.body || {};
  if (!type || !rawText) return res.status(400).json({ error: 'Faltan type y rawText' });

  const prompts = {

    collocations: `Eres un experto en didáctica del inglés para hispanohablantes.
Recibirás el texto extraído de un documento Word que contiene frases de colocaciones en inglés.
El documento puede tener formato de tabla o texto libre — no importa el formato, tú debes entender el contenido.

OBJETIVO: Extraer TODAS las frases de colocaciones y devolver un array JSON estructurado.

Para cada frase debes retornar un objeto con estos campos EXACTOS:
{
  "es": "La frase en español tal como aparece (con comillas si las tiene, ej: \"Tomé una decisión\")",
  "en": ["palabra1", "palabra2", "palabra3"],   // TODOS los words de la frase inglesa como array
  "cat": "patrón gramatical (ej: make + noun, do + noun, be + adjective, take + noun, etc.)",
  "tag": "versión corta del cat (ej: make · noun)",
  "hint": "Pista pedagógica en español: explica QUÉ verbo usar y POR QUÉ en max 10 palabras",
  "traps": ["verbo1", "verbo2", "word3", "word4", "word5", "word6"],  // 5-8 distractores: el verbo incorrecto más probable + palabras confusas
  "explanation": "Explicación en español de 2-3 oraciones: por qué esta colocación es correcta, qué error cometen los hispanohablantes y 1-2 ejemplos similares"
}

REGLAS CRÍTICAS:
- "en" debe contener TODAS las palabras de la frase inglesa como palabras individuales en el orden correcto
- Los "traps" siempre deben incluir el verbo equivocado más tentador (ej: si la respuesta es "make", incluye "do" y "take")
- Los "traps" deben ser palabras individuales en minúsculas
- El "hint" NO debe revelar la respuesta directamente, solo dar una pista
- Si el documento ya tiene trampas/distractores definidos, úsalos; si no, infiere los mejores
- Si hay campos faltantes en el documento, infiere valores pedagógicamente correctos
- NO incluyas la fila de encabezados, solo las frases de contenido
- Devuelve ÚNICAMENTE el array JSON, sin texto adicional, sin markdown, sin explicaciones

Texto del documento:
${rawText.slice(0, 8000)}`,

    flashcards: `Eres un experto en vocabulario slang y coloquial en inglés para hispanohablantes.
Recibirás el texto extraído de un documento Word con tarjetas de vocabulario slang.
El documento puede tener formato de tabla o texto libre — no importa el formato, tú debes entender el contenido.

OBJETIVO: Extraer TODAS las tarjetas de vocabulario y devolver un array JSON estructurado.

Para cada tarjeta debes retornar un objeto con estos campos EXACTOS:
{
  "word": "La palabra o expresión slang en inglés (tal como aparece)",
  "example": "Una oración de ejemplo usando la palabra en contexto real y natural",
  "distractor": "Una palabra o expresión incorrecta que los hispanohablantes confunden con esta (el error más común)",
  "definition": "Definición en español: qué significa, cuándo se usa, registro (informal/coloquial/vulgar/etc.)",
  "cat": "Categoría gramatical o temática (ej: slang, phrasal verb, idiom, internet slang, etc.)"
}

REGLAS CRÍTICAS:
- El "example" debe ser una oración completa, natural y contextualizada (no solo la palabra sola)
- El "distractor" debe ser algo que un hispanohablante realmente confundiría (calco del español o sinónimo incorrecto)
- La "definition" debe ser clara, en español, y mencionar el nivel de formalidad
- Si el documento ya tiene ejemplos/definiciones, úsalos y mejóralos si es necesario
- Si hay campos faltantes, infiere valores didácticamente correctos
- NO incluyas la fila de encabezados, solo las tarjetas de contenido
- Devuelve ÚNICAMENTE el array JSON, sin texto adicional, sin markdown, sin explicaciones

Texto del documento:
${rawText.slice(0, 8000)}`
  };

  const prompt = prompts[type];
  if (!prompt) return res.status(400).json({ error: 'type inválido: usa collocations o flashcards' });

  try {
    const body = JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
      max_tokens: 6000
    });

    const result = await new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.openai.com',
        path: '/v1/chat/completions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_KEY}`,
          'Content-Length': Buffer.byteLength(body)
        }
      };
      const reqAI = https.request(options, (r) => {
        let data = '';
        r.on('data', c => data += c);
        r.on('end', () => {
          try { resolve(JSON.parse(data)); }
          catch(e) { reject(new Error('Respuesta inválida de OpenAI: ' + data.slice(0,200))); }
        });
      });
      reqAI.on('error', reject);
      reqAI.write(body);
      reqAI.end();
    });

    if (result.error) return res.status(500).json({ error: result.error.message });

    const text = result.choices[0].message.content.trim();
    // Extraer el array JSON aunque OpenAI añada texto extra
    const match = text.match(/\[\s*\{[\s\S]*\}\s*\]/);
    if (!match) return res.status(500).json({ error: 'OpenAI no devolvió JSON válido', raw: text.slice(0,300) });

    const data = JSON.parse(match[0]);
    console.log(`[parse-content] ${type}: ${data.length} elementos extraídos`);
    res.json({ ok: true, data, count: data.length });

  } catch(err) {
    console.error('[parse-content]', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.options('/api/parse-content', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.sendStatus(204);
});

/* ─── health ─────────────────────────────────────────────── */
app.get('/health', (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`Aura Stream API en :${PORT}`));
