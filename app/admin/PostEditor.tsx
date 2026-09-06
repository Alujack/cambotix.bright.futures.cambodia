'use client';
import Image from 'next/image';
import { useActionState, useState } from 'react';
import type { MediaOption, Post } from '../lib/cms/content';
import { deletePost, savePost } from './actions';
import ConfirmAction from './ConfirmAction';
import { isImageUrl } from './SectionEditor';

const PLACEMENTS: [string, string][] = [['', 'Articles page only'], ['home', 'Home page'], ['about', 'About page'], ['projects', 'Projects page'], ['impact', 'Impact page'], ['volunteers', 'Volunteer page'], ['contact', 'Contact page']];
const slugify = (text: string) => text.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 100);

export default function PostEditor({ post, initialKind, mediaOptions, saved }: { post: Post | null; initialKind: 'article' | 'page'; mediaOptions: MediaOption[]; saved: boolean }) {
 const [state, action, pending] = useActionState(savePost, {});
 const [kind, setKind] = useState<'article' | 'page'>(post?.kind ?? initialKind);
 const [slug, setSlug] = useState(post?.slug ?? '');
 const [slugTouched, setSlugTouched] = useState(Boolean(post));
 const [image, setImage] = useState(post?.image ?? '');
 const publicPath = `/${kind === 'article' ? 'articles/' : ''}${slug || 'your-address'}`;
 return <form action={action} className="field-grid">
  <input type="hidden" name="id" value={post?.id ?? 'new'} />
  <input type="hidden" name="revision" value={post?.revision ?? 0} />
  {saved && <p role="status" className="notice">Saved.</p>}
  <div className="two">
   <label>Type<select name="kind" value={kind} onChange={event => setKind(event.target.value as 'article' | 'page')}><option value="article">Article (news or story)</option><option value="page">Page (standalone)</option></select></label>
   <label>Status<select name="status" defaultValue={post?.status ?? 'draft'}><option value="draft">Draft (hidden)</option><option value="published">Published (live)</option></select></label>
  </div>
  <label>Title<input name="title" type="text" required maxLength={200} defaultValue={post?.title ?? ''} onChange={event => { if (!slugTouched) setSlug(slugify(event.target.value)); }} /></label>
  <div>
   <label>Web address<input name="slug" type="text" required maxLength={100} pattern="[a-z0-9]+(?:-[a-z0-9]+)*" title="Lowercase letters, numbers, and single hyphens" value={slug} onChange={event => { setSlugTouched(true); setSlug(event.target.value); }} /></label>
   <p className="muted mt-1">Visitors will open it at <code>{publicPath}</code></p>
  </div>
  <label>Summary<textarea name="excerpt" maxLength={20000} defaultValue={post?.excerpt ?? ''} placeholder="One or two sentences shown in lists and search results." /></label>
  <div>
   <label>Content<textarea name="body" required rows={16} maxLength={100000} defaultValue={post?.body ?? ''} style={{ minHeight: 320 }} /></label>
   <p className="muted mt-1">Leave a blank line between paragraphs. Start a line with &quot;## &quot; for a heading, &quot;- &quot; for a bullet, or &quot;&gt; &quot; for a quote. Use **bold** and [link text](https://example.org).</p>
  </div>
  <div className="two">
   <label>Image<input name="image" type="text" list="media-options" value={image} placeholder="/images/... or /media/..." onChange={event => setImage(event.target.value)} /></label>
   <label>Image description<input name="image_alt" type="text" maxLength={300} defaultValue={post?.image_alt ?? ''} placeholder="Describe the picture for people who cannot see it." /></label>
  </div>
  {isImageUrl(image) && <Image src={image} alt="" width={240} height={160} unoptimized className="thumb" />}
  {kind === 'article'
   ? <label>Also show on<select name="placement" defaultValue={post?.placement ?? ''}>{PLACEMENTS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
   : <><input type="hidden" name="placement" value="" /><label className="check"><input type="checkbox" name="show_in_nav" defaultChecked={post?.show_in_nav === 1} /> Show this page in the website menu</label></>}
  {state.error && <p role="alert" className="notice error">{state.error}</p>}
  <div className="actions">
   <button disabled={pending}>{pending ? 'Saving…' : post ? 'Save changes' : 'Create'}</button>
   {post && <ConfirmAction action={deletePost.bind(null, post.id, post.revision)} label="Delete" confirm={`Delete "${post.title}" permanently?`} />}
  </div>
  <datalist id="media-options">{mediaOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</datalist>
 </form>;
}
