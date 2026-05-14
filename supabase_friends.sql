-- ═══════════════════════════════════════════════════════════════════
--  supabase_friends.sql — Sistema de amigos y mensajes Aura Languages
--  Ejecutar en: Supabase → SQL Editor
-- ═══════════════════════════════════════════════════════════════════

-- ─── TABLA: friendships ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.friendships (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id  uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  addressee_id  uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status        text NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at    timestamptz NOT NULL DEFAULT now(),
  UNIQUE (requester_id, addressee_id),
  CHECK (requester_id <> addressee_id)
);

CREATE INDEX IF NOT EXISTS idx_friendships_requester ON public.friendships (requester_id);
CREATE INDEX IF NOT EXISTS idx_friendships_addressee ON public.friendships (addressee_id);
CREATE INDEX IF NOT EXISTS idx_friendships_status    ON public.friendships (status);

-- ─── TABLA: messages ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.messages (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id    uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  receiver_id  uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content      text NOT NULL CHECK (char_length(content) > 0 AND char_length(content) <= 1000),
  created_at   timestamptz NOT NULL DEFAULT now(),
  read_at      timestamptz,
  CHECK (sender_id <> receiver_id)
);

CREATE INDEX IF NOT EXISTS idx_messages_sender   ON public.messages (sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON public.messages (receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_created  ON public.messages (created_at);

-- ─── ROW LEVEL SECURITY — friendships ────────────────────────────────────────
ALTER TABLE public.friendships ENABLE ROW LEVEL SECURITY;

-- Ver: solo tus propias amistades
CREATE POLICY "friendships_select"
  ON public.friendships FOR SELECT
  USING (auth.uid() IN (requester_id, addressee_id));

-- Crear: solo puedes enviar solicitudes como tú mismo
CREATE POLICY "friendships_insert"
  ON public.friendships FOR INSERT
  WITH CHECK (auth.uid() = requester_id);

-- Actualizar: solo el receptor puede aceptar/rechazar
CREATE POLICY "friendships_update"
  ON public.friendships FOR UPDATE
  USING (auth.uid() = addressee_id);

-- Eliminar: ambas partes pueden eliminar la amistad
CREATE POLICY "friendships_delete"
  ON public.friendships FOR DELETE
  USING (auth.uid() IN (requester_id, addressee_id));

-- ─── ROW LEVEL SECURITY — messages ───────────────────────────────────────────
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Ver: solo tus propios mensajes (enviados o recibidos)
CREATE POLICY "messages_select"
  ON public.messages FOR SELECT
  USING (auth.uid() IN (sender_id, receiver_id));

-- Enviar: solo puedes enviar como tú mismo
CREATE POLICY "messages_insert"
  ON public.messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

-- Marcar como leído: solo el receptor puede actualizar read_at
CREATE POLICY "messages_update"
  ON public.messages FOR UPDATE
  USING (auth.uid() = receiver_id);

-- ─── REALTIME — habilitar para mensajes ──────────────────────────────────────
-- Ejecutar esto en Supabase → Table Editor → messages → Realtime → Enable
-- O via SQL:
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.friendships;
