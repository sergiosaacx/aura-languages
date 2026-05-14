#!/usr/bin/env python3
"""
Aura Languages — WhisperX Scene Processor
==========================================
Agrega timestamps exactos por palabra a los JSON de escenas.

Uso:
  python process_scene.py data/movies/incredibles-2/escena-2.json

Requisitos (instalar una sola vez con setup.bat):
  pip install whisperx yt-dlp
  También necesitas ffmpeg en el PATH.
"""

import sys, os, json, re, subprocess, tempfile, shutil

def limpia(texto):
    """Normaliza texto para comparar: minúsculas, sin puntuación."""
    return re.sub(r"[^a-z0-9\s]", "", texto.lower()).split()

def mejor_match(palabras_objetivo, segmentos):
    """Encuentra en los segmentos de WhisperX la posición que mejor coincide."""
    objetivo = palabras_objetivo
    mejor_score = -1
    mejor_seg = None
    mejor_wi = 0

    # Construir lista plana de todas las palabras con su tiempo
    todas = []
    for seg in segmentos:
        for w in seg.get("words", []):
            todas.append(w)

    n = len(objetivo)
    for i in range(len(todas) - n + 1):
        ventana = [limpia(todas[i+j].get("word",""))[0] if limpia(todas[i+j].get("word","")) else "" for j in range(n)]
        coincidencias = sum(1 for a, b in zip(objetivo, ventana) if a == b)
        if coincidencias > mejor_score:
            mejor_score = coincidencias
            mejor_wi = i

    return todas, mejor_wi, mejor_score

def procesar(json_path):
    print(f"\n{'='*55}")
    print(f"  Procesando: {json_path}")
    print(f"{'='*55}\n")

    with open(json_path, encoding="utf-8") as f:
        datos = json.load(f)

    video_id = datos.get("videoId") or datos.get("vid")
    lyrics   = datos.get("lyrics", [])
    if not video_id:
        print("ERROR: No se encontró videoId en el JSON.")
        sys.exit(1)

    # ── 1. Descargar audio ─────────────────────────────────
    tmpdir = tempfile.mkdtemp()
    audio_path = os.path.join(tmpdir, "audio.wav")
    url = f"https://www.youtube.com/watch?v={video_id}"

    print(f"[1/3] Descargando audio de YouTube ({video_id})...")
    cmd = [
        "yt-dlp", "-x", "--audio-format", "wav",
        "--audio-quality", "0",
        "-o", audio_path.replace(".wav", ".%(ext)s"),
        url
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    # yt-dlp puede guardar como .wav o necesitar conversión
    wav_candidates = [f for f in os.listdir(tmpdir) if f.endswith(".wav")]
    if not wav_candidates:
        # Intentar conversión con ffmpeg
        raw = [f for f in os.listdir(tmpdir)][0] if os.listdir(tmpdir) else None
        if raw:
            subprocess.run(["ffmpeg", "-i", os.path.join(tmpdir, raw), audio_path, "-y"],
                           capture_output=True)
    if not os.path.exists(audio_path):
        print("ERROR: No se pudo descargar el audio. ¿Tienes yt-dlp y ffmpeg instalados?")
        shutil.rmtree(tmpdir)
        sys.exit(1)
    print("  ✓ Audio descargado.\n")

    # ── 2. Correr WhisperX ────────────────────────────────
    print("[2/3] Transcribiendo con WhisperX (primera vez tarda ~1 min)...")
    try:
        import whisperx
        import torch
    except ImportError:
        print("ERROR: WhisperX no está instalado. Corre setup.bat primero.")
        shutil.rmtree(tmpdir)
        sys.exit(1)

    device = "cuda" if torch.cuda.is_available() else "cpu"
    compute = "float16" if device == "cuda" else "int8"
    print(f"  Usando: {device.upper()}")

    model   = whisperx.load_model("base", device, compute_type=compute, language="en")
    audio   = whisperx.load_audio(audio_path)
    result  = model.transcribe(audio, language="en", batch_size=8)

    model_a, meta = whisperx.load_align_model(language_code="en", device=device)
    aligned = whisperx.align(result["segments"], model_a, meta, audio, device)
    segmentos = aligned["segments"]
    print("  ✓ Transcripción completada.\n")

    # ── 3. Mapear timestamps a cada línea ─────────────────
    print("[3/3] Mapeando timestamps por palabra a cada línea...")

    # Lista plana de palabras con tiempos
    todas_palabras = []
    for seg in segmentos:
        for w in seg.get("words", []):
            todas_palabras.append(w)

    lyrics_actualizadas = []
    for linea in lyrics:
        texto = linea.get("text", "").strip()
        palabras_obj = limpia(texto)
        n = len(palabras_obj)

        mejor_score = -1
        mejor_i = 0
        for i in range(max(1, len(todas_palabras) - n + 1)):
            ventana = []
            for j in range(min(n, len(todas_palabras)-i)):
                raw = todas_palabras[i+j].get("word", "")
                norm = limpia(raw)
                ventana.append(norm[0] if norm else "")
            coincidencias = sum(1 for a, b in zip(palabras_obj, ventana) if a == b)
            if coincidencias > mejor_score:
                mejor_score = coincidencias
                mejor_i = i

        # Construir array de palabras con timestamps
        words_ts = []
        for j in range(min(n, len(todas_palabras)-mejor_i)):
            pw = todas_palabras[mejor_i+j]
            t_word = pw.get("start") or pw.get("t") or linea["t"]
            words_ts.append({"w": texto.split()[j] if j < len(texto.split()) else "", "t": round(t_word, 2)})

        # t de la línea = timestamp de la primera palabra (más preciso)
        t_preciso = words_ts[0]["t"] if words_ts else linea["t"]

        nueva_linea = {**linea, "t": t_preciso, "words": words_ts}
        lyrics_actualizadas.append(nueva_linea)

        conf = f"{mejor_score}/{n}"
        print(f"  [{conf:>5}] t={t_preciso:6.2f}s  {texto[:55]}")

    datos["lyrics"] = lyrics_actualizadas

    # Guardar JSON actualizado
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(datos, f, ensure_ascii=False, indent=2)

    shutil.rmtree(tmpdir)
    print(f"\n✅ JSON actualizado con timestamps por palabra:\n   {json_path}\n")
    print("Sube el JSON a GitHub para que todos los usuarios vean el sync mejorado.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python process_scene.py <ruta_al_json>")
        print("Ejemplo: python process_scene.py data/movies/incredibles-2/escena-1.json")
        sys.exit(1)
    # Cambiar al directorio raíz del repo (un nivel arriba de tools/)
    script_dir = os.path.dirname(os.path.abspath(__file__))
    repo_root  = os.path.dirname(script_dir)
    os.chdir(repo_root)
    procesar(sys.argv[1])
