import { getMedia } from '@/app/lib/cms/content';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

// Serves uploaded files from the database. Supports byte ranges so video
// seeking works in every browser, and is cached forever because an id never
// changes its content.
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!UUID.test(id)) return new Response('Not found', { status: 404 });
  const file = getMedia(id);
  if (!file) return new Response('Not found', { status: 404 });

  const bytes = new Uint8Array(file.data);
  const total = bytes.byteLength;
  const headers = new Headers({
    'Content-Type': file.mime,
    'Cache-Control': 'public, max-age=31536000, immutable',
    'X-Content-Type-Options': 'nosniff',
    'Accept-Ranges': 'bytes',
    'Content-Disposition': `inline; filename="${file.name.replace(/[^\w.-]+/g, '_').slice(0, 100)}"`,
  });

  const range = /^bytes=(\d*)-(\d*)$/.exec(request.headers.get('range') ?? '');
  if (range && (range[1] || range[2])) {
    const start = range[1] ? Number(range[1]) : Math.max(0, total - Number(range[2]));
    const end = range[1] && range[2] ? Math.min(Number(range[2]), total - 1) : total - 1;
    if (start > end || start >= total) {
      headers.set('Content-Range', `bytes */${total}`);
      return new Response(null, { status: 416, headers });
    }
    headers.set('Content-Range', `bytes ${start}-${end}/${total}`);
    headers.set('Content-Length', String(end - start + 1));
    return new Response(bytes.slice(start, end + 1), { status: 206, headers });
  }

  headers.set('Content-Length', String(total));
  return new Response(bytes, { headers });
}
