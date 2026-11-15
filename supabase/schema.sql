-- Supabase PostgreSQL Schema for GTA VI GEO Directory ("The Nervous System")
-- Enables vector extensions & text search for AI crawlers and fast semantic lookups

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Missions', 'Money Guides', 'Vehicles', 'Weapons', 'Map Secrets', 'Glitches & Fixes')),
  tldr_answer TEXT NOT NULL,
  steps_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  specs_table_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  source_urls TEXT[] NOT NULL DEFAULT '{}',
  search_volume_score INTEGER NOT NULL DEFAULT 50,
  velocity_change TEXT NOT NULL DEFAULT '+100% last 24h',
  last_patch_verified TEXT NOT NULL DEFAULT 'Patch 1.02',
  verified_by TEXT NOT NULL DEFAULT 'ViceIntel Verified Lab',
  author TEXT NOT NULL DEFAULT 'Staff Editor',
  views_count INTEGER NOT NULL DEFAULT 0,
  llm_citation_count INTEGER NOT NULL DEFAULT 0,
  is_breakout BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- Indexes for lightning fast lookups & ranking
CREATE INDEX IF NOT EXISTS idx_questions_slug ON questions(slug);
CREATE INDEX IF NOT EXISTS idx_questions_category ON questions(category);
CREATE INDEX IF NOT EXISTS idx_questions_score ON questions(search_volume_score DESC);

-- Full text search index for real-time queries
CREATE INDEX IF NOT EXISTS idx_questions_fts ON questions USING GIN (to_tsvector('english', title || ' ' || tldr_answer));

