import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProjectVisual from '../../components/ProjectVisual';
import { projects } from '../../content';

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) return {};

  return {
    title: `${project.title} | Dr. Joseph Helping Children Community`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.image ? [{ url: project.image, alt: project.imageAlt }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: project.image ? [project.image] : [],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  const relatedProjects = projects.filter((item) => item.slug !== project.slug).slice(0, 3);

  return (
    <main>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-stone-400">
          <Link href="/" className="transition hover:text-[#d95121]">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/projects" className="transition hover:text-[#d95121]">Projects</Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#d95121]">{project.shortTitle}</span>
        </nav>

        <div className="overflow-hidden rounded-[32px] bg-[#201a15] text-white sm:rounded-[42px]">
          <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
            <div className="relative min-h-[380px] sm:min-h-[520px] lg:min-h-[650px]">
              <ProjectVisual project={project} priority sizes="(min-width: 1024px) 54vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#201a15]/35 via-transparent to-transparent" />
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-14">
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#ff8b62]">Project {project.number}</p>
              <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{project.title}</h1>
              <p className="mt-6 leading-relaxed text-stone-300">{project.description}</p>
              <p className="mt-7 w-fit rounded-2xl bg-white/10 px-5 py-3 text-sm font-extrabold text-orange-100">{project.highlight}</p>
              <Link href="/contact#donate" className="mt-8 w-full rounded-2xl bg-[#f26b3a] px-7 py-4 text-center font-extrabold text-white transition hover:bg-[#df5524] sm:w-fit">Support this project</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1fr_0.72fr] lg:px-8">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#e05a29]">How it helps</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Support designed around real daily needs.</h2>
          <p className="mt-6 text-lg leading-relaxed text-stone-600">{project.introduction}</p>
          <h3 className="mt-10 text-2xl font-extrabold">What we provide</h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {project.whatWeProvide.map((item) => (
              <li key={item} className="flex gap-3 rounded-2xl border border-orange-100 bg-white p-4 text-sm font-semibold leading-relaxed text-stone-700">
                <span aria-hidden="true" className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-orange-100 text-xs font-extrabold text-[#d95121]">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <aside className="h-fit rounded-[28px] bg-[#fff1e9] p-6 sm:p-8 lg:sticky lg:top-40">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#e05a29]">Why it matters</p>
          <p className="mt-4 text-xl font-extrabold leading-relaxed text-stone-800">{project.whyItMatters}</p>
          <div className="mt-7 border-t border-orange-200 pt-6">
            <p className="text-sm font-bold text-stone-600">Want to help?</p>
            <p className="mt-2 text-sm leading-relaxed text-stone-500">Our team can explain current needs, useful supplies, volunteering options, or how to give.</p>
            <Link href="/contact" className="mt-5 inline-flex font-extrabold text-[#d95121]">Talk with our team →</Link>
          </div>
        </aside>
      </section>

      {project.feedingBudget && (
        <section id="feeding-budget" className="scroll-mt-36 border-t border-orange-100 bg-[#fffaf4]">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#e05a29]">Feeding program</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{project.feedingBudget.title}</h2>
              <p className="mt-6 text-xl font-extrabold leading-relaxed text-stone-800">{project.feedingBudget.lead}</p>
              <p className="mt-4 leading-relaxed text-stone-600">{project.feedingBudget.goal}</p>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-start">
              <div>
                <h3 className="text-2xl font-extrabold">{project.feedingBudget.supportHeading}</h3>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {project.feedingBudget.perChild.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-orange-100 bg-white p-5">
                      <p className="text-3xl font-extrabold text-[#d95121]">{item.amount}</p>
                      <p className="mt-1 text-sm font-semibold text-stone-600">{item.label}</p>
                    </div>
                  ))}
                </div>
                <ul className="mt-4 divide-y divide-orange-100 rounded-2xl border border-orange-100 bg-white">
                  {project.feedingBudget.forAllChildren.map((item) => (
                    <li key={item.label} className="flex items-baseline justify-between gap-4 px-5 py-3.5">
                      <span className="text-sm font-semibold text-stone-600">{item.label}</span>
                      <span className="text-lg font-extrabold text-stone-900">{item.amount}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="mt-10 text-2xl font-extrabold">{project.feedingBudget.additionalHeading}</h3>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {project.feedingBudget.additionalCosts.map((item) => (
                    <li key={item.label} className="flex items-center gap-4 rounded-2xl border border-orange-100 bg-white p-4">
                      <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-orange-100 text-xl">{item.emoji}</span>
                      <div>
                        <p className="text-sm font-semibold text-stone-600">{item.label}</p>
                        <p className="text-lg font-extrabold text-stone-900">{item.amount}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <aside className="rounded-[28px] bg-[#201a15] p-6 text-white sm:p-8 lg:sticky lg:top-40">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#ff8b62]">{project.feedingBudget.annualHeading}</p>
                <dl className="mt-5 divide-y divide-white/10">
                  {project.feedingBudget.annualBreakdown.map((item) => (
                    <div key={item.label} className="flex items-baseline justify-between gap-4 py-3">
                      <dt className="text-sm font-semibold text-stone-300">{item.label}</dt>
                      <dd className="text-lg font-extrabold">{item.amount}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-5 rounded-2xl bg-white/10 px-5 py-4">
                  <p className="text-sm font-bold text-orange-100">
                    <span aria-hidden="true">{project.feedingBudget.annualTotal.emoji}</span> {project.feedingBudget.annualTotal.label}
                  </p>
                  <p className="mt-1 text-2xl font-extrabold sm:text-3xl">{project.feedingBudget.annualTotal.amount}</p>
                </div>
                <Link href="/contact#donate" className="mt-6 block rounded-2xl bg-[#f26b3a] px-6 py-3.5 text-center font-extrabold text-white transition hover:bg-[#df5524]">Help feed the children</Link>
              </aside>
            </div>

            <div className="mt-10 space-y-4 rounded-2xl border border-orange-100 bg-white p-6 sm:p-8">
              {project.feedingBudget.notes.map((note) => (
                <p key={note} className="text-sm leading-relaxed text-stone-600 last:text-base last:font-semibold last:text-stone-800">{note}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-orange-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-5">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#e05a29]">Keep exploring</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight">Related projects</h2>
            </div>
            <Link href="/projects" className="hidden font-extrabold text-[#d95121] sm:block">All projects →</Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {relatedProjects.map((related) => (
              <Link key={related.slug} href={`/projects/${related.slug}`} className="group rounded-3xl border border-orange-100 bg-[#fffaf4] p-6 transition hover:-translate-y-1 hover:border-orange-200">
                <p className="text-xs font-extrabold text-[#d95121]">{related.number}</p>
                <h3 className="mt-3 text-xl font-extrabold group-hover:text-[#d95121]">{related.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{related.highlight}</p>
                <span className="mt-5 inline-block text-sm font-bold text-[#d95121]">Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
