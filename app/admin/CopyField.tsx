'use client';
import { useState } from 'react';
export default function CopyField({ value, label = 'Media address' }: { value: string; label?: string }) {
 const [copied, setCopied] = useState(false);
 return <div className="copy-row">
  <label className="grow">{label}<input readOnly value={value} onFocus={event => event.currentTarget.select()} /></label>
  <button type="button" className="secondary small" onClick={async () => {
   try { await navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { setCopied(false); }
  }}>{copied ? 'Copied' : 'Copy'}</button>
 </div>;
}
