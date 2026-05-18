-- Agrega columna thumbnail a session_history
ALTER TABLE public.session_history
  ADD COLUMN IF NOT EXISTS thumbnail TEXT;
