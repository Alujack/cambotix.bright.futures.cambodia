import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

let database: DatabaseSync | undefined;
export function getDb() {
 if (database) return database;
 const filename = path.resolve(process.env.DATABASE_PATH || './data/site.sqlite');
 mkdirSync(path.dirname(filename), { recursive: true, mode: 0o700 });
 database = new DatabaseSync(filename);
 database.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;
  PRAGMA busy_timeout = 5000;
  CREATE TABLE IF NOT EXISTS admins (id TEXT PRIMARY KEY, email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
  CREATE TABLE IF NOT EXISTS sessions (token_hash TEXT PRIMARY KEY, admin_id TEXT NOT NULL REFERENCES admins(id) ON DELETE CASCADE, expires_at INTEGER NOT NULL);
  CREATE TABLE IF NOT EXISTS login_attempts (email TEXT PRIMARY KEY, attempts INTEGER NOT NULL, reset_at INTEGER NOT NULL);
  CREATE TABLE IF NOT EXISTS content (section TEXT PRIMARY KEY, data TEXT NOT NULL, revision INTEGER NOT NULL DEFAULT 1);
  CREATE TABLE IF NOT EXISTS posts (id TEXT PRIMARY KEY, kind TEXT NOT NULL CHECK(kind IN ('article','page')), slug TEXT NOT NULL, title TEXT NOT NULL, excerpt TEXT NOT NULL DEFAULT '', body TEXT NOT NULL DEFAULT '', image TEXT NOT NULL DEFAULT '', image_alt TEXT NOT NULL DEFAULT '', status TEXT NOT NULL CHECK(status IN ('draft','published')), placement TEXT NOT NULL DEFAULT '', show_in_nav INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, revision INTEGER NOT NULL DEFAULT 1, UNIQUE(kind,slug));
  CREATE TABLE IF NOT EXISTS media (id TEXT PRIMARY KEY, name TEXT NOT NULL, mime TEXT NOT NULL, data BLOB NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
  CREATE TABLE IF NOT EXISTS audit (id INTEGER PRIMARY KEY, admin_id TEXT NOT NULL, action TEXT NOT NULL, target TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
  PRAGMA user_version = 1;
 `);
 return database;
}
export function audit(adminId: string, action: string, target: string) {
 getDb().prepare('INSERT INTO audit (admin_id,action,target) VALUES (?,?,?)').run(adminId,action,target);
}
