-- ============================================================
--  Historial de pagos / renovaciones
--  Cada evento de Hotmart (pago, reembolso, cancelación, etc.)
--  queda registrado aquí permanentemente.
-- ============================================================
CREATE TABLE IF NOT EXISTS payment_history (
  id              UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id         UUID        REFERENCES profiles(id) ON DELETE SET NULL,
  email           TEXT        NOT NULL,
  nombre          TEXT,
  event           TEXT        NOT NULL,
  plan            TEXT,
  billing_period  TEXT,
  amount_usd      NUMERIC,
  offer_code      TEXT,
  transaction_id  TEXT        UNIQUE,
  subscriber_code TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE payment_history ENABLE ROW LEVEL SECURITY;
-- Sin policies: solo el service role (webhook) puede escribir/leer
-- El admin frontend lo leerá vía una Edge Function o con la anon key si se agrega policy

-- Policy de solo lectura para admins (ajustar según rol)
CREATE POLICY "admin_read_history" ON payment_history
  FOR SELECT TO authenticated USING (true);

CREATE INDEX idx_payment_history_user  ON payment_history(user_id);
CREATE INDEX idx_payment_history_email ON payment_history(email);
CREATE INDEX idx_payment_history_date  ON payment_history(created_at DESC);
