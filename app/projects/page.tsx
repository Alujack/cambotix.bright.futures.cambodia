import type { Metadata } from 'next';
import Link from 'next/link';
import PageIntro from '../components/PageIntro';
import ProjectVisual from '../components/ProjectVisual';
import { projects } from '../content';

export const metadata: Metadata = {
  title: 'Our Projects | Dr. Joseph Helping Children Community',
  description: 'Explore our children, education, family agriculture, and elderly-support projects in Cambodia.',
};

export default function ProjectsPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Our Projects"
        title="Practical support that creates opportunity."
        description="Explore four community-led projects supporting children, students, families, and elderly people in Cambodia."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <nav aria-label="Project sections" className="mb-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {projects.map((project) => (
            <a key={project.slug} href={`#${project.slug}`} className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-white p-3 text-sm font-extrabold transition hover:border-[#f26b3a] hover:text-[#d95121] sm:p-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-orange-100 text-xs text-[#d95121]">{project.number}</span>
              <span>{project.shortTitle}</span>
            </a>
          ))}
        </nav>

        <div className="space-y-7">
          {projects.map((project, index) => (
            <article id={project.slug} key={project.slug} className="scroll-mt-36 overflow-hidden rounded-[30px] border border-orange-100 bg-white shadow-[0_18px_55px_rgb(91_60_37/6%)]">
              <div className="grid lg:grid-cols-2">
                <div className={`relative min-h-[320px] sm:min-h-[440px] ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <ProjectVisual project={project} sizes="(min-width: 1024px) 50vw, 100vw" />
                  <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-extrabold text-[#d95121] shadow-sm backdrop-blur">Project {project.number}</span>
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#e05a29]">{project.highlight}</p>
                  <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">{project.title}</h2>
                  <p className="mt-5 leading-relaxed text-stone-600">{project.description}</p>
                  <p className="mt-4 text-sm leading-relaxed text-stone-500">{project.introduction}</p>
                  <Link href={`/projects/${project.slug}`} className="mt-7 inline-flex w-fit rounded-2xl bg-[#201a15] px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#342b24]">
                    Explore this project
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#201a15] text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#ff8b62]">Support the work</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Help one of these projects continue.</h2>
            <p className="mt-3 leading-relaxed text-stone-300">Volunteer, donate supplies, fundraise, or make a financial contribution.</p>
          </div>
          <Link href="/contact" className="w-full rounded-2xl bg-[#f26b3a] px-7 py-4 text-center font-extrabold text-white transition hover:bg-[#df5524] sm:w-auto">Contact our team</Link>
        </div>
      </section>
    </main>
  );
}
