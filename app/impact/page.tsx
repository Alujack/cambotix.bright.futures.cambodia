import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageIntro from '../components/PageIntro';
import { impactUpdates, stats } from '../content';

export const metadata: Metadata = {
  title: 'Impact & Updates | Dr. Joseph Helping Children Community',
  description: 'See how community-led support reaches children, families, and elderly people in Cambodia.',
};

export default function ImpactPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Impact & Updates"
        title="See the work through the people it serves."
        description="We share clear, respectful updates about the practical support reaching children, families, and elders in our community."
      />

      <section aria-label="Impact statistics" className="border-b border-orange-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-orange-100 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white px-4 py-7 text-center sm:px-6 sm:py-9">
              <p className="text-3xl font-extrabold text-[#f26b3a] sm:text-4xl">{stat.value}</p>
              <p className="mt-2 text-xs font-semibold leading-relaxed text-stone-500 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="space-y-8">
          {impactUpdates.map((update, index) => (
            <article id={update.id} key={update.id} className="scroll-mt-36 overflow-hidden rounded-[30px] border border-orange-100 bg-white shadow-[0_18px_55px_rgb(91_60_37/6%)]">
              <div className="grid lg:grid-cols-2">
                <div className={`relative min-h-[330px] sm:min-h-[460px] ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <Image src={update.image} alt={update.imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#201a15]/25 to-transparent" />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#e05a29]">{update.category}</p>
                  <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">{update.title}</h2>
                  <p className="mt-5 text-lg leading-relaxed text-stone-600">{update.excerpt}</p>
                  <p className="mt-6 w-fit rounded-2xl bg-orange-50 px-4 py-2 text-sm font-extrabold text-[#d95121]">{update.metric}</p>
                  <div className="mt-8 border-t border-orange-100 pt-6">
                    <p className="text-sm leading-relaxed text-stone-500">
                      Our team works directly with the community and shares follow-up with supporters. Contact us if you would like the latest information about this area of work.
                    </p>
                    <Link href="/contact" className="mt-4 inline-flex font-extrabold text-[#d95121]">Ask for the latest update →</Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#fff1e9]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#e05a29]">Our commitment</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Respect before publicity.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ['Dignity', 'We share stories to show the work, never to reduce a person to their hardship.'],
              ['Clarity', 'We distinguish current facts, program goals, and future plans.'],
              ['Connection', 'Supporters can speak directly with our local team and request follow-up.'],
            ].map(([title, text]) => (
              <article key={title} className="rounded-3xl bg-white p-6">
                <h3 className="font-extrabold text-[#d95121]">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
