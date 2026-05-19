-- Migración: merit_pm por idioma
-- La columna merit_pm existente queda como total global (suma de todos los idiomas)
-- La nueva merit_pm_lang guarda el desglose por idioma

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS merit_pm_lang jsonb DEFAULT '{}'::jsonb;

-- Inicializar: todo lo que tenían en merit_pm se asigna a 'en'
-- (idioma por defecto para retrocompatibilidad)
UPDATE profiles
SET merit_pm_lang = jsonb_build_object('en', COALESCE(merit_pm, 0))
WHERE merit_pm_lang = '{}'::jsonb AND COALESCE(merit_pm, 0) > 0;
