import { getSiteContent } from '@/app/lib/cms/content';
import type { Metadata } from 'next';
import DonateWidget from '../components/DonateWidget';
import PageIntro from '../components/PageIntro';

export const metadata: Metadata = {
  title: 'Contact Us | Dr. Joseph Helping Children Community',
  description: 'Contact our Cambodian community team, volunteer, or support our work.',
};



export default function ContactPage() {
  const { copy, contactfaqs: faqs } = getSiteContent();

  return (
    <main>
      <PageIntro
        eyebrow={copy["contact"]["001 eyebrow: Contact Us"]}
        title={copy["contact"]["002 title: Talk directly with our local team."]}
        description={copy["contact"]["003 description: Ask a question, arrange a visit, explore volu"]}
      />

      <section id="contact" className="mx-auto grid max-w-7xl scroll-mt-24 gap-10 px-4 py-12 sm:scroll-mt-36 sm:px-6 sm:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <div className="space-y-4">
            <a href={copy["contact"]["004 href: https://t.me/Lemongrassoils"]} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl border border-orange-100 bg-white p-5 transition hover:border-[#f26b3a]">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-orange-100 text-2xl">✈️</span>
              <span><strong className="block">{copy["contact"]["005 Telegram"]}</strong><span className="text-sm text-stone-500">{copy["contact"]["006 @Lemongrassoils"]}</span></span>
            </a>
            <a href={copy["contact"]["007 href: mailto:aloudoil@gmail.com"]} className="flex items-center gap-4 rounded-2xl border border-orange-100 bg-white p-5 transition hover:border-[#f26b3a]">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-orange-100 text-2xl">✉️</span>
              <span><strong className="block">{copy["contact"]["008 Email"]}</strong><span className="text-sm text-stone-500">{copy["contact"]["009 aloudoil@gmail.com"]}</span></span>
            </a>
            <div className="flex items-center gap-4 rounded-2xl border border-orange-100 bg-white p-5">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-orange-100 text-2xl">🇰🇭</span>
              <span><strong className="block">{copy["contact"]["010 Location"]}</strong><span className="text-sm text-stone-500">{copy["contact"]["011 Cambodia"]}</span></span>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold">{copy["contact"]["012 Common questions"]}</h2>
            <div className="mt-4 space-y-3">
              {faqs.map(([question, answer]) => (
                <details key={question} className="group rounded-2xl border border-orange-100 bg-white px-5 py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold marker:hidden">{question}<span className="text-xl text-[#f26b3a] transition group-open:rotate-45">+</span></summary>
                  <p className="mt-3 text-sm leading-relaxed text-stone-600">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        <div id="donate" className="scroll-mt-36">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#f26b3a]">{copy["contact"]["013 Donate"]}</p>
          <h2 className="mb-6 text-3xl font-extrabold tracking-tight">{copy["contact"]["014 Your support is powerful"]}</h2>
          <DonateWidget />
        </div>
      </section>
    </main>
  );
}
