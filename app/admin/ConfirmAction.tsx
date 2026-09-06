'use client';
import { useState, useTransition } from 'react';
import type { ActionState } from './actions';
export default function ConfirmAction({ action, label, confirm, className = 'danger' }: { action: () => Promise<ActionState>; label: string; confirm: string; className?: string }) {
 const [pending, start] = useTransition();
 const [message, setMessage] = useState<ActionState>({});
 return <span className="inline-action">
  <button type="button" className={className} disabled={pending} onClick={() => {
   if (!window.confirm(confirm)) return;
   start(async () => { const result = await action(); setMessage(result ?? {}); });
  }}>{pending ? 'Please wait…' : label}</button>
  {message.error && <span role="alert" className="muted error-text">{message.error}</span>}
  {message.success && <span role="status" className="muted">{message.success}</span>}
 </span>;
}
