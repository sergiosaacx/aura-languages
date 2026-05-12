-- ============================================================
--  AURA LANGUAGES — session_history
--  Pega en: Supabase > SQL Editor > New query
-- ============================================================

-- ── 1. Tabla de sesiones de juego ──────────────────────────
CREATE TABLE IF NOT EXISTS public.session_history (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tool        TEXT        NOT NULL,   -- 'movies','lyriclab','flashcards','collocations','speakmaster','slanglab'
  skill       TEXT        NOT NULL,   -- 'grammar','vocabulary','listening','speaking','writing'
  xp_earned   INTEGER     NOT NULL DEFAULT 0,
  pm_earned   INTEGER     NOT NULL DEFAULT 0,
  ap_earned   INTEGER     NOT NULL DEFAULT 0,
  accuracy    INTEGER     NOT NULL DEFAULT 0 CHECK (accuracy BETWEEN 0 AND 100),
  played_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sh_user_played
  ON public.session_history (user_id, played_at DESC);

ALTER TABLE public.session_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Leer propias sesiones"
  ON public.session_history FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Insertar propias sesiones"
  ON public.session_history FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ── 2. Agregar lecciones_completadas a profiles ─────────────
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS lecciones_completadas INTEGER NOT NULL DEFAULT 0;
