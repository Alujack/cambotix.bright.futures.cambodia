import { createInterface } from 'node:readline/promises';
import { randomUUID } from 'node:crypto';
import { getDb } from '../app/lib/cms/db';
import { hashPassword } from '../app/lib/cms/password';
import { z } from 'zod';
const rl=createInterface({input:process.stdin,output:process.stdout});
try {
 const email=z.email().parse((process.env.ADMIN_EMAIL || await rl.question('Admin email: ')).trim().toLowerCase());
 let password=process.env.ADMIN_PASSWORD;
 if (!password) {
  if (!process.stdin.isTTY) throw new Error('Set ADMIN_PASSWORD for non-interactive setup.');
  process.stdout.write('Password (at least 12 characters; hidden): ');
  // Temporarily suppress readline echo while retaining terminal editing.
  const terminal = rl as unknown as { _writeToOutput: (text:string)=>void };
  const write=terminal._writeToOutput;
  terminal._writeToOutput=()=>{};
  try { password=await rl.question(''); } finally { terminal._writeToOutput=write; process.stdout.write('\n'); }
 }
 if (password.length<12 || password.length>256) throw new Error('Use a password of 12–256 characters.');
 const db=getDb();
 const existing=db.prepare('SELECT id FROM admins WHERE email=?').get(email);
 if (existing) throw new Error('This admin already exists. Change its password from /admin/account.');
 db.prepare('INSERT INTO admins (id,email,password_hash) VALUES (?,?,?)').run(randomUUID(),email,await hashPassword(password));
 console.log('Admin created. Sign in at /admin/login.');
} catch(error) { console.error(error instanceof Error ? error.message : 'Unable to create admin.');process.exitCode=1; }
finally { rl.close(); }
