-- ============================================================
--  AURA LANGUAGES — Migración: columna selected_languages
--  Ejecutar en: Supabase Dashboard → SQL Editor
-- ============================================================

-- Columna para guardar los códigos de idioma elegidos por el usuario
-- Ejemplo: ["en","fr","pt"]
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS selected_languages JSONB DEFAULT '[]'::jsonb;

-- Índice para búsquedas por idioma (opcional pero útil)
CREATE INDEX IF NOT EXISTS idx_profiles_selected_languages
  ON profiles USING gin(selected_languages);

-- ============================================================
--  VERIFICACIÓN (ejecutar después)
-- ============================================================
-- SELECT id, selected_languages FROM profiles LIMIT 5;
