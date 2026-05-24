-- ============================================================
--  AURA LANGUAGES — Migración: limpieza de plan / role / status
--  Ejecutar UNA sola vez en Supabase SQL Editor
-- ============================================================

-- 1. Cambiar el default de plan de 'free' a NULL
--    (nuevos registros ya no heredan 'free' automáticamente)
ALTER TABLE profiles ALTER COLUMN plan SET DEFAULT NULL;

-- 2. 'gratis' → 'courtesy'
UPDATE profiles SET plan = 'courtesy' WHERE plan = 'gratis';

-- 3. Admins con plan 'free' → 'courtesy'
UPDATE profiles
SET plan = 'courtesy'
WHERE role = 'admin' AND (plan = 'free' OR plan IS NULL);

-- 4. plan_status = 'free' (venía del webhook de reembolso) → 'refunded'
--    y limpiar el plan
UPDATE profiles
SET plan_status = 'refunded', plan = NULL
WHERE plan_status = 'free';

-- 5. Usuarios normales con plan='free' y sin plan_status
--    → plan = NULL (se registraron pero nunca pagaron)
UPDATE profiles
SET plan = NULL
WHERE plan = 'free' AND plan_status IS NULL AND role = 'user';

-- ============================================================
--  PASO MANUAL después de correr esto:
--  Para cada cuenta de cortesía que quieras dar acceso,
--  corre esto en Supabase con el email de esa persona:
--
--  UPDATE profiles SET plan = 'courtesy'
--  WHERE email = 'email-de-la-persona@ejemplo.com';
-- ============================================================
