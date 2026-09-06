import { parseBody, type Inline } from '../lib/post-body';

function InlineText({ parts }: { parts: Inline[] }) {
  return <>{parts.map((part, index) => {
    if (part.type === 'strong') return <strong key={index} className="font-extrabold text-stone-900">{part.text}</strong>;
    if (part.type === 'link') {
      const external = /^https?:/i.test(part.href);
      return <a key={index} href={part.href} className="font-bold text-[#d95121] underline decoration-orange-200 underline-offset-4 transition hover:decoration-[#d95121]" {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{part.text}</a>;
    }
    return <span key={index}>{part.text}</span>;
  })}</>;
}

export default function PostBody({ body }: { body: string }) {
  const blocks = parseBody(body);
  return <div className="space-y-6 text-lg leading-relaxed text-stone-700">
    {blocks.map((block, index) => {
      switch (block.type) {
        case 'heading':
          return block.level === 2
            ? <h2 key={index} className="pt-4 text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl"><InlineText parts={block.inline} /></h2>
            : <h3 key={index} className="pt-2 text-xl font-extrabold text-stone-900 sm:text-2xl"><InlineText parts={block.inline} /></h3>;
        case 'list':
          return <ul key={index} className="space-y-2 pl-1">{block.items.map((item, itemIndex) => <li key={itemIndex} className="flex gap-3"><span aria-hidden="true" className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[#f26b3a]" /><span><InlineText parts={item} /></span></li>)}</ul>;
        case 'quote':
          return <blockquote key={index} className="border-l-4 border-[#f26b3a] pl-5 text-xl font-extrabold leading-relaxed text-stone-800"><InlineText parts={block.inline} /></blockquote>;
        default:
          return <p key={index}><InlineText parts={block.inline} /></p>;
      }
    })}
  </div>;
}
