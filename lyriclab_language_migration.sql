-- ── LyricLab: agregar columna language a lyriclab_songs ──────────────────────
-- Ejecutar en Supabase SQL Editor

-- 1. Agregar columna language (default 'en' para canciones existentes)
ALTER TABLE public.lyriclab_songs
  ADD COLUMN IF NOT EXISTS language TEXT NOT NULL DEFAULT 'en';

-- 2. Índice para filtrar por idioma eficientemente
CREATE INDEX IF NOT EXISTS idx_lyriclab_songs_lang
  ON public.lyriclab_songs (language, activo, orden);

-- Verificar resultado
SELECT id, title, artist, language, activo FROM public.lyriclab_songs ORDER BY language, orden;
