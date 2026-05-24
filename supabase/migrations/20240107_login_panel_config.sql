-- ============================================================
--  AURA LANGUAGES — Tabla: login_panel_config
--  Controla el contenido del panel izquierdo del login
-- ============================================================

CREATE TABLE IF NOT EXISTS public.login_panel_config (
  id            text PRIMARY KEY DEFAULT 'main',
  imagen_url    text DEFAULT '',
  titulo        text DEFAULT 'Continúa tu camino al <em>inglés fluido.</em>',
  subtitulo     text DEFAULT 'Películas, canciones, slang, conversación con IA y tutorías con nativos.',
  stat1_valor   text DEFAULT '2.8K',
  stat1_label   text DEFAULT 'ESTUDIANTES ACTIVOS',
  stat2_valor   text DEFAULT '148M',
  stat2_label   text DEFAULT 'PALABRAS APRENDIDAS',
  stat3_valor   text DEFAULT '4.9★',
  stat3_label   text DEFAULT 'STORE RATING',
  badge_count   text DEFAULT '147',
  badge_label   text DEFAULT 'usuarios en línea ahora',
  version_label text DEFAULT 'v2.4 · todos los sistemas operativos',
  updated_at    timestamptz DEFAULT now()
);

-- Insertar fila por defecto si no existe
INSERT INTO public.login_panel_config (id)
VALUES ('main')
ON CONFLICT (id) DO NOTHING;

-- RLS
ALTER TABLE public.login_panel_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "login_panel_read" ON public.login_panel_config
  FOR SELECT USING (true);

CREATE POLICY "login_panel_admin_write" ON public.login_panel_config
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
