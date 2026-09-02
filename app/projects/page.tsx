import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '../content';

export const metadata: Metadata = {
  title: 'Our Projects | Dr. Joseph Helping Children Community',
  description: 'Explore our children, education, family agriculture, and elderly-support projects in Cambodia.',
};

export default function ProjectsPage() {
  return (
    <main>
      <section className="border-b border-orange-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-5 sm:py-16">
          <p className="text-sm font-bold uppercase tracking-wider text-[#f26b3a]">Our Projects</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">Practical support that creates opportunity</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-stone-600">
            Choose a project to learn how we support children, students, families, and elderly people in Cambodia.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-5 sm:py-10">
        <nav aria-label="Project sections" className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
          {projects.map((project) => (
            <a key={project.number} href={`#project-${project.number}`} className="flex flex-col items-start gap-2 rounded-2xl border border-orange-100 bg-white p-3 font-bold transition hover:border-[#f26b3a] hover:text-[#e05a29] sm:flex-row sm:items-center sm:gap-3 sm:p-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-orange-100 text-xs font-extrabold text-[#f26b3a]">{project.number}</span>
              <span className="text-sm leading-snug">{project.title}</span>
            </a>
          ))}
        </nav>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-5 sm:pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article id={`project-${project.number}`} key={project.number} className="scroll-mt-36 overflow-hidden rounded-3xl border border-orange-100 bg-white">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.imageAlt ?? ''}
                  width={1200}
                  height={600}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="aspect-[2/1] w-full object-cover"
                />
              ) : (
                <div className="grid aspect-[2/1] place-items-center bg-[linear-gradient(135deg,#e5edce,#f7f4e9)] text-7xl" aria-hidden="true">{project.emoji}</div>
              )}
              <div className="p-5 sm:p-8">
                <p className="text-sm font-extrabold text-[#f26b3a]">{project.number}</p>
                <h2 className="mt-2 text-2xl font-bold">{project.title}</h2>
                <p className="mt-4 leading-relaxed text-stone-600">{project.description}</p>
                <p className="mt-5 inline-block rounded-xl bg-orange-50 px-4 py-2 text-sm font-bold text-[#e05a29]">{project.highlight}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-orange-100 bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:px-5 sm:py-14 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-[#f26b3a]">Support the work</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight">Help one of these projects continue</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-stone-600">Contact our team to volunteer, donate supplies, fundraise, or make a financial contribution.</p>
          </div>
          <Link href="/contact" className="w-full rounded-2xl bg-[#f26b3a] px-7 py-3.5 text-center font-bold text-white transition hover:bg-[#e05a29] sm:w-auto">Contact our team</Link>
        </div>
      </section>
    </main>
  );
}
