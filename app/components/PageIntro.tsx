import Link from 'next/link';

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function PageIntro({
  eyebrow,
  title,
  description,
}: PageIntroProps) {
  return (
    <section className="relative overflow-hidden border-b border-orange-100 bg-white">
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-100/55 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-stone-400">
          <Link href="/" className="transition hover:text-[#e05a29]">Home</Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#e05a29]">{eyebrow}</span>
        </nav>
        <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#e05a29]">{eyebrow}</p>
        <h1 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-stone-600 sm:text-lg">{description}</p>
      </div>
    </section>
  );
}
