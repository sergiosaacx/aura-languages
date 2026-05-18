import json, urllib.request, os, time

OAI_KEY = os.environ.get('OPENAI_API_KEY', '')
if not OAI_KEY:
    raise Exception("OPENAI_API_KEY not set")

data = json.load(open('slangs.json', encoding='utf-8'))

def oai(prompt):
    body = json.dumps({
        "model": "gpt-4o-mini",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7,
        "max_tokens": 400
    }).encode()
    req = urllib.request.Request(
        "https://api.openai.com/v1/chat/completions",
        data=body, method="POST",
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {OAI_KEY}"}
    )
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read())['choices'][0]['message']['content'].strip()

PV_VERBS = {'give','take','look','make','come','go','get','put','set','turn',
            'bring','keep','pick','run','break','call','carry','catch','cut',
            'fall','hold','hang','hit','let','move','pay','pull','push','show',
            'sit','stand','work','write','glow','level','mess','open','pass',
            'speak','start','step','stick','think','throw','wake','walk','wind'}

def classify_cat(c):
    orig = c.get('cat', '')
    word = c.get('word', '')
    if orig == 'Idioms': return 'idioms'
    if orig == 'Workplace Slang': return 'business'
    parts = word.lower().replace("'","").split()
    if len(parts) == 2 and parts[0] in PV_VERBS: return 'phrasal_verbs'
    return 'slang'

def difficulty(word, cat):
    n = len(word.split())
    if cat == 'idioms':        return 'leg'
    if cat == 'phrasal_verbs': return 'med'
    if cat == 'business':      return 'med'
    if n == 1:                 return 'easy'
    return 'med' if n == 2 else 'hard'

results = []
for i, c in enumerate(data):
    word       = c.get('word', '')
    definition = c.get('definition', c.get('defShort', ''))
    label      = c.get('cat', 'Slang')
    cat        = classify_cat(c)
    diff       = difficulty(word, cat)

    prompt = (
        f'La expresión en inglés es: "{word}"\n'
        f'Su significado correcto en español es: "{definition}"\n\n'
        f'Genera exactamente 10 significados FALSOS en español para esta expresión.\n'
        f'Los significados falsos deben:\n'
        f'- Parecer muy plausibles y convincentes para alguien que no sabe inglés\n'
        f'- Relacionarse con las palabras individuales de la expresión o con el contexto\n'
        f'- NO ser obviamente incorrectos\n'
        f'- Ser frases cortas (max 10 palabras cada una)\n'
        f'- Estar en español\n\n'
        f'Responde ÚNICAMENTE con un array JSON de 10 strings. Ejemplo:\n'
        f'["significado falso 1", "significado falso 2", ...]'
    )

    try:
        raw  = oai(prompt)
        import re
        match = re.search(r'\[.*?\]', raw, re.DOTALL)
        distractors = json.loads(match.group(0)) if match else [c.get('distractor', '')]
        distractors = distractors[:10]
    except Exception as e:
        print(f"  ERROR {word}: {e}")
        distractors = [c.get('distractor', '')]

    results.append({
        'word'       : word,
        'example'    : c.get('example', c.get('ctx', '')),
        'definition' : definition,
        'distractor' : c.get('distractor', distractors[0] if distractors else ''),
        'distractors': distractors,
        'label'      : label,
        'cat'        : cat,
        'difficulty' : diff,
    })
    print(f"[{i+1}/{len(data)}] {word} → {len(distractors)} distractors")
    time.sleep(0.3)

json.dump(results, open('slangs_enriched.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)

# Generate SQL
def esc(s): return str(s or '').replace("'", "''")
def arr(lst): return "ARRAY[" + ', '.join(f"'{esc(x)}'" for x in lst) + "]"

lines = [
    "-- flashcards_full_migration.sql — distractores generados por OpenAI",
    "ALTER TABLE slang_cards ADD COLUMN IF NOT EXISTS label       text DEFAULT 'Slang';",
    "ALTER TABLE slang_cards ADD COLUMN IF NOT EXISTS difficulty  text DEFAULT 'med' CHECK (difficulty IN ('easy','med','hard','leg'));",
    "ALTER TABLE slang_cards ADD COLUMN IF NOT EXISTS distractors text[] DEFAULT '{}';",
    "ALTER TABLE slang_cards DROP CONSTRAINT IF EXISTS slang_cards_cat_check;",
    "ALTER TABLE slang_cards ADD CONSTRAINT slang_cards_cat_check CHECK (cat IN ('slang','idioms','phrasal_verbs','business'));",
    "",
    "INSERT INTO slang_cards (word, example, definition, distractor, distractors, label, cat, difficulty) VALUES",
]
rows = []
for c in results:
    rows.append(
        f"  ('{esc(c['word'])}', '{esc(c['example'])}', '{esc(c['definition'])}', "
        f"'{esc(c['distractor'])}', {arr(c['distractors'])}, "
        f"'{esc(c['label'])}', '{c['cat']}', '{c['difficulty']}')"
    )
lines.append(',\n'.join(rows) + ';')
open('flashcards_full_migration.sql', 'w', encoding='utf-8').write('\n'.join(lines))
print("✅ Done:", len(results), "cards")
