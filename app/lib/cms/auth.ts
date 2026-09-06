import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getDb } from './db';
import { hashToken } from './password';
export const COOKIE = 'community_admin';
export async function currentAdmin() {
 const token = (await cookies()).get(COOKIE)?.value;
 if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
 return getDb().prepare('SELECT admins.id, admins.email FROM sessions JOIN admins ON admins.id=sessions.admin_id WHERE token_hash=? AND expires_at>?').get(hashToken(token),Date.now()) as {id:string;email:string} | undefined;
}
export async function requireAdmin() {
 const admin=await currentAdmin();
 if (!admin) redirect('/admin/login');
 return admin;
}
