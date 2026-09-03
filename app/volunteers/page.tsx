import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageIntro from '../components/PageIntro';
import { volunteerWays } from '../content';

export const metadata: Metadata = {
  title: 'Volunteer With Us | Dr. Joseph Helping Children Community',
  description: 'Volunteer your time and skills with children and communities in Cambodia.',
};

const steps = [
  ['01', 'Start a conversation', 'Tell us about your experience, interests, preferred dates, and how long you hope to stay.'],
  ['02', 'Plan together', 'Our local team will discuss current needs and agree on a useful, realistic role with you.'],
  ['03', 'Prepare your visit', 'We will help with practical information, local expectations, and accommodation planning.'],
  ['04', 'Serve with support', 'You will meet the team, receive local guidance, and adapt your contribution as you learn.'],
];

const faqs = [
  ['Do I need special qualifications?', 'Not always. Some activities benefit from teaching or professional experience, while others need patience, creativity, practical help, and a willingness to listen.'],
  ['Where can volunteers stay?', 'A local family stay may be available. The suggested contribution is $10 per day, paid directly to the host family to help cover accommodation and daily support.'],
  ['How long should I volunteer?', 'Contact us with your available dates. We will be honest about what is practical and whether your proposed time can create a useful experience for everyone.'],
  ['Can I fundraise without travelling?', 'Yes. You can invite friends, family, or your community to support a project even if you cannot visit Cambodia.'],
];

export default function VolunteersPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Volunteer"
        title="Bring your skills. Share your heart."
        description="A meaningful visit starts with listening. We match your time and abilities with current community needs, then support you through the experience."
      />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="overflow-hidden rounded-[32px] bg-[#201a15] text-white sm:rounded-[42px]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[380px] sm:min-h-[520px] lg:min-h-[650px]">
              <Image src="/images/children-2.jpg" alt="Children and community members welcoming visitors" fill priority sizes="(min-width: 1024px) 53vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#201a15]/60 via-transparent to-transparent" />
              <p className="absolute bottom-6 left-6 right-6 max-w-xl text-xl font-extrabold leading-snug sm:bottom-10 sm:left-10 sm:text-2xl">The most useful volunteers arrive ready to listen, learn, and work alongside local people.</p>
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#ff8b62]">Ways to contribute</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Find the place where you can help.</h2>
              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {volunteerWays.map(([emoji, label]) => (
                  <div key={label} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm leading-relaxed text-stone-200">
                    <span aria-hidden="true" className="text-lg">{emoji}</span>
                    <span className="font-semibold">{label}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="mt-8 rounded-2xl bg-[#f26b3a] px-7 py-4 text-center font-extrabold text-white transition hover:bg-[#df5524]">Ask about volunteering</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-orange-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#e05a29]">How it works</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">A clear path from interest to arrival.</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map(([number, title, text]) => (
              <article key={number} className="rounded-3xl border border-orange-100 bg-[#fffaf4] p-6">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#f26b3a] text-xs font-extrabold text-white">{number}</span>
                <h3 className="mt-5 text-xl font-extrabold">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-[30px] bg-[#fff1e9] p-7 sm:p-10">
            <span className="text-3xl" aria-hidden="true">🏡</span>
            <p className="mt-6 text-sm font-extrabold uppercase tracking-[0.14em] text-[#e05a29]">Accommodation</p>
            <h2 className="mt-2 text-3xl font-extrabold">Stay with a local family.</h2>
            <p className="mt-4 leading-relaxed text-stone-600">Experience local Cambodian life during your stay. The suggested contribution is <strong className="text-stone-800">$10 per day</strong>, paid directly to your host family to help cover accommodation and daily support.</p>
          </article>
          <article className="rounded-[30px] bg-[#eaf0dc] p-7 sm:p-10">
            <span className="text-3xl" aria-hidden="true">🤲</span>
            <p className="mt-6 text-sm font-extrabold uppercase tracking-[0.14em] text-[#62723e]">From anywhere</p>
            <h2 className="mt-2 text-3xl font-extrabold">Fundraise with your community.</h2>
            <p className="mt-4 leading-relaxed text-stone-600">Invite friends, family, and your personal network to support a project. You do not need to travel, be wealthy, or have special skills to make a thoughtful contribution.</p>
          </article>
        </div>
      </section>

      <section className="border-y border-orange-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#e05a29]">Before you decide</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Common questions.</h2>
            <p className="mt-4 leading-relaxed text-stone-600">Every visit is different. If your question is not here, speak directly with our local team.</p>
          </div>
          <div className="space-y-3">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group rounded-2xl border border-orange-100 bg-[#fffaf4] px-5 py-4 sm:px-6 sm:py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-extrabold marker:hidden">{question}<span className="text-2xl text-[#f26b3a] transition group-open:rotate-45">+</span></summary>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone-600">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#e05a29]">Start with a hello</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">Tell us what you can share.</h2>
        <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-stone-600">Send your dates, interests, skills, and questions. We will talk honestly about where your time can be most useful.</p>
        <Link href="/contact" className="mt-8 block w-full rounded-2xl bg-[#f26b3a] px-8 py-4 font-extrabold text-white transition hover:bg-[#df5524] sm:inline-block sm:w-auto">Contact us to volunteer</Link>
      </section>
    </main>
  );
}
