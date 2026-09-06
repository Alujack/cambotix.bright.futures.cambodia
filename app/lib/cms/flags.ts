// The admin panel keeps everything in a SQLite file, which needs one always-on
// server with a writable disk. Vercel does not offer that, so the panel stays
// off unless CMS_ENABLED=true is set. While it is off the website serves the
// content defined in app/content.ts and the cms defaults, every /admin address
// returns 404, and the database file is never opened.
export const CMS_ENABLED = process.env.CMS_ENABLED === 'true';
