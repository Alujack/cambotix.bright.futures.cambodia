import Link from 'next/link';
import { requireAdmin } from '../../lib/cms/auth';
import { logout } from '../actions';
export default async function ProtectedLayout({children}:{children:React.ReactNode}) {
 const admin=await requireAdmin();
 return <div className="mx-auto max-w-7xl px-4 py-8 sm:px-7"><header className="mb-8 flex flex-wrap items-center justify-between gap-5 border-b border-stone-200 pb-6"><div><p className="eyebrow">Content management</p><Link href="/admin" className="text-xl font-extrabold">Community admin</Link></div><nav aria-label="Admin navigation" className="flex flex-wrap items-center gap-4 text-sm font-semibold"><Link href="/admin">Dashboard</Link><Link href="/admin/content">Website content</Link><Link href="/admin/media">Media</Link><Link href="/admin/account">Account</Link><Link href="/" target="_blank">View website ↗</Link><form action={logout}><button className="secondary">Sign out</button></form></nav></header><p className="muted mb-5">Signed in as {admin.email}</p>{children}</div>;
}
