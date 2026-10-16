CREATE TABLE IF NOT EXISTS blog_media (
  id TEXT PRIMARY KEY,
  filename TEXT,
  mime_type TEXT NOT NULL,
  data TEXT NOT NULL,
  size_bytes INTEGER NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_blog_media_created_at
  ON blog_media(created_at DESC);
