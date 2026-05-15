#!/usr/bin/env python3
"""
Whisper Sync — Aura Languages
Descarga audio de YouTube, transcribe con Whisper API (word-level),
actualiza el JSON de la película en el repo y Supabase (si hay credenciales).
"""

import os, sys, json, subprocess, tempfile, requests, openai

# ── Configuración desde variables de entorno ───────────────────────────────
VIDEO_ID    = os.environ['VIDEO_ID']
SLUG        = os.environ['SLUG']
ESCENA_NUM  = int(os.environ['ESCENA_NUM'])
START_TIME  = float(os.environ.get('START_TIME') or 0)
END_TIME    = float(os.environ.get('END_TIME')   or 0)
OPENAI_KEY  = os.environ['OPENAI_API_KEY']
SUPABASE_URL = os.environ.get('SUPABASE_URL', '')
SUPABASE_KEY = os.environ.get('SUPABASE_KEY', '')

print(f"[whisper] ▶ {SLUG} | escena {ESCENA_NUM} | video {VIDEO_ID} [{START_TIME}s–{END_TIME}s]")

# ── Paso 1: Descargar audio completo ──────────────────────────────────────
with tempfile.TemporaryDirectory() as tmpdir:
    audio_path = os.path.join(tmpdir, 'audio.mp3')

    cmd = [
        'yt-dlp', '-x', '--audio-format', 'mp3',
        '--no-playlist', '--no-check-certificates', '--no-warnings',
        '-o', audio_path,
        f'https://www.youtube.com/watch?v={VIDEO_ID}'
    ]
    print(f"[whisper] Descargando audio...")
    r = subprocess.run(cmd, capture_output=True, text=True, timeout=300)
    if r.returncode != 0:
        print(f"[ERROR] yt-dlp:\n{r.stderr[-800:]}")
        sys.exit(1)

    if not os.path.exists(audio_path):
        # yt-dlp a veces guarda con extensión diferente
        candidates = [f for f in os.listdir(tmpdir) if f.startswith('audio')]
        if not candidates:
            print("[ERROR] No se generó archivo de audio")
            sys.exit(1)
        audio_path = os.path.join(tmpdir, candidates[0])

    size_mb = os.path.getsize(audio_path) / 1024 / 1024
    print(f"[whisper] Audio OK — {size_mb:.1f} MB ({audio_path})")

    # ── Paso 2: Llamar a Whisper API ──────────────────────────────────────
    client = openai.OpenAI(api_key=OPENAI_KEY)
    print(f"[whisper] Enviando a Whisper API...")
    with open(audio_path, 'rb') as f:
        transcript = client.audio.transcriptions.create(
            model='whisper-1',
            file=f,
            response_format='verbose_json',
            timestamp_granularities=['segment', 'word']
        )

    n_seg   = len(transcript.segments) if transcript.segments else 0
    n_words = len(transcript.words)    if transcript.words    else 0
    print(f"[whisper] Transcripción OK — {n_seg} segmentos, {n_words} palabras")

    # ── Paso 3: Filtrar segmentos en el rango de la escena ────────────────
    scene_start = START_TIME if START_TIME > 0 else 0
    scene_end   = END_TIME   if END_TIME > scene_start else float('inf')

    segments = []
    if transcript.segments:
        segments = [
            s for s in transcript.segments
            if s.end > scene_start and (scene_end == float('inf') or s.start < scene_end)
        ]

    if not segments and transcript.segments:
        print(f"[WARN] Sin segmentos en [{scene_start}s–{scene_end}s] — usando todos")
        segments = list(transcript.segments)

    if not segments:
        print("[ERROR] No hay segmentos de transcripción")
        sys.exit(1)

    print(f"[whisper] Segmentos usados: {len(segments)}")

    # ── Paso 4: Construir lyrics con words ────────────────────────────────
    all_words = list(transcript.words) if transcript.words else []
    lyrics = []

    for seg in segments:
        # Palabras que caen dentro de este segmento (±0.3s de tolerancia)
        seg_words = [
            w for w in all_words
            if w.start >= seg.start - 0.3 and w.start <= seg.end + 0.3
        ]
        if not seg_words:
            continue

        lyrics.append({
            "t":    round(seg.start, 3),
            "end":  round(seg.end,   3),
            "text": seg.text.strip(),
            "words": [
                {"w": w.word.strip(), "t": round(w.start, 3)}
                for w in seg_words
                if w.word.strip()
            ]
        })

    if not lyrics:
        print("[ERROR] No se generaron lyrics con palabras")
        sys.exit(1)

    print(f"[whisper] Lyrics generados: {len(lyrics)} líneas")

    # ── Paso 5: Construir transcript_json ─────────────────────────────────
    first_t = lyrics[0]['t']
    gaps = []
    if first_t > scene_start + 2:
        gaps.append({"start": scene_start, "end": round(first_t - 0.5, 3), "nextT": first_t})

    transcript_data = {
        "videoId": VIDEO_ID,
        "gaps":    gaps,
        "lyrics":  lyrics
    }
    transcript_json_str = json.dumps(transcript_data, ensure_ascii=False)

    # ── Paso 6: Actualizar Supabase (si hay credenciales) ─────────────────
    if SUPABASE_URL and SUPABASE_KEY:
        print("[whisper] Actualizando Supabase...")
        try:
            pel_r = requests.get(
                f"{SUPABASE_URL}/rest/v1/peliculas?slug=eq.{SLUG}&select=id",
                headers={"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"},
                timeout=15
            )
            if pel_r.ok and pel_r.json():
                pel_id = pel_r.json()[0]['id']
                upd = requests.patch(
                    f"{SUPABASE_URL}/rest/v1/escenas?pelicula_id=eq.{pel_id}&numero=eq.{ESCENA_NUM}",
                    headers={
                        "apikey": SUPABASE_KEY,
                        "Authorization": f"Bearer {SUPABASE_KEY}",
                        "Content-Type": "application/json",
                        "Prefer": "return=minimal"
                    },
                    json={"transcript_json": transcript_json_str, "has_karaoke": True},
                    timeout=15
                )
                if upd.ok:
                    print("[whisper] Supabase actualizado OK")
                else:
                    print(f"[WARN] Supabase: {upd.status_code} — {upd.text[:200]}")
            else:
                print(f"[WARN] Película '{SLUG}' no encontrada en Supabase")
        except Exception as e:
            print(f"[WARN] Supabase error: {e}")
    else:
        print("[whisper] Sin credenciales Supabase — saltando actualización")

    # ── Paso 7: Actualizar JSON del repo ──────────────────────────────────
    json_path = f"data/movies/{SLUG}.json"
    if not os.path.exists(json_path):
        print(f"[ERROR] No existe {json_path} en el repo")
        sys.exit(1)

    with open(json_path, 'r', encoding='utf-8') as f:
        movie_data = json.load(f)

    scene_idx = ESCENA_NUM - 1
    scenes    = movie_data.get('scenes', [])

    if scene_idx < 0 or scene_idx >= len(scenes):
        print(f"[ERROR] Escena {ESCENA_NUM} fuera de rango (total: {len(scenes)})")
        sys.exit(1)

    scenes[scene_idx]['transcript_json'] = transcript_json_str
    scenes[scene_idx]['has_karaoke']     = True

    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(movie_data, f, ensure_ascii=False, indent=2)

    print(f"[whisper] JSON actualizado: {json_path}")
    print(f"[whisper] ✅ Completado — {len(lyrics)} líneas con timestamps word-level")
