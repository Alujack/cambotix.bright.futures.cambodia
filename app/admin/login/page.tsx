import { redirect } from 'next/navigation';
import { currentAdmin } from '../../lib/cms/auth';
import { getDb } from '../../lib/cms/db';
import { login } from '../actions';
import Form from '../Form';
export default async function LoginPage({searchParams}:{searchParams:Promise<{changed?:string}>}) {
 if(await currentAdmin())redirect('/admin');
 const configured=Boolean(getDb().prepare('SELECT id FROM admins LIMIT 1').get());
 const {changed}=await searchParams;
 return <main className="mx-auto max-w-lg px-5 py-16"><div className="card">
 <p className="eyebrow">Community website</p><h1 className="mb-3 mt-2">Admin sign in</h1>
 <p className="muted mb-6">Manage stories, pages, projects, and the people behind our work.</p>
 {changed&&<p className="notice mb-5">Password changed. Sign in with your new password.</p>}
 {configured?<Form action={login} submit="Sign in"><label>Email<input name="email" type="email" required autoComplete="username" maxLength={254}/></label><label>Password<input name="password" type="password" required autoComplete="current-password" maxLength={256}/></label></Form>:<div className="notice">No administrator has been created yet. Run <code>npm run admin:create</code> on the server, then refresh this page.</div>}
 </div></main>;
}
