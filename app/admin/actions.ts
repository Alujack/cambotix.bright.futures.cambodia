'use server';
import { randomBytes, randomUUID } from 'node:crypto';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { COOKIE, requireAdmin } from '../lib/cms/auth';
import { getDb, audit } from '../lib/cms/db';
import { hashPassword, verifyPassword, hashToken } from '../lib/cms/password';
import { defaults, type Section } from '../lib/cms/defaults';
import { validateSection, postSchema, errorMessage } from '../lib/cms/validation';
export type ActionState = { error?: string; success?: string; revision?: number };
const refresh = () => revalidatePath('/', 'layout');
export async function login(_state:ActionState, form:FormData):Promise<ActionState> {
 const email=String(form.get('email')||'').trim().toLowerCase();
 const password=String(form.get('password')||'');
 if(!z.email().safeParse(email).success || password.length>256)return {error:'Email or password is incorrect.'};
 const db=getDb(); const now=Date.now();
 db.prepare('DELETE FROM login_attempts WHERE reset_at<=?').run(now);
 db.prepare('DELETE FROM sessions WHERE expires_at<=?').run(now);
 // Account-wide, persistent throttling cannot be bypassed by rotating cookies/IPs.
 db.prepare('INSERT INTO login_attempts (email,attempts,reset_at) VALUES (?,1,?) ON CONFLICT(email) DO UPDATE SET attempts=attempts+1').run(email,now+15*60*1000);
 const attempt=db.prepare('SELECT attempts FROM login_attempts WHERE email=?').get(email) as {attempts:number};
 if(attempt.attempts>5)return {error:'Too many sign-in attempts. Try again in 15 minutes.'};
 const admin=db.prepare('SELECT id,password_hash FROM admins WHERE email=?').get(email) as {id:string;password_hash:string}|undefined;
 const fallback='00000000000000000000000000000000:'+ '0'.repeat(128);
 const valid=await verifyPassword(password,admin?.password_hash||fallback);
 if(!admin || !valid)return {error:'Email or password is incorrect.'};
 db.prepare('DELETE FROM login_attempts WHERE email=?').run(email);
 const jar=await cookies(); const previous=jar.get(COOKIE)?.value;
 if(previous)db.prepare('DELETE FROM sessions WHERE token_hash=?').run(hashToken(previous));
 const token=randomBytes(32).toString('hex');
 db.prepare('INSERT INTO sessions (token_hash,admin_id,expires_at) VALUES (?,?,?)').run(hashToken(token),admin.id,now+8*60*60*1000);
 jar.set(COOKIE,token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:8*60*60});
 audit(admin.id,'signed in','account');
 redirect('/admin');
}
export async function logout() {
 const jar=await cookies();const token=jar.get(COOKIE)?.value;
 if(token)getDb().prepare('DELETE FROM sessions WHERE token_hash=?').run(hashToken(token));
 jar.delete(COOKIE);redirect('/admin/login');
}
export async function saveContent(section:string, data:unknown, revision:number):Promise<ActionState> {
 const admin=await requireAdmin();
 if(!Object.hasOwn(defaults,section))return {error:'Unknown content section.'};
 try {
  const parsed=validateSection(section as Section,data);
  const result=getDb().prepare('UPDATE content SET data=?,revision=revision+1 WHERE section=? AND revision=?').run(JSON.stringify(parsed),section,revision);
  if(!result.changes)return {error:'This section changed in another window. Copy your changes, reload, and try again.'};
  audit(admin.id,'updated content',section);refresh();return {success:'Saved. Your changes are now live.',revision:revision+1};
 } catch(error) {return {error:errorMessage(error)};}
}
export async function savePost(_state:ActionState, form:FormData):Promise<ActionState> {
 const admin=await requireAdmin();
 let id='';
 try {
  const data=postSchema.parse({...Object.fromEntries(form),show_in_nav:form.get('show_in_nav')==='on'});
  const db=getDb();id=data.id==='new'?randomUUID():data.id;
  const duplicate=db.prepare('SELECT id FROM posts WHERE kind=? AND slug=? AND id<>?').get(data.kind,data.slug,id);
  if(duplicate)return {error:'That URL is already used. Choose another slug.'};
  const values=[data.kind,data.slug,data.title,data.excerpt,data.body,data.image,data.image_alt,data.status,data.kind==='article'?data.placement:'',data.kind==='page'&&data.show_in_nav?1:0];
  if(data.id==='new')db.prepare('INSERT INTO posts (kind,slug,title,excerpt,body,image,image_alt,status,placement,show_in_nav,id) VALUES (?,?,?,?,?,?,?,?,?,?,?)').run(...values,id);
  else {
   const result=db.prepare('UPDATE posts SET kind=?,slug=?,title=?,excerpt=?,body=?,image=?,image_alt=?,status=?,placement=?,show_in_nav=?,updated_at=CURRENT_TIMESTAMP,revision=revision+1 WHERE id=? AND revision=?').run(...values,id,data.revision);
   if(!result.changes)return {error:'This item changed or was deleted in another window. Reload before editing again.'};
  }
  audit(admin.id,data.id==='new'?'created post':'updated post',id);refresh();
 } catch(error){return {error:errorMessage(error)};}
 redirect(`/admin/posts/${id}?saved=1`);
}
export async function deletePost(id:string, revision:number):Promise<ActionState> {
 const admin=await requireAdmin();
 const result=getDb().prepare('DELETE FROM posts WHERE id=? AND revision=?').run(id,revision);
 if(!result.changes)return {error:'This item changed or was already deleted. Reload the page.'};
 audit(admin.id,'deleted post',id);refresh();redirect('/admin?deleted=1');
}
export async function changePassword(_state:ActionState,form:FormData):Promise<ActionState> {
 const admin=await requireAdmin();const password=String(form.get('password')||'');
 if(password.length<12||password.length>256)return {error:'Use a new password of 12–256 characters.'};
 if(password!==form.get('confirm'))return {error:'The new passwords do not match.'};
 const current=String(form.get('current')||'');
 if(current.length>256)return {error:'Current password is incorrect.'};
 const row=getDb().prepare('SELECT password_hash FROM admins WHERE id=?').get(admin.id) as {password_hash:string};
 if(!await verifyPassword(current,row.password_hash))return {error:'Current password is incorrect.'};
 getDb().prepare('UPDATE admins SET password_hash=? WHERE id=?').run(await hashPassword(password),admin.id);
 getDb().prepare('DELETE FROM sessions WHERE admin_id=?').run(admin.id);
 audit(admin.id,'changed password','account');
 (await cookies()).delete(COOKIE);redirect('/admin/login?changed=1');
}
export async function uploadMedia(_state:ActionState,form:FormData):Promise<ActionState> {
 const admin=await requireAdmin();const file=form.get('file');
 if(!(file instanceof File)||file.size===0||file.size>8*1024*1024)return {error:'Select a JPEG, PNG, WebP, GIF, or MP4 file up to 8 MB.'};
 const data=Buffer.from(await file.arrayBuffer());
 let mime='';
 if(data.subarray(0,3).equals(Buffer.from([255,216,255])))mime='image/jpeg';
 else if(data.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))mime='image/png';
 else if(['GIF87a','GIF89a'].includes(data.toString('ascii',0,6)))mime='image/gif';
 else if(data.toString('ascii',0,4)==='RIFF'&&data.toString('ascii',8,12)==='WEBP')mime='image/webp';
 else if(data.toString('ascii',4,8)==='ftyp'&&['isom','iso2','mp41','mp42','avc1','M4V '].includes(data.toString('ascii',8,12)))mime='video/mp4';
 if(!mime)return {error:'Unsupported file content. Upload a JPEG, PNG, WebP, GIF, or MP4.'};
 const id=randomUUID();getDb().prepare('INSERT INTO media (id,name,mime,data) VALUES (?,?,?,?)').run(id,file.name.slice(0,200),mime,data);
 audit(admin.id,'uploaded media',id);revalidatePath('/admin/media');return {success:`Uploaded. Media URL: /media/${id}`};
}
