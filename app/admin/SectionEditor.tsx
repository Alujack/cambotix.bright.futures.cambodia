'use client';
import Image from 'next/image';
import { useEffect, useState, useTransition } from 'react';
import type { EditorHints } from '../lib/cms/editor-hints';
import { blank, itemLabel, labelFor, sampleAt, setAt, type Json, type Path } from '../lib/cms/json';
import type { MediaOption } from '../lib/cms/content';
import { resetSection, saveContent, type ActionState } from './actions';

const MEDIA_KEYS = new Set(['image', 'src', 'poster']);
const isMediaKey = (key: string) => MEDIA_KEYS.has(key) || key.includes('src:');
export const isImageUrl = (value: string) => /^\/(images\/.+\.(jpe?g|png|webp|gif)|media\/[0-9a-f-]{36})$/i.test(value);
const isVideoUrl = (value: string) => /\.mp4$/i.test(value);

type Update = (path: Path, value: Json) => void;
type FieldProps = { label: string; keyName: string; path: Path; value: Json; sample: Json | undefined; hints: EditorHints; update: Update };

function StringField({ label, keyName, path, value, hints, update }: Omit<FieldProps, 'sample'> & { value: string }) {
 const [multiline] = useState(() => value.length > 70 || value.includes('\n'));
 const options = hints.enums?.[keyName];
 if (options) return <label>{label}<select value={value} onChange={event => update(path, event.target.value)}>{options.map(option => <option key={option} value={option}>{option}</option>)}</select></label>;
 if (isMediaKey(keyName)) return <div>
  <label>{label}<input type="text" list="media-options" value={value} placeholder="/images/... or /media/..." onChange={event => update(path, event.target.value)} /></label>
  {isImageUrl(value) && !isVideoUrl(value) && <Image src={value} alt="" width={120} height={90} unoptimized className="thumb" />}
  {isVideoUrl(value) && <video src={value} muted playsInline preload="metadata" className="thumb" width={160} height={90} />}
 </div>;
 return <label>{label}{multiline
  ? <textarea value={value} onChange={event => update(path, event.target.value)} />
  : <input type="text" value={value} onChange={event => update(path, event.target.value)} />}</label>;
}

function ArrayField({ label, path, value, sample, hints, update }: FieldProps & { value: Json[] }) {
 const [openIndex, setOpenIndex] = useState<number | null>(null);
 const atRoot = path.length === 0;
 const templateSource = atRoot && hints.template !== undefined ? hints.template : (sampleAt(sample, [...path, 0]) ?? value[0] ?? '');
 const objectItems = value.some(item => item && typeof item === 'object' && !Array.isArray(item)) || (templateSource !== null && typeof templateSource === 'object' && !Array.isArray(templateSource));
 const add = () => {
  const next = atRoot && hints.template !== undefined ? structuredClone(hints.template) : blank(templateSource);
  update(path, [...value, next]);
  setOpenIndex(value.length);
 };
 const remove = (index: number) => { if (!window.confirm('Remove this item?')) return; update(path, value.filter((_, other) => other !== index)); setOpenIndex(null); };
 const move = (index: number, direction: -1 | 1) => {
  const target = index + direction;
  if (target < 0 || target >= value.length) return;
  const copy = [...value];
  [copy[index], copy[target]] = [copy[target], copy[index]];
  update(path, copy);
  setOpenIndex(target);
 };
 return <div className="list">
  <div className="list-head"><span>{label}</span><span className="muted">{value.length} {value.length === 1 ? 'item' : 'items'}</span></div>
  {value.map((item, index) => {
   const tools = <div className="item-tools">
    <button type="button" className="secondary small" onClick={() => move(index, -1)} disabled={index === 0} aria-label={`Move item ${index + 1} up`}>↑</button>
    <button type="button" className="secondary small" onClick={() => move(index, 1)} disabled={index === value.length - 1} aria-label={`Move item ${index + 1} down`}>↓</button>
    <button type="button" className="danger small" onClick={() => remove(index)}>Remove</button>
   </div>;
   let body: React.ReactNode;
   if (Array.isArray(item)) body = <div className="tuple">{item.map((cell, cellIndex) => <Field key={cellIndex} label={hints.tupleLabels?.[cellIndex] ?? `Part ${cellIndex + 1}`} keyName="" path={[...path, index, cellIndex]} value={cell} sample={sample} hints={hints} update={update} />)}</div>;
   else if (item && typeof item === 'object') body = <div className="field-grid">{Object.entries(item).map(([key, child]) => <Field key={key} label={labelFor(key)} keyName={key} path={[...path, index, key]} value={child} sample={sample} hints={hints} update={update} />)}</div>;
   else body = <Field label={`${label} ${index + 1}`} keyName="" path={[...path, index]} value={item} sample={sample} hints={hints} update={update} />;
   if (objectItems && item && typeof item === 'object' && !Array.isArray(item)) {
    return <details key={index} className="item" open={openIndex === index} onToggle={event => { const open = (event.target as HTMLDetailsElement).open; setOpenIndex(open ? index : openIndex === index ? null : openIndex); }}>
     <summary>{itemLabel(item, index)}</summary>{tools}{body}
    </details>;
   }
   return <div key={index} className="item">{tools}{body}</div>;
  })}
  <div><button type="button" className="secondary" onClick={add}>+ Add item</button></div>
 </div>;
}

function Field(props: FieldProps) {
 const { label, keyName, path, value, sample, hints, update } = props;
 if (typeof value === 'string') return <StringField label={label} keyName={keyName} path={path} value={value} hints={hints} update={update} />;
 if (typeof value === 'number') return <label>{label}<input type="number" step="any" value={value} onChange={event => update(path, event.target.value === '' ? 0 : Number(event.target.value))} /></label>;
 if (typeof value === 'boolean') return <label className="check"><input type="checkbox" checked={value} onChange={event => update(path, event.target.checked)} /> {label}</label>;
 if (Array.isArray(value)) return <ArrayField {...props} value={value} />;
 if (value && typeof value === 'object') return <fieldset className="group"><legend>{label}</legend>{Object.entries(value).map(([key, child]) => <Field key={key} label={labelFor(key)} keyName={key} path={[...path, key]} value={child} sample={sample} hints={hints} update={update} />)}</fieldset>;
 return null;
}

type Props = { section: string; label: string; initial: Json; sample: Json | undefined; revision: number; hints: EditorHints; mediaOptions: MediaOption[] };
export default function SectionEditor({ section, label, initial, sample, revision: initialRevision, hints, mediaOptions }: Props) {
 const [data, setData] = useState<Json>(initial);
 const [saved, setSaved] = useState<Json>(initial);
 const [revision, setRevision] = useState(initialRevision);
 const [state, setState] = useState<ActionState>({});
 const [pending, start] = useTransition();
 const dirty = JSON.stringify(data) !== JSON.stringify(saved);
 useEffect(() => {
  if (!dirty) return;
  const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); };
  window.addEventListener('beforeunload', warn);
  return () => window.removeEventListener('beforeunload', warn);
 }, [dirty]);
 const update: Update = (path, value) => { setData(current => setAt(current, path, value)); setState({}); };
 const save = () => start(async () => {
  const result = await saveContent(section, data, revision);
  setState(result);
  if (result.revision) { setRevision(result.revision); setSaved(data); }
 });
 const restore = () => {
  if (!window.confirm('Replace everything in this section with the original website text? Your edits here will be lost.')) return;
  start(async () => {
   const result = await resetSection(section, revision);
   setState(result);
   if (result.revision) { setRevision(result.revision); const seed = result.data as Json; setData(seed); setSaved(seed); }
  });
 };
 const groups = hints.groups && data && typeof data === 'object' && !Array.isArray(data) ? Object.entries(data as Record<string, Json>) : null;
 return <div>
  {groups ? groups.map(([group, fields]) => {
   const count = fields && typeof fields === 'object' && !Array.isArray(fields) ? Object.keys(fields).length : 0;
   return <details key={group} className="item">
    <summary>{labelFor(group)} <span className="muted">({count} {count === 1 ? 'line' : 'lines'})</span></summary>
    <div className="field-grid">{fields && typeof fields === 'object' && !Array.isArray(fields)
     ? Object.entries(fields).map(([key, child]) => <Field key={key} label={labelFor(key)} keyName={key} path={[group, key]} value={child} sample={sample} hints={hints} update={update} />)
     : <Field label={labelFor(group)} keyName={group} path={[group]} value={fields} sample={sample} hints={hints} update={update} />}</div>
   </details>;
  }) : <Field label={label} keyName="" path={[]} value={data} sample={sample} hints={hints} update={update} />}
  <datalist id="media-options">{mediaOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</datalist>
  <div className="savebar">
   <div className="actions">
    <button type="button" onClick={save} disabled={pending || !dirty}>{pending ? 'Saving…' : 'Save changes'}</button>
    <button type="button" className="secondary" onClick={() => { setData(saved); setState({}); }} disabled={pending || !dirty}>Discard changes</button>
    <button type="button" className="secondary" onClick={restore} disabled={pending}>Restore original text</button>
   </div>
   <div className="muted">{dirty ? 'Unsaved changes' : `Saved version ${revision}`}</div>
  </div>
  {state.error && <p role="alert" className="notice error">{state.error}</p>}
  {state.success && <p role="status" className="notice">{state.success}</p>}
 </div>;
}
