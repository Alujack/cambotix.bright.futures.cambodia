import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireAdmin } from '@/app/lib/cms/auth';
import { getMediaOptions, getPost } from '@/app/lib/cms/content';
import PostEditor from '@/app/admin/PostEditor';
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
export default async function PostPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ kind?: string; saved?: string }> }) {
 await requireAdmin();
 const { id } = await params;
 const { kind, saved } = await searchParams;
 const post = id === 'new' ? null : UUID.test(id) ? getPost(id) : undefined;
 if (post === undefined) notFound();
 const initialKind = kind === 'page' ? 'page' : 'article';
 const label = post ? (post.kind === 'article' ? 'Edit article' : 'Edit page') : (initialKind === 'article' ? 'New article' : 'New page');
 return <main className="space-y-6">
  <nav aria-label="Breadcrumb" className="muted"><Link href="/admin">Dashboard</Link> / {label}</nav>
  <div className="flex flex-wrap items-end justify-between gap-4">
   <div><p className="eyebrow">{post ? `${post.kind} · ${post.status}` : 'Publishing'}</p><h1>{post ? post.title : label}</h1></div>
   {post?.status === 'published' && <Link className="button secondary" href={`/${post.kind === 'article' ? 'articles/' : ''}${post.slug}`} target="_blank">View on website ↗</Link>}
  </div>
  <div className="card"><PostEditor key={post?.revision ?? 'new'} post={post} initialKind={initialKind} mediaOptions={getMediaOptions()} saved={saved === '1'} /></div>
 </main>;
}
