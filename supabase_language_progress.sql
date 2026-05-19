-- ============================================================
--  AURA LANGUAGES — Progreso por idioma + colores de tema
--  Correr en Supabase SQL Editor
-- ============================================================

-- 1. Progreso individual por usuario y por idioma
CREATE TABLE IF NOT EXISTS language_progress (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id             UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  language            TEXT NOT NULL,
  nivel               INTEGER DEFAULT 1,
  xp                  INTEGER DEFAULT 0,
  xp_siguiente_nivel  INTEGER DEFAULT 1200,
  aura_points         INTEGER DEFAULT 0,
  merit_pm            INTEGER DEFAULT 0,
  rango               TEXT DEFAULT 'Bronce',
  streak_actual       INTEGER DEFAULT 0,
  streak_maximo       INTEGER DEFAULT 0,
  ultima_conexion     TEXT,
  lecciones_completadas INTEGER DEFAULT 0,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, language)
);

ALTER TABLE language_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "lp_select" ON language_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "lp_insert" ON language_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "lp_update" ON language_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "lp_delete" ON language_progress FOR DELETE USING (auth.uid() = user_id);

-- 2. Configuración de color de acento por idioma (solo admin escribe)
CREATE TABLE IF NOT EXISTS language_settings (
  lang          TEXT PRIMARY KEY,
  accent_color  TEXT DEFAULT '#c4ff3d',
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE language_settings ENABLE ROW LEVEL SECURITY;

-- Todos pueden leer (el color debe aplicarse en todas las páginas)
CREATE POLICY "ls_select" ON language_settings FOR SELECT USING (true);

-- Solo admin puede escribir
CREATE POLICY "ls_insert" ON language_settings FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "ls_update" ON language_settings FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Colores predeterminados
INSERT INTO language_settings (lang, accent_color) VALUES
  ('en', '#c4ff3d'),
  ('fr', '#5BE9F6'),
  ('it', '#7CFFB2'),
  ('es', '#FFD83D'),
  ('pt', '#FF8A5A')
ON CONFLICT (lang) DO NOTHING;
