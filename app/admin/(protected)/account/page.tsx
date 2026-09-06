import { requireAdmin } from '@/app/lib/cms/auth';
import { activeSessionCount, listAdmins } from '@/app/lib/cms/content';
import { changePassword } from '@/app/admin/actions';
import Form from '@/app/admin/Form';
export default async function AccountPage() {
 const admin = await requireAdmin();
 const sessions = activeSessionCount(admin.id);
 const admins = listAdmins();
 return <main className="space-y-7">
  <div><p className="eyebrow">Account</p><h1>Your sign-in details</h1></div>
  <section className="card"><p className="muted">Signed in as</p><p className="text-lg font-bold">{admin.email}</p><p className="muted mt-2">{sessions} active {sessions === 1 ? 'session' : 'sessions'}. Sessions end after 8 hours.</p></section>
  <section className="card"><h2 className="mb-4">Change password</h2>
   <Form action={changePassword} submit="Change password">
    <label>Current password<input type="password" name="current" required autoComplete="current-password" maxLength={256} /></label>
    <label>New password<input type="password" name="password" required minLength={12} maxLength={256} autoComplete="new-password" /></label>
    <label>Confirm new password<input type="password" name="confirm" required minLength={12} maxLength={256} autoComplete="new-password" /></label>
    <p className="muted">At least 12 characters. You will be signed out on every device afterwards.</p>
   </Form>
  </section>
  <section className="card"><h2>Administrators</h2>
   <ul className="mt-3 divide-y divide-stone-100">{admins.map(item => <li key={item.email} className="py-2"><span className="font-semibold">{item.email}</span> <span className="muted">since {item.created_at} UTC</span></li>)}</ul>
   <p className="muted mt-4">To add another administrator, run <code>npm run admin:create</code> on the server. Forgotten passwords are reset the same way after removing the account from the database.</p>
  </section>
 </main>;
}
