import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { volunteerWays } from '../content';

export const metadata: Metadata = {
  title: 'Volunteers | Dr. Joseph Helping Children Community',
  description: 'Volunteer your time and skills with children and communities in Cambodia.',
};

export default function VolunteersPage() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-5 sm:py-16">
        <div className="overflow-hidden rounded-3xl bg-[#201a15] text-white sm:rounded-[36px]">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[280px] sm:min-h-[340px] lg:min-h-[540px]">
              <Image
                src="/images/children-2.jpg"
                alt="Children and community members welcoming volunteers"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#201a15]/75 via-transparent to-transparent" />
              <p className="absolute bottom-6 left-6 right-6 text-lg font-bold leading-snug sm:bottom-10 sm:left-10 sm:right-10 sm:text-xl">
                The children may remember your kindness for many years to come.
              </p>
            </div>

            <div className="p-6 sm:p-12">
              <p className="text-sm font-bold uppercase tracking-wider text-[#f26b3a]">Volunteers</p>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">Be part of something meaningful</h1>
              <p className="mt-5 leading-relaxed text-stone-300">
                We welcome volunteers from around the world to share their time,
                skills, kindness, and friendship with children and communities in Cambodia.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {volunteerWays.map(([emoji, label]) => (
                  <div key={label} className="flex items-start gap-3 rounded-2xl bg-white/[0.07] p-4 text-sm leading-relaxed text-stone-200">
                    <span aria-hidden="true" className="text-lg">{emoji}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-orange-100 bg-white">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-12 sm:gap-6 sm:px-5 sm:py-14 md:grid-cols-2">
          <article className="rounded-3xl bg-[#fdf8f3] p-6 sm:p-8">
            <span className="text-3xl" aria-hidden="true">🏡</span>
            <h2 className="mt-5 text-2xl font-bold">Stay with a local family</h2>
            <p className="mt-3 leading-relaxed text-stone-600">
              Experience local Cambodian life during your stay. The suggested
              contribution is <strong className="text-stone-800">$10 per day</strong>,
              paid directly to your host family to help cover accommodation and daily support.
            </p>
          </article>
          <article className="rounded-3xl bg-orange-50 p-6 sm:p-8">
            <span className="text-3xl" aria-hidden="true">🤲</span>
            <h2 className="mt-5 text-2xl font-bold">Fundraise with your community</h2>
            <p className="mt-3 leading-relaxed text-stone-600">
              Invite friends, family, and your personal network to support our
              projects. You do not need to be rich or have special skills to make a difference.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-5 sm:py-20">
        <p className="text-sm font-bold uppercase tracking-wider text-[#f26b3a]">Come and share your heart</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Volunteer your time. Share your skills. Make a difference.</h2>
        <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-stone-600">Your time, kindness, and encouragement can become a beautiful memory in a child&apos;s life.</p>
        <Link href="/contact" className="mt-8 block w-full rounded-2xl bg-[#f26b3a] px-8 py-4 font-bold text-white transition hover:bg-[#e05a29] sm:inline-block sm:w-auto">Contact us to volunteer</Link>
      </section>
    </main>
  );
}
