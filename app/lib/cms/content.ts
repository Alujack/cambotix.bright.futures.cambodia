import 'server-only';
import { getDb } from './db';
import { defaults, type SiteContent, type Section } from './defaults';
import { getHeroSlides } from '../slideshow';

export function getSection(section: Section) {
 const db = getDb();
 const seed = section === 'heroSlides' ? getHeroSlides() : defaults[section];
 db.prepare('INSERT OR IGNORE INTO content (section,data) VALUES (?,?)').run(section,JSON.stringify(seed));
 return db.prepare('SELECT data, revision FROM content WHERE section=?').get(section) as { data: string; revision: number };
}
export function getSiteContent(): SiteContent {
 return Object.fromEntries(Object.keys(defaults).map(key => [key,JSON.parse(getSection(key as Section).data)])) as SiteContent;
}
export type Post = { id: string; kind: 'article'|'page'; slug: string; title: string; excerpt: string; body: string; image: string; image_alt: string; status: 'draft'|'published'; placement: string; show_in_nav: number; created_at: string; updated_at: string; revision: number };
export function getPosts(publishedOnly = true): Post[] {
 return getDb().prepare(`SELECT * FROM posts ${publishedOnly ? "WHERE status='published'" : ''} ORDER BY created_at DESC, id DESC`).all() as Post[];
}
export function getPost(id: string) { return getDb().prepare('SELECT * FROM posts WHERE id=?').get(id) as Post | undefined; }
export function publicPost(kind: string, slug: string) { return getDb().prepare("SELECT * FROM posts WHERE kind=? AND slug=? AND status='published'").get(kind,slug) as Post | undefined; }
