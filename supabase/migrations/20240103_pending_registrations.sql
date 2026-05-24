-- ============================================================
--  Tabla de registros pendientes
--  La cuenta auth NO se crea hasta que el webhook de Hotmart
--  confirme el pago (PURCHASE_APPROVED).
-- ============================================================

CREATE TABLE IF NOT EXISTS pending_registrations (
  id                 UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  email              TEXT        UNIQUE NOT NULL,
  password_temp      TEXT        NOT NULL,
  full_name          TEXT        NOT NULL,
  selected_languages JSONB       DEFAULT '[]'::jsonb,
  plan               TEXT,
  billing_period     TEXT,
  created_at         TIMESTAMPTZ DEFAULT NOW()
);

-- RLS activado: clientes solo pueden insertar y actualizar
-- NO pueden SELECT (nunca ven la contraseña)
-- El service role (webhook) puede hacer todo
ALTER TABLE pending_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "pending_insert" ON pending_registrations
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "pending_update" ON pending_registrations
  FOR UPDATE TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Limpiar registros viejos (>24h sin pagar) — cron job recomendado
-- DELETE FROM pending_registrations WHERE created_at < NOW() - INTERVAL '24 hours';
