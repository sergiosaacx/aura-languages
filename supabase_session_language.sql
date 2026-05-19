-- ============================================================
--  AURA LANGUAGES — Agregar columna language a session_history
--  y lecciones_completadas a language_progress
--  Pega en: Supabase > SQL Editor > New query
-- ============================================================

-- 1. Columna language en session_history
ALTER TABLE public.session_history
  ADD COLUMN IF NOT EXISTS language TEXT NOT NULL DEFAULT 'en';

CREATE INDEX IF NOT EXISTS idx_sh_user_lang_played
  ON public.session_history (user_id, language, played_at DESC);

-- 2. Columna lecciones_completadas en language_progress (por idioma)
ALTER TABLE public.language_progress
  ADD COLUMN IF NOT EXISTS lecciones_completadas INTEGER NOT NULL DEFAULT 0;

-- 3. Migrar sesiones existentes: si el usuario solo tiene inglés, marcarlas como 'en'
-- (Las sesiones sin language quedarán como 'en' por el DEFAULT)
