-- ════════════════════════════════════════════════════════════════════════
--  AURA LANGUAGES — Content Tables
--  Ejecutar en Supabase → SQL Editor → New query → Run
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

-- RLS
alter table slang_cards enable row level security;

drop policy if exists "Public read slang_cards" on slang_cards;
create policy "Public read slang_cards"
  on slang_cards for select using (true);

drop policy if exists "Admin write slang_cards" on slang_cards;
create policy "Admin write slang_cards"
  on slang_cards for all
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

-- RLS
alter table collocation_phrases enable row level security;

drop policy if exists "Public read collocation_phrases" on collocation_phrases;
create policy "Public read collocation_phrases"
  on collocation_phrases for select using (true);

drop policy if exists "Admin write collocation_phrases" on collocation_phrases;
create policy "Admin write collocation_phrases"
  on collocation_phrases for all
  using  (auth.jwt() ->> 'email' = 'elparche.foodpopayan@gmail.com')
  with check (auth.jwt() ->> 'email' = 'elparche.foodpopayan@gmail.com');

-- ── 3. word_pools ─────────────────────────────────────────────────────────
-- context ejemplos: 'lyriclab/7wtfhZwyrcc', 'movies/6tvW_gVcidg', 'collocations/general'
create table if not exists word_pools (
  id           bigserial primary key,
  context      text        not null unique,
  words        text[]      not null,
  generated_at timestamptz not null default now()
);

-- RLS
alter table word_pools enable row level security;

drop policy if exists "Public read word_pools" on word_pools;
create policy "Public read word_pools"
  on word_pools for select using (true);

drop policy if exists "Admin write word_pools" on word_pools;
create policy "Admin write word_pools"
  on word_pools for all
  using  (auth.jwt() ->> 'email' = 'elparche.foodpopayan@gmail.com')
  with check (auth.jwt() ->> 'email' = 'elparche.foodpopayan@gmail.com');

-- ── 4. Seed: collocation_phrases (15 frases iniciales) ───────────────────
-- Solo inserta si la tabla está vacía
insert into collocation_phrases (es, en, cat, tag, hint, traps, explanation)
select * from (values
  ('''"', '{"I","made","a","decision"}', 'make + noun', 'make · noun', 'usa <b>MAKE</b> no TAKE para una decisión', '{"took","have","the","an","decided","choice"}', '<em>Take a decision</em> es calco del español. En inglés natural se dice <b>made a decision</b>. MAKE se usa para: decisions, money, mistakes, plans, effort.'),
  ('''"', '{"I","did","my","homework"}', 'do + noun', 'do · noun', 'usa <b>DO</b> no MAKE para tareas', '{"made","have","the","your","exercise","job"}', 'En inglés se usa <b>do</b> para actividades y tareas (do homework, do the dishes), mientras que <b>make</b> es para crear o producir algo. <em>Make homework</em> no existe.'),
  ('''"', '{"Please","pay","attention"}', 'pay + noun', 'pay · noun', 'la atención se <b>paga</b> no se da', '{"give","put","focus","listen","sir","your"}', '''En inglés la atención se <b>paga</b>: <em>pay attention</em>. También: <em>pay a visit</em>, <em>pay a compliment</em>. Decimos "'),
  ('''"', '{"I","am","very","hungry"}', 'be + adjective', 'be · adj', 'el hambre se <b>es</b> no se <b>tiene</b>', '{"have","much","hunger","many","feel","too"}', '''En español "'),
  ('''"', '{"She","broke","a","promise"}', 'break + noun', 'break · noun', 'las promesas se <b>rompen</b> con BREAK', '{"cut","made","her","the","word","swear"}', '<b>Break</b> se usa con promesas, reglas, corazones, récords y silencios. <em>Cut a promise</em> no existe. La correcta: <em>break a promise</em>.'),
  ('''"', '{"He","gave","a","speech"}', 'give + noun', 'give · noun', 'el discurso se <b>da</b> con GIVE', '{"made","did","the","his","presentation","talk"}', 'En inglés <b>give a speech</b>, <em>give a presentation</em>, <em>give a hand</em>. <em>Make a speech</em> existe en contextos formales pero lo natural es <b>give</b>.'),
  ('''"', '{"I","made","a","mistake"}', 'make + noun', 'make · noun', 'los errores se <b>hacen</b> con MAKE', '{"did","took","the","an","fault","error"}', '<em>Do a mistake</em> es uno de los errores más comunes de hispanohablantes. La forma correcta es siempre <b>make a mistake</b>. MAKE también va con: decision, plan, effort.'),
  ('''"', '{"I","took","a","shower"}', 'take + noun', 'take · noun', 'la ducha se <b>toma</b> con TAKE', '{"had","made","the","my","bath","wash"}', 'En inglés americano: <b>take a shower</b>. En británico también se dice <em>have a shower</em>. TAKE se usa con: shower, break, nap, look, photo.'),
  ('''"', '{"I","do","exercise","every","day"}', 'do + noun', 'do · noun', 'el ejercicio se <b>do</b> no <b>make</b>', '{"make","take","some","an","sport","daily"}', '<b>Do exercise</b>, <em>do sports</em>, <em>do yoga</em>. Las actividades físicas y deportes recreativos van con DO. <em>Make exercise</em> es incorrecto.'),
  ('''"', '{"I","agree","with","you"}', 'verb collocation', 'verb', '<b>agree</b> ya es el verbo, sin AM', '{"am","to","of","for","accord","your"}', '''En español decimos "'),
  ('''"', '{"I","miss","you"}', 'verb collocation', 'verb', 'existe el verbo <b>miss</b> exacto', '{"throw","of","less","to","feel","remember"}', 'En inglés <b>miss</b> = extrañar / echar de menos. <em>Throw of less</em> es traducción literal sin sentido. Ejemplos: <em>I miss my family</em>, <em>I miss home</em>.'),
  ('''"', '{"You","are","right"}', 'be + adjective', 'be · adj', 'la razón se <b>es</b> no se <b>tiene</b>', '{"have","your","reason","correct","truth","got"}', '''En español "'),
  ('''"', '{"I","will","take","a","break"}', 'take + noun', 'take · noun', 'el descanso se <b>toma</b> con TAKE', '{"have","make","rest","some","am","going"}', '<b>Take a break</b> es la colocación natural. TAKE también: <em>take a nap</em>, <em>take a look</em>, <em>take a photo</em>, <em>take a chance</em>.'),
  ('''"', '{"They","made","a","deal"}', 'make + noun', 'make · noun', 'los tratos se <b>hacen</b> con MAKE', '{"did","took","the","their","agreement","contract"}', '<b>Make a deal</b>, <em>make an agreement</em>, <em>make a promise</em>. MAKE se usa para acuerdos verbales y compromisos.'),
  ('''"', '{"I","am","twenty","years","old"}', 'be + age', 'be · age', 'la edad se <b>es</b> no se <b>tiene</b>', '{"have","twenty",",",",",",",","}', '''En español "')
) as v(es, en, cat, tag, hint, traps, explanation)
where not exists (select 1 from collocation_phrases limit 1);

-- ════════════════════════════════════════════════════════════════════════
-- ✅ Listo. Tablas creadas con RLS y 15 frases de colocaciones pre-cargadas.
-- Para cargar Flashcards y pools de palabras, usar el panel Admin de Aura.
-- ════════════════════════════════════════════════════════════════════════
