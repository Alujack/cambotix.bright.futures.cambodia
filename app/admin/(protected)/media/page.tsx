import Image from 'next/image';
import { requireAdmin } from '@/app/lib/cms/auth';
import { getMediaList } from '@/app/lib/cms/content';
import { deleteMedia, uploadMedia } from '@/app/admin/actions';
import ConfirmAction from '@/app/admin/ConfirmAction';
import CopyField from '@/app/admin/CopyField';
import Form from '@/app/admin/Form';
const formatBytes = (bytes: number) => bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
export default async function MediaPage() {
 await requireAdmin();
 const media = getMediaList();
 return <main className="space-y-7">
  <div><p className="eyebrow">Media library</p><h1>Photos and videos</h1><p className="muted mt-2">Upload a file here, copy its address, and paste it into any image or video field.</p></div>
  <section className="card"><h2 className="mb-4">Upload a file</h2>
   <Form action={uploadMedia} submit="Upload">
    <label>File<input type="file" name="file" required accept="image/jpeg,image/png,image/webp,image/gif,video/mp4" /></label>
    <p className="muted">JPEG, PNG, WebP, GIF, or MP4 up to 8 MB. Keep videos short so pages stay fast.</p>
   </Form>
  </section>
  <section className="card"><h2 className="mb-4">Uploaded files ({media.length})</h2>
   {media.length ? <div className="media-grid">{media.map(item => {
    const url = `/media/${item.id}`;
    return <article key={item.id} className="media-item">
     {item.mime.startsWith('image/')
      ? <Image src={url} alt={item.name} width={320} height={240} unoptimized className="media-thumb" />
      : <video src={url} muted playsInline controls preload="metadata" className="media-thumb" />}
     <p className="font-bold break-all">{item.name}</p>
     <p className="muted">{item.mime} · {formatBytes(item.size)} · {item.created_at} UTC</p>
     <CopyField value={url} />
     <div><ConfirmAction action={deleteMedia.bind(null, item.id)} label="Delete" confirm={`Delete ${item.name}? This cannot be undone.`} className="danger small" /></div>
    </article>;
   })}</div> : <p className="muted">No uploads yet. Files shipped with the website live in /images and /videos and are always available in image fields.</p>}
  </section>
 </main>;
}
