import Link from 'next/link';
import { requireAdmin } from '@/app/lib/cms/auth';
import { getSectionRevisions } from '@/app/lib/cms/content';
import { sectionLabels } from '@/app/lib/cms/defaults';
import { editorHints, sectionOrder } from '@/app/lib/cms/editor-hints';
export default async function ContentPage() {
 await requireAdmin();
 const revisions = getSectionRevisions();
 return <main className="space-y-7">
  <div><p className="eyebrow">Website content</p><h1>Edit what visitors read.</h1><p className="muted mt-2">Choose a part of the website. Changes go live the moment you save.</p></div>
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
   {sectionOrder.map(section => {
    const revision = revisions[section] ?? 1;
    return <Link key={section} href={`/admin/content/${section}`} className="card link block">
     <p className="font-bold">{sectionLabels[section]}</p>
     <p className="muted mt-2">{editorHints[section].help}</p>
     <p className="muted mt-3">{revision > 1 ? `Edited ${revision - 1} ${revision - 1 === 1 ? 'time' : 'times'}` : 'Original text'}</p>
    </Link>;
   })}
  </div>
 </main>;
}
