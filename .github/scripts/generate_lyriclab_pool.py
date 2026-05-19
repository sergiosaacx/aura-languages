#!/usr/bin/env python3
"""
Generate LyricLab Pool — Aura Languages
Genera un pool de ~200 palabras por canción/idioma usando OpenAI,
semánticamente relacionadas con la letra de la canción.
Guarda en Supabase word_pools con context = 'lyriclab/<youtube_id>'.
"""

import os, sys, json, requests

YOUTUBE_ID   = os.environ['YOUTUBE_ID']
LANGUAGE     = os.environ.get('LANGUAGE', 'en')
LYRICS_RAW   = os.environ.get('LYRICS', '[]')
OPENAI_KEY   = os.environ['OPENAI_API_KEY']
SUPABASE_URL = os.environ.get('SUPABASE_URL', '')
SUPABASE_KEY = os.environ.get('SUPABASE_KEY', '')

try:
    lyrics = json.loads(LYRICS_RAW)
    if not isinstance(lyrics, list):
        lyrics = []
except Exception:
    lyrics = []

print(f"[lyriclab-pool] ▶ {YOUTUBE_ID} | lang={LANGUAGE} | {len(lyrics)} líneas")

LANG_NAMES = {
    'en': 'English', 'fr': 'French', 'es': 'Spanish',
    'it': 'Italian', 'pt': 'Portuguese (Brazilian)'
}
lang_name = LANG_NAMES.get(LANGUAGE, LANGUAGE)

# Tomar hasta 30 líneas representativas de la letra
sample_lines = [l for l in lyrics if l.strip()][:30]
lyrics_block = "\n".join(f"- {l}" for l in sample_lines) if sample_lines else "(no lyrics provided)"

prompt = f"""You are a language learning assistant for an app called Aura Languages.

The user is learning {lang_name} through song lyrics (karaoke-style fill-in-the-blank game).
Below are lines from the song (in {lang_name}):

{lyrics_block}

Your task: Generate a word pool of exactly 200 individual words in {lang_name} to be used as DISTRACTORS in a fill-in-the-blank game where the student must pick the correct word from the lyrics.

Rules:
1. All words must be in {lang_name} (same language as the lyrics above).
2. Include a MIX of:
   a) Words semantically related to the song themes (emotions, actions, nature, relationships, etc.).
   b) Words phonetically or visually similar to words that appear in the lyrics (to make the game challenging).
   c) Common {lang_name} words (verbs, nouns, adjectives) that would be plausible distractors.
3. Do NOT include proper nouns, brand names, or numbers.
4. Words should be 3-12 characters long.
5. All words in UPPERCASE.
6. No duplicates.

Return ONLY a JSON array of exactly 200 uppercase strings, nothing else.
Example: ["WORD1","WORD2","WORD3",...]"""

print(f"[lyriclab-pool] Llamando a OpenAI...")

try:
    import openai
    client = openai.OpenAI(api_key=OPENAI_KEY)
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.8,
        max_tokens=2000
    )
    content = response.choices[0].message.content.strip()
    if content.startswith("```"):
        content = content.split("```")[1]
        if content.startswith("json"):
            content = content[4:]
    words = json.loads(content)
    words = [str(w).upper().strip() for w in words if str(w).strip()]
    seen = set()
    unique_words = []
    for w in words:
        if w not in seen and len(w) >= 2:
            seen.add(w)
            unique_words.append(w)
    words = unique_words[:200]
    print(f"[lyriclab-pool] OpenAI generó {len(words)} palabras únicas")
except Exception as e:
    print(f"[ERROR] OpenAI: {e}")
    sys.exit(1)

if not words:
    print("[ERROR] Pool vacío — abortando")
    sys.exit(1)

# Guardar en Supabase word_pools con context = 'lyriclab/<youtube_id>'
if SUPABASE_URL and SUPABASE_KEY:
    context_key = f"lyriclab/{YOUTUBE_ID}"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates"
    }
    data = {"context": context_key, "words": words}
    r = requests.post(
        f"{SUPABASE_URL}/rest/v1/word_pools",
        headers=headers,
        json=data
    )
    if r.status_code in (200, 201):
        print(f"[lyriclab-pool] ✅ Guardado: {context_key} ({len(words)} palabras)")
    else:
        r2 = requests.patch(
            f"{SUPABASE_URL}/rest/v1/word_pools?context=eq.lyriclab%2F{YOUTUBE_ID}",
            headers=headers,
            json={"words": words}
        )
        if r2.status_code in (200, 201, 204):
            print(f"[lyriclab-pool] ✅ Actualizado: {context_key}")
        else:
            print(f"[WARN] Supabase {r.status_code}: {r.text[:300]}")
            r3 = requests.post(
                f"{SUPABASE_URL}/rest/v1/word_pools",
                headers={**headers, "Prefer": "return=minimal"},
                json=data
            )
            print(f"[lyriclab-pool] Insert alternativo: {r3.status_code}")
else:
    print("[WARN] Sin Supabase — pool no persistido")

print(f"[lyriclab-pool] ✅ Listo: {YOUTUBE_ID} ({LANGUAGE})")
