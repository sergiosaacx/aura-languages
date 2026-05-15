-- ══════════════════════════════════════════════════════════
--  Aura Languages — Gestión de Películas y Escenas
--  Ejecutar en Supabase SQL Editor
-- ══════════════════════════════════════════════════════════

-- ── Tabla: peliculas ────────────────────────────────────
CREATE TABLE IF NOT EXISTS peliculas (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug         TEXT UNIQUE NOT NULL,
  titulo_main  TEXT NOT NULL DEFAULT '',
  titulo_sub   TEXT DEFAULT '',
  studio       TEXT DEFAULT '',
  portada_url  TEXT DEFAULT '',
  año          TEXT DEFAULT '',
  duracion     TEXT DEFAULT '',
  genero       TEXT DEFAULT '',
  descripcion  TEXT DEFAULT '',
  badges_json  TEXT DEFAULT '[]',
  activo       BOOLEAN DEFAULT true,
  orden        INTEGER DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ── Tabla: escenas ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS escenas (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pelicula_id     UUID REFERENCES peliculas(id) ON DELETE CASCADE,
  numero          INTEGER NOT NULL DEFAULT 1,
  youtube_id      TEXT NOT NULL DEFAULT '',
  start_time      INTEGER DEFAULT NULL,
  end_time        INTEGER DEFAULT NULL,
  portada_url     TEXT DEFAULT '',
  phrase          TEXT DEFAULT '',
  speaker         TEXT DEFAULT '',
  word_bank_json  TEXT DEFAULT '[]',
  has_karaoke     BOOLEAN DEFAULT false,
  transcript_json TEXT DEFAULT '{}',
  shelf_tm        TEXT DEFAULT 'ahora',
  shelf_line      TEXT DEFAULT '',
  shelf_tag       TEXT DEFAULT '',
  activo          BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── RLS ─────────────────────────────────────────────────
ALTER TABLE peliculas ENABLE ROW LEVEL SECURITY;
ALTER TABLE escenas   ENABLE ROW LEVEL SECURITY;

-- Lectura pública
CREATE POLICY "Leer peliculas" ON peliculas FOR SELECT USING (true);
CREATE POLICY "Leer escenas"   ON escenas   FOR SELECT USING (true);

-- Escritura admin
CREATE POLICY "Insert peliculas" ON peliculas FOR INSERT WITH CHECK (true);
CREATE POLICY "Update peliculas" ON peliculas FOR UPDATE USING (true);
CREATE POLICY "Delete peliculas" ON peliculas FOR DELETE USING (true);
CREATE POLICY "Insert escenas"   ON escenas   FOR INSERT WITH CHECK (true);
CREATE POLICY "Update escenas"   ON escenas   FOR UPDATE USING (true);
CREATE POLICY "Delete escenas"   ON escenas   FOR DELETE USING (true);

-- ── Migrar datos de Incredibles 2 ya existente ──────────
INSERT INTO peliculas (slug, titulo_main, titulo_sub, studio, año, duracion, genero, descripcion, badges_json, activo, orden)
VALUES (
  'incredibles-2',
  'INCREDIBLES', '2',
  'Pixar Animation Studios',
  '2018', '1h 58m', 'Infantil · Acción',
  'La familia Parr lucha por recuperar la confianza pública en los superhéroes. Mientras Elastigirl es reclutada para una misión, Mr. Incredible se queda en casa.',
  '[{"text":"PG","accent":true},{"text":"HD"},{"text":"CC"},{"text":"KARAOKE","accent":true}]',
  true, 0
) ON CONFLICT (slug) DO NOTHING;

-- Escena 1 — la que tiene karaoke completo
INSERT INTO escenas (pelicula_id, numero, youtube_id, start_time, end_time, phrase, speaker, word_bank_json, has_karaoke, shelf_tm, shelf_line, shelf_tag)
SELECT
  id, 1, '6tvW_gVcidg', 0, 199,
  'You will kid. You will.',
  'Rick Dicker',
  '["UNDERMINER","ILLEGAL","PERIMETER","SUPERHEROES","FORGET"]',
  true,
  'ahora', '"Behold the Underminer!"', 'acción · apertura'
FROM peliculas WHERE slug = 'incredibles-2'
ON CONFLICT DO NOTHING;

-- Escena 2
INSERT INTO escenas (pelicula_id, numero, youtube_id, has_karaoke, shelf_tm, shelf_line, shelf_tag)
SELECT id, 2, 'kBUWPXDgTk0', true, '1:01', '"State your name, please."', 'drama · interrogación'
FROM peliculas WHERE slug = 'incredibles-2'
ON CONFLICT DO NOTHING;

-- Escena 3
INSERT INTO escenas (pelicula_id, numero, youtube_id, has_karaoke, shelf_tm, shelf_line, shelf_tag)
SELECT id, 3, 'ayUt8n7KcfM', true, '3:08', '"You will, kid. You will."', 'drama · cierre'
FROM peliculas WHERE slug = 'incredibles-2'
ON CONFLICT DO NOTHING;

-- Escena 4
INSERT INTO escenas (pelicula_id, numero, youtube_id, has_karaoke, shelf_tm, shelf_line, shelf_tag)
SELECT id, 4, 'UZqzsAsoAlo', true, '5:20', '"Where is my super suit?!"', 'comedia · iconic'
FROM peliculas WHERE slug = 'incredibles-2'
ON CONFLICT DO NOTHING;

-- Escena 5
INSERT INTO escenas (pelicula_id, numero, youtube_id, has_karaoke, shelf_tm, shelf_line, shelf_tag)
SELECT id, 5, '_U6RPpAt7ns', true, '8:45', '"We''re superheroes. What could happen?"', 'acción · final'
FROM peliculas WHERE slug = 'incredibles-2'
ON CONFLICT DO NOTHING;
