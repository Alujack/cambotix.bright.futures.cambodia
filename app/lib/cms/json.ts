// Small helpers for editing arbitrary JSON content trees. Pure functions,
// shared by the admin editor (client) and server-side editor hints.
export type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
export type Path = (string | number)[];

export function setAt(root: Json, path: Path, value: Json): Json {
  if (!path.length) return value;
  const [head, ...rest] = path;
  if (Array.isArray(root)) {
    const copy = [...root];
    copy[head as number] = setAt(copy[head as number] ?? null, rest, value);
    return copy;
  }
  const object = { ...((root ?? {}) as Record<string, Json>) };
  object[head as string] = setAt(object[head as string] ?? null, rest, value);
  return object;
}

// Follow a path through a sample document. Arrays always continue through
// their first element, so a sample describes the shape of every item.
export function sampleAt(sample: Json | undefined, path: Path): Json | undefined {
  let current = sample;
  for (const key of path) {
    if (current === null || current === undefined || typeof current !== 'object') return undefined;
    current = Array.isArray(current) ? current[0] : (current as Record<string, Json>)[key as string];
  }
  return current;
}

// Copy a value with every text emptied and every number reset to zero.
export function blank(value: Json): Json {
  if (typeof value === 'string') return '';
  if (typeof value === 'number') return 0;
  if (typeof value === 'boolean') return false;
  if (Array.isArray(value)) return value.map(blank);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, blank(child)]));
  return value;
}

export function labelFor(key: string): string {
  // Website copy keys look like "012 href: /contact". Keep the original text as the label.
  if (key.includes(' ')) return key.replace(/^\d+\s+/, '');
  return key
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/^./, (character) => character.toUpperCase());
}

export function itemLabel(item: Json, index: number): string {
  if (item && typeof item === 'object' && !Array.isArray(item)) {
    for (const key of ['title', 'name', 'label', 'id', 'question', 'category', 'alt']) {
      const value = (item as Record<string, Json>)[key];
      if (typeof value === 'string' && value.trim()) return value;
    }
  }
  if (Array.isArray(item) && typeof item[0] === 'string' && item[0].trim()) return item[0];
  if (typeof item === 'string' && item.trim()) return item;
  return `Item ${index + 1}`;
}
