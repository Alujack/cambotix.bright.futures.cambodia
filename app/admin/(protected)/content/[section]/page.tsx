import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireAdmin } from '@/app/lib/cms/auth';
import { getMediaOptions, getSection } from '@/app/lib/cms/content';
import { defaults, sectionLabels, type Section } from '@/app/lib/cms/defaults';
import { editorHints } from '@/app/lib/cms/editor-hints';
import type { Json } from '@/app/lib/cms/json';
import SectionEditor from '@/app/admin/SectionEditor';
export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
 await requireAdmin();
 const { section } = await params;
 if (!Object.hasOwn(defaults, section)) notFound();
 const key = section as Section;
 const row = getSection(key);
 const hints = editorHints[key];
 return <main className="space-y-6">
  <nav aria-label="Breadcrumb" className="muted"><Link href="/admin/content">Website content</Link> / {sectionLabels[key]}</nav>
  <div><p className="eyebrow">Website content</p><h1>{sectionLabels[key]}</h1><p className="muted mt-2">{hints.help}</p></div>
  <div className="card">
   <SectionEditor key={row.revision} section={key} label={sectionLabels[key]} initial={JSON.parse(row.data) as Json} sample={defaults[key] as unknown as Json} revision={row.revision} hints={hints} mediaOptions={getMediaOptions()} />
  </div>
  <p className="muted">Need a new photo or video? <Link href="/admin/media">Upload it in the media library</Link>, then paste its address into an image field here.</p>
 </main>;
}
