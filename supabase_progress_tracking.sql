-- ============================================================
--  AURA LANGUAGES — Progress Tracking
--  Ejecuta en: Supabase > SQL Editor
-- ============================================================

-- 1. Columnas en profiles para "Continúa donde lo dejaste"
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS ultima_pelicula_titulo  text    DEFAULT '',
  ADD COLUMN IF NOT EXISTS ultima_pelicula_slug    text    DEFAULT '',
  ADD COLUMN IF NOT EXISTS ultima_escena_num       int     DEFAULT 1,
  ADD COLUMN IF NOT EXISTS ultima_escena_frase     text    DEFAULT '',
  ADD COLUMN IF NOT EXISTS ultima_escena_accent    text    DEFAULT '',
  ADD COLUMN IF NOT EXISTS ultimo_tiempo_restante  int     DEFAULT 0;

-- 2. Columna duracion_min en session_history
ALTER TABLE public.session_history
  ADD COLUMN IF NOT EXISTS duracion_min int NOT NULL DEFAULT 0;
