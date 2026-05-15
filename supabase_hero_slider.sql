-- Migration: hero slider support
ALTER TABLE admin_hero_config ADD COLUMN IF NOT EXISTS modo TEXT DEFAULT 'static';
ALTER TABLE admin_hero_config ADD COLUMN IF NOT EXISTS color_acento TEXT DEFAULT '#c4ff3d';
ALTER TABLE admin_hero_config ADD COLUMN IF NOT EXISTS slides_json TEXT DEFAULT '[]';
