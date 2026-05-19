#!/usr/bin/env python3
"""
Generate Movie Pool — Aura Languages
Genera un pool de ~200 palabras por película/idioma usando OpenAI,
semánticamente relacionadas con las frases del film.
Guarda en Supabase word_pools con context = 'movies/<slug>'.
"""

import os, sys, json, requests

SLUG        = os.environ['SLUG']
LANGUAGE    = os.environ.get('LANGUAGE', 'en')
PHRASES_RAW = os.environ.get('PHRASES', '[]')
OPENAI_KEY  = os.environ['OPENAI_API_KEY']
SUPABASE_URL = os.environ.get('SUPABASE_URL', '')
SUPABASE_KEY = os.environ.get('SUPABASE_KEY', '')

try:
    phrases = json.loads(PHRASES_RAW)
except Exception:
    phrases = []

print(f"[pool] ▶ {SLUG} | lang={LANGUAGE} | {len(phrases)} frases")

LANG_NAMES = {
    'en': 'English', 'fr': 'French', 'es': 'Spanish',
    'it': 'Italian', 'pt': 'Portuguese (Brazilian)'
}
lang_name = LANG_NAMES.get(LANGUAGE, LANGUAGE)

# Construir prompt para OpenAI
phrases_block = "\n".join(f"- {p}" for p in phrases[:20]) if phrases else "(no phrases provided)"

prompt = f"""You are a language learning assistant for an app called Aura Languages.

The user is learning {lang_name} by watching movie clips.
Below are the key phrases from the movie scenes (written in {lang_name}):

{phrases_block}

Your task: Generate a word pool of exactly 200 individual words in {lang_name} that will be used as DISTRACTORS in a fill-in-the-blank game.

Rules for the word pool:
1. All words must be in {lang_name} (NOT translated — if phrases are in English, use English words).
2. Include a MIX of:
   a) Words semantically or contextually related to the movie phrases (verbs, nouns, adjectives from similar scenes).
   b) Words that are visually or phonetically SIMILAR to words in the phrases (to make the game challenging).
   c) Common words in the language (conjunctions, verbs, nouns, adjectives) that would make plausible distractors.
3. Do NOT include proper nouns, names, or numbers.
4. Words should be 3-12 characters long.
5. All words in UPPERCASE.
6. No duplicates.

Return ONLY a JSON array of exactly 200 uppercase strings, no other text.
Example format: ["WORD1","WORD2","WORD3",...]"""

print(f"[pool] Llamando a OpenAI...")

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
    # Clean up: sometimes OpenAI wraps in markdown code blocks
    if content.startswith("```"):
        content = content.split("```")[1]
        if content.startswith("json"):
            content = content[4:]
    words = json.loads(content)
    words = [str(w).upper().strip() for w in words if str(w).strip()]
    # Deduplicate
    seen = set()
    unique_words = []
    for w in words:
        if w not in seen and len(w) >= 2:
            seen.add(w)
            unique_words.append(w)
    words = unique_words[:200]
    print(f"[pool] OpenAI generó {len(words)} palabras únicas")
except Exception as e:
    print(f"[ERROR] OpenAI: {e}")
    sys.exit(1)

if not words:
    print("[ERROR] Pool vacío — abortando")
    sys.exit(1)

# Guardar en Supabase
if SUPABASE_URL and SUPABASE_KEY:
    context_key = f"movies/{SLUG}"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates"
    }
    # Upsert: si ya existe, actualizar; si no, insertar
    data = {"context": context_key, "words": words}
    r = requests.post(
        f"{SUPABASE_URL}/rest/v1/word_pools",
        headers={**headers, "Prefer": "resolution=merge-duplicates"},
        json=data
    )
    if r.status_code in (200, 201):
        print(f"[pool] ✅ Guardado en Supabase: {context_key} ({len(words)} palabras)")
    else:
        # Intentar con upsert explícito
        r2 = requests.patch(
            f"{SUPABASE_URL}/rest/v1/word_pools?context=eq.{requests.utils.quote(context_key)}",
            headers=headers,
            json={"words": words}
        )
        if r2.status_code in (200, 201, 204):
            print(f"[pool] ✅ Actualizado en Supabase: {context_key}")
        else:
            print(f"[WARN] Supabase status {r.status_code}: {r.text[:300]}")
            # Intentar insert directo
            r3 = requests.post(
                f"{SUPABASE_URL}/rest/v1/word_pools",
                headers={**headers, "Prefer": "return=minimal"},
                json=data
            )
            print(f"[pool] Insert alternativo: {r3.status_code}")
else:
    print("[WARN] Sin Supabase — pool no persistido")

print(f"[pool] ✅ Listo: {SLUG} ({LANGUAGE})")
