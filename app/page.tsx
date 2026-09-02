import Image from 'next/image';
import Link from 'next/link';
import { projects, stats } from './content';

export default function Home() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-5 sm:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="order-2 lg:order-1">
            <p className="mb-4 inline-block rounded-full bg-orange-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#e05a29]">
              Serving children and communities in Cambodia
            </p>
            <h1 className="text-[2.1rem] font-extrabold leading-[1.08] tracking-tight sm:text-6xl">
              Helping children. Building hope.{' '}
              <span className="text-[#f26b3a]">Changing lives.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-stone-600 sm:mt-6 sm:text-lg">
              We support children and communities in need through education,
              food, care, and meaningful opportunities for a better future.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/projects" className="w-full rounded-2xl bg-[#f26b3a] px-7 py-3.5 text-center font-bold text-white transition hover:bg-[#e05a29] sm:w-auto">
                Explore our projects
              </Link>
              <Link href="/about" className="w-full rounded-2xl border-2 border-stone-300 px-7 py-3.5 text-center font-bold text-stone-700 transition hover:border-[#f26b3a] hover:text-[#f26b3a] sm:w-auto">
                Read our story
              </Link>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <Image
              src="/images/hero.jpg"
              alt="Our team with elderly community members receiving support"
              width={1280}
              height={960}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl sm:rounded-[32px]"
            />
            <div className="absolute -bottom-5 right-4 rounded-2xl bg-white px-5 py-4 shadow-lg sm:right-8">
              <p className="text-xs font-semibold text-stone-500">Our belief</p>
              <p className="text-sm font-extrabold text-[#f26b3a]">Every child deserves hope</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-orange-100 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-9 sm:px-5 sm:py-10 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-extrabold tracking-tight text-[#f26b3a] sm:text-4xl">{stat.value}</p>
              <p className="mt-1.5 text-sm font-medium text-stone-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#f26b3a]">Where would you like to go?</p>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Choose a section</h2>
          </div>
          <Link href="/projects" className="font-bold text-[#e05a29] hover:underline">View all projects →</Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {[
            ['01', 'About Us', 'Our history, team, mission, vision, and values.', '/about'],
            ['02', 'Projects', 'See how we support children, families, and elders.', '/projects'],
            ['03', 'Volunteers', 'Share your time, skills, kindness, and friendship.', '/volunteers'],
            ['04', 'Contact Us', 'Talk with our team or support the community.', '/contact'],
          ].map(([number, title, text, href]) => (
            <Link key={href} href={href} className="group rounded-2xl border border-orange-100 bg-white p-5 transition hover:-translate-y-1 hover:border-[#f26b3a] hover:shadow-lg sm:rounded-3xl sm:p-6">
              <span className="text-sm font-extrabold text-[#f26b3a]">{number}</span>
              <h3 className="mt-3 text-xl font-bold group-hover:text-[#e05a29] sm:mt-6">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{text}</p>
              <span className="mt-4 inline-block font-bold text-[#f26b3a] sm:mt-6">Open →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-orange-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#f26b3a]">Our work</p>
              <h2 className="text-3xl font-extrabold tracking-tight">Four projects, one shared purpose</h2>
              <p className="mt-4 leading-relaxed text-stone-600">Practical support that helps people meet today&apos;s needs and build a stronger future.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {projects.map((project) => (
                <Link key={project.number} href={`/projects#project-${project.number}`} className="flex flex-col items-start gap-3 rounded-2xl bg-[#fdf8f3] p-4 transition hover:bg-orange-50 sm:flex-row sm:items-center sm:gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-orange-100 text-sm font-extrabold text-[#f26b3a]">{project.number}</span>
                  <span className="text-sm font-bold leading-snug sm:text-base">{project.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-20">
        <div className="rounded-3xl bg-[#201a15] p-6 text-white sm:rounded-[32px] sm:p-12">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-wider text-[#f26b3a]">Join the journey</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight">Come and share your heart</h2>
              <p className="mt-4 leading-relaxed text-stone-300">Volunteer your time. Share your skills. Create memories. Make a difference.</p>
            </div>
            <Link href="/volunteers" className="w-full rounded-2xl bg-[#f26b3a] px-7 py-3.5 text-center font-bold text-white transition hover:bg-[#e05a29] sm:w-auto">Become a volunteer</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
