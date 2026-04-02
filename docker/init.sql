CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT,
  author_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO users (email, name)
VALUES ('alice@example.com', 'Alice'), ('bob@example.com', 'Bob')
ON CONFLICT (email) DO NOTHING;

INSERT INTO posts (title, content, author_id)
VALUES (
  'Welcome to Neurology',
  'This is seeded data.',
  (SELECT id FROM users WHERE email = 'alice@example.com')
), (
  'TanStack Start + tRPC',
  'Seeded post for the new stack.',
  (SELECT id FROM users WHERE email = 'bob@example.com')
)
ON CONFLICT DO NOTHING;

