// A deliberately small text format for articles and pages. Only text, headings,
// bullets, quotes, bold, and safe links are supported, so nothing an author
// types can inject markup into the page.
export type Inline = { type: 'text'; text: string } | { type: 'strong'; text: string } | { type: 'link'; text: string; href: string };
export type Block =
  | { type: 'heading'; level: 2 | 3; inline: Inline[] }
  | { type: 'paragraph'; inline: Inline[] }
  | { type: 'list'; items: Inline[][] }
  | { type: 'quote'; inline: Inline[] };

const SAFE_HREF = /^(https?:\/\/[^\s]+|mailto:[^\s]+|\/(?!\/)[^\s]*|#[^\s]*)$/i;

export function parseInline(text: string): Inline[] {
  const out: Inline[] = [];
  const pattern = /\*\*([^*\n]+)\*\*|\[([^\]\n]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    if (match.index > last) out.push({ type: 'text', text: text.slice(last, match.index) });
    if (match[1] !== undefined) out.push({ type: 'strong', text: match[1] });
    else if (SAFE_HREF.test(match[3])) out.push({ type: 'link', text: match[2], href: match[3] });
    else out.push({ type: 'text', text: match[2] });
    last = match.index + match[0].length;
  }
  if (last < text.length) out.push({ type: 'text', text: text.slice(last) });
  return out;
}

export function parseBody(body: string): Block[] {
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];
  const flushParagraph = () => { if (paragraph.length) { blocks.push({ type: 'paragraph', inline: parseInline(paragraph.join(' ')) }); paragraph = []; } };
  const flushList = () => { if (list.length) { blocks.push({ type: 'list', items: list.map(parseInline) }); list = []; } };
  for (const raw of body.replace(/\r\n?/g, '\n').split('\n')) {
    const line = raw.trim();
    if (!line) { flushParagraph(); flushList(); continue; }
    const heading = /^(#{1,3})\s+(.+)$/.exec(line);
    if (heading) { flushParagraph(); flushList(); blocks.push({ type: 'heading', level: heading[1].length >= 3 ? 3 : 2, inline: parseInline(heading[2]) }); continue; }
    const item = /^[-*]\s+(.+)$/.exec(line);
    if (item) { flushParagraph(); list.push(item[1]); continue; }
    const quote = /^>\s?(.*)$/.exec(line);
    if (quote) { flushParagraph(); flushList(); blocks.push({ type: 'quote', inline: parseInline(quote[1]) }); continue; }
    flushList();
    paragraph.push(line);
  }
  flushParagraph();
  flushList();
  return blocks;
}
