-- ============================================================
--  AURA LANGUAGES — Sistema Multi-Idioma
--  Pega en: Supabase > SQL Editor > New query
-- ============================================================

-- ── 1. Columna language en tablas de contenido ─────────────

ALTER TABLE public.slang_cards
  ADD COLUMN IF NOT EXISTS language TEXT NOT NULL DEFAULT 'en';

ALTER TABLE public.collocation_phrases
  ADD COLUMN IF NOT EXISTS language TEXT NOT NULL DEFAULT 'en';

-- word_pools ya usa "context" como filtro (lyriclab/songId),
-- en el futuro se puede agregar language aquí también.

-- ── 2. Idioma activo y desbloqueado en profiles ─────────────

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS active_language TEXT NOT NULL DEFAULT 'en';

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS languages_unlocked TEXT[] NOT NULL DEFAULT ARRAY['en']::TEXT[];

-- ── 3. Índices de performance ───────────────────────────────

CREATE INDEX IF NOT EXISTS idx_slang_cards_lang
  ON public.slang_cards (language);

CREATE INDEX IF NOT EXISTS idx_col_phrases_lang
  ON public.collocation_phrases (language);

-- ── 4. Marcar contenido existente como inglés ───────────────
-- (ya es el DEFAULT, pero por si hay filas antiguas sin valor)

UPDATE public.slang_cards
  SET language = 'en' WHERE language IS NULL OR language = '';

UPDATE public.collocation_phrases
  SET language = 'en' WHERE language IS NULL OR language = '';
