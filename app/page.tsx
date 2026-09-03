import Image from 'next/image';
import Link from 'next/link';
import ProjectVisual from './components/ProjectVisual';
import { impactUpdates, projects, stats, team } from './content';

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden bg-[#fffaf4]">
        <div aria-hidden="true" className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-orange-200/35 blur-3xl" />
        <div aria-hidden="true" className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-amber-100/70 blur-3xl" />
        <div className="relative mx-auto grid min-h-[calc(100vh-108px)] max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:px-8 lg:py-20">
          <div className="order-2 lg:order-1">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#d95121] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#f26b3a]" />
              Cambodia · Community-led care
            </div>
            <h1 className="max-w-3xl text-[2.55rem] font-extrabold leading-[1.03] tracking-[-0.04em] sm:text-6xl lg:text-[4.25rem]">
              Helping children.
              <span className="block text-[#f26b3a]">Building hope.</span>
              <span className="block">Changing lives.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone-600 sm:text-lg">
              We work alongside Cambodian children, families, and elders with practical support that meets today&apos;s needs and creates stronger possibilities for tomorrow.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/contact#donate" className="rounded-2xl bg-[#f26b3a] px-7 py-4 text-center font-bold text-white shadow-[0_14px_30px_rgb(242_107_58/24%)] transition hover:-translate-y-0.5 hover:bg-[#df5524]">
                Make a difference
              </Link>
              <Link href="/projects" className="rounded-2xl border-2 border-stone-300 bg-white px-7 py-4 text-center font-bold text-stone-700 transition hover:border-[#f26b3a] hover:text-[#d95121]">
                Explore our projects
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-stone-500">
              <div className="flex -space-x-2" aria-hidden="true">
                {['DJ', 'ST', 'YY'].map((initials, index) => (
                  <span key={initials} className={`grid h-9 w-9 place-items-center rounded-full border-2 border-[#fffaf4] text-[0.58rem] font-extrabold text-white ${index === 0 ? 'bg-[#f26b3a]' : index === 1 ? 'bg-[#201a15]' : 'bg-[#7c8b56]'}`}>{initials}</span>
                ))}
              </div>
              <span>Local leadership. Direct community relationships.</span>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="relative min-h-[360px] overflow-hidden rounded-[30px] bg-stone-200 shadow-[0_30px_80px_rgb(64_38_23/18%)] sm:min-h-[540px] lg:min-h-[650px] lg:rounded-[42px]">
              <Image
                src="/images/children-2.jpg"
                alt="Children and members of the community team together in Cambodia"
                fill
                priority
                sizes="(min-width: 1024px) 54vw, 100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#201a15]/55 via-transparent to-transparent" />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/20 bg-[#201a15]/80 p-4 text-white backdrop-blur-md sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-sm sm:p-5">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-orange-200">Our belief</p>
                <p className="mt-2 text-lg font-extrabold leading-snug">Every child deserves care, education, and the freedom to hope.</p>
              </div>
            </div>
            <div className="absolute -right-2 top-6 rounded-2xl bg-white px-4 py-3 shadow-xl sm:-right-5 sm:top-12 sm:px-5">
              <p className="text-2xl font-extrabold text-[#f26b3a]">79</p>
              <p className="text-xs font-bold text-stone-500">children in daily care</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Our impact at a glance" className="border-y border-orange-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-orange-100 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white px-4 py-7 text-center sm:px-6 sm:py-9">
              <p className="text-3xl font-extrabold tracking-tight text-[#f26b3a] sm:text-4xl">{stat.value}</p>
              <p className="mx-auto mt-2 max-w-[13rem] text-xs font-semibold leading-relaxed text-stone-500 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#e05a29]">What we do</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">Four projects. One shared purpose.</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-stone-600">Practical, locally led support for people at different stages of life.</p>
          </div>
          <Link href="/projects" className="w-fit font-extrabold text-[#d95121] transition hover:translate-x-1">View every project →</Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="group overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-[0_16px_50px_rgb(91_60_37/6%)] transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_22px_60px_rgb(91_60_37/12%)]">
              <div className="relative aspect-[4/3] overflow-hidden bg-orange-50">
                <ProjectVisual project={project} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="transition duration-500 group-hover:scale-105" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-extrabold text-[#d95121] shadow-sm backdrop-blur">{project.number}</span>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-xl font-extrabold leading-snug transition group-hover:text-[#d95121]">{project.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{project.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#d95121]">Learn more <span aria-hidden="true">→</span></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="overflow-hidden border-y border-orange-100 bg-white">
        <div className="mx-auto grid max-w-7xl items-center lg:grid-cols-2">
          <div className="relative min-h-[380px] lg:min-h-[650px]">
            <Image src="/images/children-1.jpg" alt="Children and community members outside the center" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#201a15]/35 to-transparent" />
          </div>
          <div className="px-4 py-14 sm:px-10 sm:py-20 lg:px-16">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#e05a29]">Our story</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">A small beginning that kept growing.</h2>
            <p className="mt-6 leading-relaxed text-stone-600">
              In 2010, Samnang began personally supporting 45 children in Takeo Province. Dr. Joseph later joined that work with generosity and compassion. Today, many of those children are university students and graduates—and the community continues to care for a new generation.
            </p>
            <blockquote className="mt-7 border-l-4 border-[#f26b3a] pl-5 text-xl font-extrabold leading-relaxed text-stone-800">
              “Real change grows through trust, consistency, and people caring for one another.”
            </blockquote>
            <div className="mt-8 grid grid-cols-3 overflow-hidden rounded-2xl border border-orange-100 text-center">
              {[['2010', 'The journey begins'], ['45', 'Children first supported'], ['2024', 'Community named']].map(([value, label], index) => (
                <div key={value} className={`p-4 ${index > 0 ? 'border-l border-orange-100' : ''}`}>
                  <p className="font-extrabold text-[#f26b3a] sm:text-xl">{value}</p>
                  <p className="mt-1 text-[0.62rem] font-semibold leading-snug text-stone-500 sm:text-xs">{label}</p>
                </div>
              ))}
            </div>
            <Link href="/about" className="mt-8 inline-flex rounded-2xl bg-[#201a15] px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#342b24]">Read our full story</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#e05a29]">Impact &amp; updates</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">The work, seen up close.</h2>
          <p className="mt-4 leading-relaxed text-stone-600">A clear view of where support goes and the people it is designed to serve.</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <Link href={`/impact#${impactUpdates[0].id}`} className="group relative min-h-[500px] overflow-hidden rounded-[30px] bg-stone-800 sm:min-h-[560px]">
            <Image src={impactUpdates[0].image} alt={impactUpdates[0].imageAlt} fill sizes="(min-width: 1024px) 62vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#201a15] via-[#201a15]/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-9">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-orange-200">{impactUpdates[0].category}</p>
              <h3 className="mt-3 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">{impactUpdates[0].title}</h3>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-200 sm:text-base">{impactUpdates[0].excerpt}</p>
              <span className="mt-5 inline-block font-bold">Read the update →</span>
            </div>
          </Link>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {impactUpdates.slice(1).map((update) => (
              <Link key={update.id} href={`/impact#${update.id}`} className="group grid min-h-[260px] overflow-hidden rounded-[28px] border border-orange-100 bg-white sm:min-h-[280px] lg:grid-cols-[0.85fr_1.15fr]">
                <div className="relative min-h-[190px] overflow-hidden lg:min-h-full">
                  <Image src={update.image} alt={update.imageAlt} fill sizes="(min-width: 1024px) 18vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5 sm:p-6">
                  <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-[#e05a29]">{update.category}</p>
                  <h3 className="mt-2 text-xl font-extrabold leading-snug group-hover:text-[#d95121]">{update.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-600">{update.excerpt}</p>
                  <span className="mt-4 inline-block text-sm font-bold text-[#d95121]">Read more →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#201a15] text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#ff8b62]">Clear and responsible</p>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">From your gift to practical help.</h2>
              <p className="mt-5 leading-relaxed text-stone-300">We keep the path simple, personal, and connected to needs identified by the community.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ['01', 'Listen locally', 'Our team stays close to children, families, and elders to understand what is needed.'],
                ['02', 'Act practically', 'Support becomes meals, school essentials, livelihood help, or food for elders.'],
                ['03', 'Follow through', 'We confirm gifts and share receipts, photos, and updates directly with supporters.'],
              ].map(([number, title, text]) => (
                <article key={number} className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#f26b3a] text-xs font-extrabold">{number}</span>
                  <h3 className="mt-5 text-lg font-extrabold">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-400">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-orange-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#e05a29]">People behind the work</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">Local care. Shared responsibility.</h2>
              <p className="mt-5 leading-relaxed text-stone-600">Leadership, administration, technology, fundraising, and daily care come together to keep every project personal and responsible.</p>
              <Link href="/about#who-we-are" className="mt-7 inline-flex font-extrabold text-[#d95121] transition hover:translate-x-1">Meet the full team →</Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {team.slice(0, 3).map((member) => (
                <article key={member.name} className="rounded-3xl border border-orange-100 bg-[#fffaf4] p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#f26b3a] text-xs font-extrabold text-white">{member.initials}</span>
                  <h3 className="mt-5 font-extrabold">{member.name}</h3>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-[#d95121]">{member.role}</p>
                  <p className="mt-4 text-sm leading-relaxed text-stone-600">{member.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] bg-[#f26b3a] text-white sm:rounded-[42px]">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative min-h-[360px] lg:min-h-[520px]">
              <Image src="/images/children-2.jpg" alt="Children welcoming visitors to their community" fill sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#7f2608]/35 to-transparent" />
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-14">
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-orange-100">Volunteer with us</p>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">Bring your skills. Share your heart.</h2>
              <p className="mt-5 max-w-xl leading-relaxed text-orange-50">Teach, create, grow, encourage, or help in a way that fits your experience. Our team will guide you before and during your visit.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/volunteers" className="rounded-2xl bg-white px-6 py-3.5 text-center font-extrabold text-[#d95121] transition hover:-translate-y-0.5">See how volunteering works</Link>
                <Link href="/contact" className="rounded-2xl border border-white/50 px-6 py-3.5 text-center font-extrabold text-white transition hover:bg-white/10">Talk with our team</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fff1e9]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 py-14 sm:px-6 sm:py-16 lg:flex-row lg:items-center lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#e05a29]">Ready to help?</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">One conversation can be the beginning of something meaningful.</h2>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href="/contact#donate" className="rounded-2xl bg-[#f26b3a] px-7 py-4 text-center font-extrabold text-white transition hover:bg-[#df5524]">Donate now</Link>
            <Link href="/contact" className="rounded-2xl border-2 border-orange-200 bg-white px-7 py-4 text-center font-extrabold text-stone-700 transition hover:border-[#f26b3a]">Contact us</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
