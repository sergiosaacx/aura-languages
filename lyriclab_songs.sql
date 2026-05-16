-- ═══════════════════════════════════════════════
--  LYRICLAB SONGS — tabla de canciones
-- ═══════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS lyriclab_songs (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  youtube_id    text NOT NULL,
  title         text NOT NULL DEFAULT '',
  artist        text NOT NULL DEFAULT '',
  difficulty    text NOT NULL DEFAULT 'intermedio',
  level_required int NOT NULL DEFAULT 1,
  lyrics_json   jsonb NOT NULL DEFAULT '[]'::jsonb,
  activo        boolean NOT NULL DEFAULT true,
  orden         int NOT NULL DEFAULT 0,
  created_at    timestamptz DEFAULT now()
);

ALTER TABLE lyriclab_songs ENABLE ROW LEVEL SECURITY;

-- Lectura pública (usuarios autenticados ven las canciones activas)
CREATE POLICY "lyriclab_songs_select" ON lyriclab_songs
  FOR SELECT USING (activo = true);

-- Solo admin puede insertar/actualizar/eliminar
CREATE POLICY "lyriclab_songs_admin_all" ON lyriclab_songs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND rol = 'admin'
    )
  );
