-- ════════════════════════════════════════════════════════════════════════
--  AURA LANGUAGES — Content Tables
--  Supabase → SQL Editor → New query → Run
-- ════════════════════════════════════════════════════════════════════════

-- ── 1. slang_cards ────────────────────────────────────────────────────────
create table if not exists slang_cards (
  id         bigserial primary key,
  word       text        not null,
  example    text,
  distractor text,
  definition text,
  cat        text,
  activa     boolean     not null default true,
  created_at timestamptz not null default now()
);

alter table slang_cards enable row level security;
drop policy if exists "Public read slang_cards" on slang_cards;
create policy "Public read slang_cards" on slang_cards for select using (true);
drop policy if exists "Admin write slang_cards" on slang_cards;
create policy "Admin write slang_cards" on slang_cards for all
  using  (auth.jwt() ->> 'email' = 'elparche.foodpopayan@gmail.com')
  with check (auth.jwt() ->> 'email' = 'elparche.foodpopayan@gmail.com');

-- ── 2. collocation_phrases ────────────────────────────────────────────────
create table if not exists collocation_phrases (
  id          bigserial primary key,
  es          text        not null,
  en          text[]      not null,
  cat         text,
  tag         text,
  hint        text,
  traps       text[],
  explanation text,
  activa      boolean     not null default true,
  created_at  timestamptz not null default now()
);

alter table collocation_phrases enable row level security;
drop policy if exists "Public read collocation_phrases" on collocation_phrases;
create policy "Public read collocation_phrases" on collocation_phrases for select using (true);
drop policy if exists "Admin write collocation_phrases" on collocation_phrases;
create policy "Admin write collocation_phrases" on collocation_phrases for all
  using  (auth.jwt() ->> 'email' = 'elparche.foodpopayan@gmail.com')
  with check (auth.jwt() ->> 'email' = 'elparche.foodpopayan@gmail.com');

-- ── 3. word_pools ─────────────────────────────────────────────────────────
create table if not exists word_pools (
  id           bigserial primary key,
  context      text        not null unique,
  words        text[]      not null,
  generated_at timestamptz not null default now()
);

alter table word_pools enable row level security;
drop policy if exists "Public read word_pools" on word_pools;
create policy "Public read word_pools" on word_pools for select using (true);
drop policy if exists "Admin write word_pools" on word_pools;
create policy "Admin write word_pools" on word_pools for all
  using  (auth.jwt() ->> 'email' = 'elparche.foodpopayan@gmail.com')
  with check (auth.jwt() ->> 'email' = 'elparche.foodpopayan@gmail.com');

-- ── 4. Seed: 15 frases de colocaciones ───────────────────────────────────
insert into collocation_phrases (es, en, cat, tag, hint, traps, explanation)
select * from (values
  ('"Tomé una decisión"',          array['I','made','a','decision'],            'make + noun',      'make · noun', 'usa MAKE no TAKE para una decisión',   array['took','have','the','an','decided','choice'],         'Take a decision es calco del español. Lo natural es made a decision. MAKE va con: decisions, money, mistakes, plans, effort.'),
  ('"Hice mi tarea"',              array['I','did','my','homework'],             'do + noun',        'do · noun',   'usa DO no MAKE para tareas',           array['made','have','the','your','exercise','job'],         'Se usa do para actividades y tareas (do homework, do the dishes). Make es para crear o producir. Make homework no existe.'),
  ('"Por favor presta atención"',  array['Please','pay','attention'],            'pay + noun',       'pay · noun',  'la atención se paga con PAY',          array['give','put','focus','listen','sir','your'],          'En inglés la atención se paga: pay attention. También: pay a visit, pay a compliment.'),
  ('"Tengo mucha hambre"',         array['I','am','very','hungry'],              'be + adjective',   'be · adj',    'el hambre se es, no se tiene',         array['have','much','hunger','many','feel','too'],          'En español tenemos hambre. En inglés: be + adjective: I am hungry / thirsty / sleepy / hot. I have hunger suena mal.'),
  ('"Ella rompió una promesa"',    array['She','broke','a','promise'],           'break + noun',     'break · noun','las promesas se rompen con BREAK',     array['cut','made','her','the','word','swear'],             'Break va con promesas, reglas, corazones, récords y silencios. Cut a promise no existe.'),
  ('"Él dio un discurso"',         array['He','gave','a','speech'],              'give + noun',      'give · noun', 'el discurso se da con GIVE',           array['made','did','the','his','presentation','talk'],      'En inglés: give a speech, give a presentation, give a hand. Make a speech existe pero lo natural es give.'),
  ('"Cometí un error"',            array['I','made','a','mistake'],              'make + noun',      'make · noun', 'los errores se hacen con MAKE',        array['did','took','the','an','fault','error'],             'Do a mistake es uno de los errores más comunes. La forma correcta siempre es make a mistake.'),
  ('"Me duché"',                   array['I','took','a','shower'],               'take + noun',      'take · noun', 'la ducha se toma con TAKE',            array['had','made','the','my','bath','wash'],               'En inglés americano: take a shower. En británico también: have a shower. TAKE va con: shower, break, nap, look, photo.'),
  ('"Hago ejercicio todos los días"', array['I','do','exercise','every','day'], 'do + noun',        'do · noun',   'el ejercicio va con DO no MAKE',       array['make','take','some','an','sport','daily'],           'Do exercise, do sports, do yoga. Actividades físicas van con DO. Make exercise es incorrecto.'),
  ('"Estoy de acuerdo contigo"',   array['I','agree','with','you'],              'verb collocation', 'verb',        'agree ya es el verbo, sin AM',         array['am','to','of','for','accord','your'],                'En español: estoy de acuerdo (verbo SER + adjetivo). En inglés es solo I agree — agree ya es el verbo. I am agree es incorrecto.'),
  ('"Te extraño"',                 array['I','miss','you'],                      'verb collocation', 'verb',        'existe el verbo miss exacto',          array['throw','of','less','to','feel','remember'],          'En inglés miss = extrañar. Throw of less es traducción literal sin sentido. Ejemplos: I miss my family, I miss home.'),
  ('"Tienes razón"',               array['You','are','right'],                   'be + adjective',   'be · adj',    'la razón se es, no se tiene',          array['have','your','reason','correct','truth','got'],      'En español tenemos razón. En inglés: be right / be wrong. Have reason es calco. También: You are wrong!'),
  ('"Voy a tomar un descanso"',    array['I','will','take','a','break'],         'take + noun',      'take · noun', 'el descanso se toma con TAKE',         array['have','make','rest','some','am','going'],            'Take a break es la colocación natural. TAKE también: take a nap, take a look, take a photo, take a chance.'),
  ('"Ellos hicieron un trato"',    array['They','made','a','deal'],              'make + noun',      'make · noun', 'los tratos se hacen con MAKE',         array['did','took','the','their','agreement','contract'],    'Make a deal, make an agreement, make a promise. MAKE se usa para acuerdos verbales y compromisos.'),
  ('"Tengo veinte años"',          array['I','am','twenty','years','old'],       'be + age',         'be · age',    'la edad se es, no se tiene',           array['have','twenty''s','old','year','of','age'],          'En español tenemos años. En inglés: be + número + years old. I have 20 years es uno de los errores más típicos.')
) as v(es, en, cat, tag, hint, traps, explanation)
where not exists (select 1 from collocation_phrases limit 1);

-- ════════════════════════════════════════════════════════════════════════
-- Listo. 3 tablas creadas + 15 frases de colocaciones pre-cargadas.
-- Flashcards y word pools se cargan desde el panel Admin de Aura.
-- ════════════════════════════════════════════════════════════════════════
