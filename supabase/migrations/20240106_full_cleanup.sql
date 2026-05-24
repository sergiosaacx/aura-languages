-- ============================================================
--  AURA LANGUAGES — Limpieza total
--  Ejecutar UNA sola vez en Supabase SQL Editor
-- ============================================================

-- ── 1. Eliminar tablas obsoletas ────────────────────────────
DROP TABLE IF EXISTS public.pending_registrations CASCADE;
DROP TABLE IF EXISTS public.pending_purchases CASCADE;

-- ── 2. Eliminar columnas de MercadoPago ─────────────────────
ALTER TABLE public.profiles
  DROP COLUMN IF EXISTS mp_customer_id,
  DROP COLUMN IF EXISTS mp_card_id,
  DROP COLUMN IF EXISTS mp_card_last4,
  DROP COLUMN IF EXISTS mp_card_brand,
  DROP COLUMN IF EXISTS mp_card_expiry,
  DROP COLUMN IF EXISTS mp_subscription_id,
  DROP COLUMN IF EXISTS next_billing_date,
  DROP COLUMN IF EXISTS subscribed_at,
  DROP COLUMN IF EXISTS subscription_id,
  DROP COLUMN IF EXISTS trial_ends_at;

-- ── 3. Limpiar valores de plan ───────────────────────────────
-- Default plan = NULL (nuevos registros sin plan)
ALTER TABLE public.profiles ALTER COLUMN plan SET DEFAULT NULL;

-- gratis → courtesy
UPDATE public.profiles SET plan = 'courtesy' WHERE plan = 'gratis';

-- Admins con plan 'free' → courtesy
UPDATE public.profiles
SET plan = 'courtesy'
WHERE role = 'admin' AND (plan = 'free' OR plan IS NULL);

-- Usuarios normales sin pago → plan NULL
UPDATE public.profiles
SET plan = NULL
WHERE plan = 'free' AND plan_status IS NULL AND role = 'user';

-- ── 4. Limpiar plan_status ───────────────────────────────────
-- plan_status 'free' (webhook viejo de reembolso) → 'refunded'
UPDATE public.profiles
SET plan_status = 'refunded', plan = NULL
WHERE plan_status = 'free';

-- ── 5. Cuentas courtesy → asegurar plan_status activo ────────
UPDATE public.profiles
SET plan_status = 'active', payment_provider = 'aura'
WHERE plan = 'courtesy' AND (plan_status IS NULL OR plan_status = 'free');

-- ── 6. Agregar constraint para valores válidos ───────────────
ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_plan_check;
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_plan_check
  CHECK (plan IS NULL OR plan IN ('solo','combo','maestro','courtesy'));

ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_plan_status_check;
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_plan_status_check
  CHECK (plan_status IS NULL OR plan_status IN ('active','trial','cancelled','refunded'));

ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_billing_period_check;
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_billing_period_check
  CHECK (billing_period IS NULL OR billing_period IN ('monthly','quarterly','annual','courtesy'));

-- ── Resultado esperado ───────────────────────────────────────
-- role:           admin | user
-- plan:           null | solo | combo | maestro | courtesy
-- billing_period: null | monthly | quarterly | annual | courtesy
-- plan_status:    null | active | trial | cancelled | refunded
-- payment_provider: hotmart | aura | null
