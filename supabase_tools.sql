-- ══════════════════════════════════════════════════════════════════════════════
--  supabase_tools.sql — URLs de botones hero + tabla home_tools
-- ══════════════════════════════════════════════════════════════════════════════

-- 1. Agregar columnas de URL a los botones de la portada hero
ALTER TABLE admin_hero_config
  ADD COLUMN IF NOT EXISTS btn1_url TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS btn2_url TEXT DEFAULT '';

-- 2. Tabla de herramientas del home
CREATE TABLE IF NOT EXISTS home_tools (
  id          TEXT PRIMARY KEY,                -- 'movieslab', 'lyriclab', etc.
  orden       INT          DEFAULT 0,
  imagen_url  TEXT         DEFAULT '',
  categoria   TEXT         DEFAULT '',
  titulo      TEXT         DEFAULT '',
  descripcion TEXT         DEFAULT '',
  stat_num    TEXT         DEFAULT '',         -- e.g. "24"
  stat_lbl    TEXT         DEFAULT '',         -- e.g. "escenas"
  nivel_lbl   TEXT         DEFAULT '',         -- e.g. "intermedio"
  link_url    TEXT         DEFAULT '',         -- e.g. "movies.html"
  destacado   BOOLEAN      DEFAULT false,      -- tarjeta grande featured
  activo      BOOLEAN      DEFAULT true,
  updated_at  TIMESTAMPTZ  DEFAULT NOW()
);

-- 3. RLS
ALTER TABLE home_tools ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read home_tools"  ON home_tools;
DROP POLICY IF EXISTS "Admin write home_tools"  ON home_tools;

CREATE POLICY "Public read home_tools"
  ON home_tools FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admin write home_tools"
  ON home_tools FOR ALL
  TO authenticated
  USING  (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND es_admin = true))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND es_admin = true));

-- 4. Insertar herramientas por defecto (no sobreescribe si ya existen)
INSERT INTO home_tools (id, orden, imagen_url, categoria, titulo, descripcion, stat_num, stat_lbl, nivel_lbl, link_url, destacado)
VALUES
  ('movieslab',   0, 'assets/home/news-3.jpg',            'listening · escenas',       'MoviesLab',   'Aprende inglés con escenas reales de películas — diálogos, slang y acentos.',                 '24',    'escenas',   'intermedio',      'movies.html',      true),
  ('lyriclab',    1, 'assets/home/news-2.jpg',            'karaoke · letras',          'LyricLab',    'Completa palabras escondidas en canciones y entrena tu oído al ritmo de la música.',           '148',   'canciones', 'B2 · 68%',        'lyriclab.html',    false),
  ('flashcards',  2, 'assets/home/news-1.jpg',            'vocab · repaso srs',        'Flashcards',  'Repaso espaciado: 1.840 palabras guardadas, listas para repasar hoy.',                        '24',    'hoy',       'srs · 78%',       'flashcards.html',  false),
  ('collocations',3, 'assets/home/tool-collocations.jpg', 'colocaciones · traducción', 'Collocations','Construye traducciones llenando huecos con las palabras correctas. Adiós a los calcos.',      '12/20', 'ronda',     'make · take · do','collocations.html',false),
  ('social',      4, 'assets/home/tool-slanglab.jpg',     'comunidad · torneos',       'Social',      'Compite, conecta y aprende con otros usuarios. Torneos, ranking y conversaciones reales.',    '240+',  'activos',   'duelo viernes',   '#',                false)
ON CONFLICT (id) DO NOTHING;
