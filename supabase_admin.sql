-- ═══════════════════════════════════════════════════════════════════
--  supabase_admin.sql — Panel de administrador Aura Languages
--  Ejecutar en: Supabase → SQL Editor
-- ═══════════════════════════════════════════════════════════════════

-- ─── PASO 1: Agregar columnas a profiles ─────────────────────────
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role       text        NOT NULL DEFAULT 'user' CHECK (role IN ('user','admin','moderator'));
-- email column (add if not present in your profiles)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email text;
-- NOTE: plan_status y next_billing_date ya existen en tu tabla profiles

-- ─── PASO 2: Hacerte admin (reemplaza con tu user_id real) ────────
-- UPDATE public.profiles SET role = 'admin' WHERE id = 'TU_USER_ID';

-- ─── PASO 3: Tabla de configuración del hero del home ─────────────
CREATE TABLE IF NOT EXISTS public.admin_hero_config (
  id          text        PRIMARY KEY,
  tag         text        NOT NULL DEFAULT '',
  titulo      text        NOT NULL DEFAULT '',
  subtitulo   text        NOT NULL DEFAULT '',
  btn1_texto  text        DEFAULT 'Probar ahora →',
  btn2_texto  text        DEFAULT 'Ver demo · 1 min',
  stat_titulo text        DEFAULT '',
  stat1_num   text        DEFAULT '',
  stat1_lbl   text        DEFAULT '',
  stat2_num   text        DEFAULT '',
  stat2_lbl   text        DEFAULT '',
  stat3_num   text        DEFAULT '',
  stat3_lbl   text        DEFAULT '',
  imagen_url  text        DEFAULT '',
  activo      boolean     DEFAULT true,
  updated_at  timestamptz DEFAULT now()
);

INSERT INTO public.admin_hero_config
  (id,tag,titulo,subtitulo,btn1_texto,btn2_texto,stat_titulo,stat1_num,stat1_lbl,stat2_num,stat2_lbl,stat3_num,stat3_lbl,imagen_url)
VALUES
  ('hero_1','novedad · mayo 2026','Flashcards 2.0 · repaso inteligente',
   'Nuevo algoritmo de repaso espaciado que detecta tus puntos débiles y prioriza las palabras que más te cuestan.',
   'Probar ahora →','Ver demo · 1 min','+3.4× retención a 30 días',
   '9 min','al día','1.840','palabras','92%','recall','assets/home/news-4.jpg')
ON CONFLICT (id) DO NOTHING;

-- ─── PASO 4: Tabla de novedades (cards del home) ──────────────────
CREATE TABLE IF NOT EXISTS public.novedades (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  categoria    text        NOT NULL DEFAULT '',
  titulo       text        NOT NULL DEFAULT '',
  descripcion  text        DEFAULT '',
  imagen_url   text        DEFAULT '',
  fecha_display text       DEFAULT '',
  tipo         text        NOT NULL DEFAULT 'novedad' CHECK (tipo IN ('novedad','actividad')),
  orden        integer     DEFAULT 0,
  activo       boolean     DEFAULT true,
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now()
);

INSERT INTO public.novedades (categoria,titulo,descripcion,fecha_display,tipo,orden) VALUES
  ('Producto · v2.0','Flashcards estrena repaso espaciado inteligente','El nuevo algoritmo prioriza las palabras que más te cuestan y te recuerda repasar justo antes de olvidarlas.','hoy · 09:14','novedad',0),
  ('Contenido · Catálogo','+12 películas nuevas en MoviesLab','Pulp Fiction, Mad Max y Dune llegan con escenas seleccionadas por dificultad.','10 may','novedad',1),
  ('Social · Torneo','Torneo de Collocations · este viernes','Compite contra 240+ usuarios en un duelo de 12 minutos. Premio: 1000 AURA.','8 may','novedad',2);

-- ─── PASO 5: RLS ─────────────────────────────────────────────────
ALTER TABLE public.admin_hero_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.novedades ENABLE ROW LEVEL SECURITY;

-- Hero config: lectura pública (home.html la lee), escritura solo admin
CREATE POLICY "hero_read"  ON public.admin_hero_config FOR SELECT USING (true);
CREATE POLICY "hero_admin_write" ON public.admin_hero_config FOR ALL
  USING   (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role='admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role='admin'));

-- Novedades: lecturas de activas para todos, escritura solo admin
CREATE POLICY "novedades_read"  ON public.novedades FOR SELECT USING (activo=true OR EXISTS (SELECT 1 FROM public.profiles WHERE id=auth.uid() AND role='admin'));
CREATE POLICY "novedades_admin_write" ON public.novedades FOR ALL
  USING   (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role='admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role='admin'));

-- Admin puede actualizar cualquier perfil (asignar plan, rol)
DROP POLICY IF EXISTS "profiles_update" ON public.profiles;
CREATE POLICY "profiles_update" ON public.profiles FOR UPDATE
  USING (auth.uid()=id OR EXISTS (SELECT 1 FROM public.profiles WHERE id=auth.uid() AND role='admin'));
