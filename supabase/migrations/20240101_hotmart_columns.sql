-- ============================================================
--  AURA LANGUAGES — Migración: columnas Hotmart en profiles
--  Ejecutar en: Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Email del usuario (para que el webhook pueda encontrarlo por email)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email TEXT;

-- 2. Proveedor de pago activo
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS payment_provider TEXT DEFAULT 'hotmart';

-- 3. Código de suscripción de Hotmart (subscriber code)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS hotmart_subscription_code TEXT;

-- 4. Índice único en email (búsqueda rápida desde el webhook)
CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email) WHERE email IS NOT NULL;

-- 5. Tabla para compras pendientes
--    (cuando el webhook llega antes de que el usuario se registre)
CREATE TABLE IF NOT EXISTS pending_purchases (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email            TEXT NOT NULL,
  event            TEXT NOT NULL,
  offer_code       TEXT,
  subscriber_code  TEXT,
  transaction_id   TEXT UNIQUE,
  payload          JSONB,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  processed_at     TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_pending_purchases_email ON pending_purchases(email);

-- ============================================================
--  VERIFICACIÓN (ejecutar después para confirmar)
-- ============================================================
-- SELECT column_name, data_type FROM information_schema.columns
-- WHERE table_name = 'profiles'
-- AND column_name IN ('email','payment_provider','hotmart_subscription_code');
