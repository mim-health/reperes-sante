PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS query_events (
  event_id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  surface TEXT NOT NULL CHECK (surface IN ('search','assistant')),
  query_text TEXT NOT NULL CHECK (length(query_text) BETWEEN 1 AND 250),
  result TEXT NOT NULL CHECK (result IN ('result','no_result')),
  proposed_ids TEXT NOT NULL DEFAULT '[]',
  proposed_count INTEGER NOT NULL DEFAULT 0,
  engine_version TEXT NOT NULL DEFAULT '',
  route_kind TEXT NOT NULL DEFAULT 'engine' CHECK (route_kind IN ('engine','category')),
  collector_version TEXT NOT NULL DEFAULT '',
  review_class TEXT CHECK (review_class IS NULL OR review_class IN ('A','B','C')),
  review_note TEXT
);

CREATE INDEX IF NOT EXISTS idx_query_events_created_at ON query_events(created_at);
CREATE INDEX IF NOT EXISTS idx_query_events_result ON query_events(result);
CREATE INDEX IF NOT EXISTS idx_query_events_surface ON query_events(surface);
CREATE INDEX IF NOT EXISTS idx_query_events_review_class ON query_events(review_class);

CREATE TABLE IF NOT EXISTS open_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  query_event_id TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fiche_id TEXT NOT NULL,
  UNIQUE(query_event_id, fiche_id),
  FOREIGN KEY(query_event_id) REFERENCES query_events(event_id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_open_events_query ON open_events(query_event_id);
CREATE INDEX IF NOT EXISTS idx_open_events_fiche ON open_events(fiche_id);
