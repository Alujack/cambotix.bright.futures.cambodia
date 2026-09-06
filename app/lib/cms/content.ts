import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import { getDb } from './db';
import { defaults, type SiteContent, type Section } from './defaults';
import { getHeroSlides } from '../slideshow';

export function sectionSeed(section: Section) {
 return section === 'heroSlides' ? getHeroSlides() : defaults[section];
}
export function getSection(section: Section) {
 const db = getDb();
 db.prepare('INSERT OR IGNORE INTO content (section,data) VALUES (?,?)').run(section,JSON.stringify(sectionSeed(section)));
 return db.prepare('SELECT data, revision FROM content WHERE section=?').get(section) as { data: string; revision: number };
}
export function getSectionRevisions() {
 return Object.fromEntries((getDb().prepare('SELECT section, revision FROM content').all() as { section: string; revision: number }[]).map(row => [row.section, row.revision])) as Partial<Record<Section, number>>;
}
export function getSiteContent(): SiteContent {
 return Object.fromEntries(Object.keys(defaults).map(key => [key,JSON.parse(getSection(key as Section).data)])) as SiteContent;
}

// node:sqlite returns rows without a prototype, which React refuses to pass to
// client components. Copy every row into a plain object first.
const plain = <T extends object>(row: T | undefined) => (row ? ({ ...row } as T) : undefined);
const plainAll = <T extends object>(rows: unknown[]) => rows.map(row => ({ ...(row as T) }));

export type Post = { id: string; kind: 'article'|'page'; slug: string; title: string; excerpt: string; body: string; image: string; image_alt: string; status: 'draft'|'published'; placement: string; show_in_nav: number; created_at: string; updated_at: string; revision: number };
export function getPosts(publishedOnly = true): Post[] {
 return plainAll<Post>(getDb().prepare(`SELECT * FROM posts ${publishedOnly ? "WHERE status='published'" : ''} ORDER BY created_at DESC, id DESC`).all());
}
export function getPost(id: string) { return plain(getDb().prepare('SELECT * FROM posts WHERE id=?').get(id) as Post | undefined); }
export function publicPost(kind: 'article'|'page', slug: string) { return plain(getDb().prepare("SELECT * FROM posts WHERE kind=? AND slug=? AND status='published'").get(kind,slug) as Post | undefined); }
export function getPlacedArticles(placement: string, limit = 3): Post[] {
 return plainAll<Post>(getDb().prepare("SELECT * FROM posts WHERE kind='article' AND status='published' AND placement=? ORDER BY created_at DESC, id DESC LIMIT ?").all(placement, limit));
}
export function getNavPages() {
 return plainAll<{ slug: string; title: string }>(getDb().prepare("SELECT slug, title FROM posts WHERE kind='page' AND status='published' AND show_in_nav=1 ORDER BY created_at ASC, id ASC").all());
}

export function activeSessionCount(adminId: string) {
 return (getDb().prepare('SELECT count(*) AS count FROM sessions WHERE admin_id=? AND expires_at>?').get(adminId, Date.now()) as { count: number }).count;
}
export function listAdmins() {
 return plainAll<{ email: string; created_at: string }>(getDb().prepare('SELECT email, created_at FROM admins ORDER BY created_at').all());
}

export type MediaItem = { id: string; name: string; mime: string; size: number; created_at: string };
export function getMediaList(): MediaItem[] {
 return plainAll<MediaItem>(getDb().prepare('SELECT id, name, mime, length(data) AS size, created_at FROM media ORDER BY created_at DESC, id DESC').all());
}
export function getMedia(id: string) {
 return getDb().prepare('SELECT name, mime, data FROM media WHERE id=?').get(id) as { name: string; mime: string; data: Uint8Array } | undefined;
}
// Every place a media file is referenced, so it is not deleted while in use.
export function mediaUsage(id: string): string[] {
 const url = `/media/${id}`; const db = getDb();
 const sections = (db.prepare('SELECT section FROM content WHERE instr(data, ?) > 0').all(url) as { section: string }[]).map(row => `website content (${row.section})`);
 const posts = (db.prepare('SELECT title FROM posts WHERE image=? OR instr(body, ?) > 0').all(url, url) as { title: string }[]).map(row => `post "${row.title}"`);
 return [...sections, ...posts];
}

export type MediaOption = { value: string; label: string };
const MEDIA_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.mp4']);
function walk(dir: string, prefix: string, out: MediaOption[]) {
 let entries: fs.Dirent[];
 try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
 for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name, 'en', { numeric: true }))) {
  if (entry.name.startsWith('.')) continue;
  if (entry.isDirectory()) walk(path.join(dir, entry.name), `${prefix}/${entry.name}`, out);
  else if (MEDIA_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) out.push({ value: `${prefix}/${encodeURIComponent(entry.name)}`, label: `${prefix}/${entry.name}` });
 }
}
// Uploaded files plus everything shipped in public/images and public/videos,
// offered as suggestions in every image and video field of the editor.
export function getMediaOptions(): MediaOption[] {
 const options: MediaOption[] = getMediaList().map(item => ({ value: `/media/${item.id}`, label: `Uploaded: ${item.name}` }));
 const publicDir = path.join(process.cwd(), 'public');
 for (const folder of ['images', 'videos']) walk(path.join(publicDir, folder), `/${folder}`, options);
 return options;
}
