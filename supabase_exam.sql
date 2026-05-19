-- ============================================================
-- AURA LANGUAGES — Examen de Ascenso
-- Tablas: exam_content, exam_attempts, exam_results, rank_requirements
-- ============================================================

-- 1. REQUISITOS POR RANGO
CREATE TABLE IF NOT EXISTS rank_requirements (
  id           serial primary key,
  from_rank    text not null,   -- 'bronce','plata','oro','platino','diamante'
  to_rank      text not null,   -- 'plata','oro','platino','diamante','challenger'
  min_level    int  not null,
  min_merit_pm int  not null,
  pass_score   int  not null default 720,  -- de 1000
  retries_per_cycle int not null default 3,
  cooldown_days int not null default 7,
  created_at   timestamptz default now()
);

-- Datos iniciales de requisitos
INSERT INTO rank_requirements (from_rank, to_rank, min_level, min_merit_pm) VALUES
  ('bronce',   'plata',      15,   500),
  ('plata',    'oro',        30,  1200),
  ('oro',      'platino',    50,  2500),
  ('platino',  'diamante',   70,  4500),
  ('diamante', 'challenger', 100, 8000)
ON CONFLICT DO NOTHING;

-- 2. CONTENIDO DEL EXAMEN
CREATE TABLE IF NOT EXISTS exam_content (
  id           uuid primary key default gen_random_uuid(),
  rank         text not null,        -- 'bronce','plata','oro','platino','diamante','challenger'
  language     text not null default 'en',
  section      text not null,        -- 'listening','reading','vocabulary','phrasal','slang','writing','speaking'
  content_type text not null,        -- 'video_scene','passage','question','word_pair','phrasal_item','writing_prompt','speaking_prompt'
  content      jsonb not null,       -- estructura flexible por sección
  difficulty   int  not null default 3 check (difficulty between 1 and 5),
  active       boolean not null default true,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_exam_content_rank_lang ON exam_content(rank, language, section, active);

-- 3. INTENTOS DE EXAMEN
CREATE TABLE IF NOT EXISTS exam_attempts (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  rank         text not null,        -- rango al que intenta ascender (to_rank)
  language     text not null default 'en',
  started_at   timestamptz default now(),
  finished_at  timestamptz,
  status       text not null default 'in_progress' check (status in ('in_progress','passed','failed','abandoned')),
  total_score  int,                  -- 0-1000
  content_ids  uuid[],               -- IDs de exam_content seleccionados para este intento
  created_at   timestamptz default now()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_exam_attempts_user ON exam_attempts(user_id, rank, status);

-- 4. RESULTADOS POR SECCIÓN
CREATE TABLE IF NOT EXISTS exam_results (
  id           uuid primary key default gen_random_uuid(),
  attempt_id   uuid not null references exam_attempts(id) on delete cascade,
  user_id      uuid not null references auth.users(id) on delete cascade,
  section      text not null,
  score        int  not null default 0,  -- 0-100 por sección
  answers      jsonb,                    -- respuestas del usuario
  ai_feedback  text,                     -- feedback de OpenAI para Writing/Speaking
  created_at   timestamptz default now()
);

-- 5. RLS POLICIES

ALTER TABLE rank_requirements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "rank_requirements_public_read" ON rank_requirements FOR SELECT USING (true);
CREATE POLICY "rank_requirements_admin_write" ON rank_requirements USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);

ALTER TABLE exam_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "exam_content_public_read" ON exam_content FOR SELECT USING (active = true);
CREATE POLICY "exam_content_admin_all" ON exam_content USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
);

ALTER TABLE exam_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "exam_attempts_own" ON exam_attempts USING (auth.uid() = user_id);

ALTER TABLE exam_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "exam_results_own" ON exam_results USING (auth.uid() = user_id);
