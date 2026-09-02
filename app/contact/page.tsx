import type { Metadata } from 'next';
import DonateWidget from '../components/DonateWidget';

export const metadata: Metadata = {
  title: 'Contact Us | Dr. Joseph Helping Children Community',
  description: 'Contact our Cambodian community team, volunteer, or support our work.',
};

const faqs = [
  ['How can I donate?', 'Message us on Telegram or email. We will send our KHQR code or bank details, confirm when your gift arrives, and follow up with a receipt and photos.'],
  ['Can I give supplies instead of money?', 'Yes. Rice, school supplies, uniforms, and books are always helpful. Please contact us first so we can share what is most needed.'],
  ['Can I visit or volunteer?', 'Yes. Contact us on Telegram or email and our team will help arrange your visit and discuss how your skills can help.'],
];

export default function ContactPage() {
  return (
    <main>
      <section className="border-b border-orange-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-5 sm:py-16">
          <p className="text-sm font-bold uppercase tracking-wider text-[#f26b3a]">Contact Us</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">Talk directly with our team</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-stone-600">Ask a question, arrange a visit, volunteer, or support one of our projects.</p>
        </div>
      </section>

      <section id="contact" className="mx-auto grid max-w-6xl scroll-mt-24 gap-10 px-4 py-12 sm:scroll-mt-36 sm:px-5 sm:py-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <div className="space-y-4">
            <a href="https://t.me/Lemongrassoils" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl border border-orange-100 bg-white p-5 transition hover:border-[#f26b3a]">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-orange-100 text-2xl">✈️</span>
              <span><strong className="block">Telegram</strong><span className="text-sm text-stone-500">@Lemongrassoils</span></span>
            </a>
            <a href="mailto:aloudoil@gmail.com" className="flex items-center gap-4 rounded-2xl border border-orange-100 bg-white p-5 transition hover:border-[#f26b3a]">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-orange-100 text-2xl">✉️</span>
              <span><strong className="block">Email</strong><span className="text-sm text-stone-500">aloudoil@gmail.com</span></span>
            </a>
            <div className="flex items-center gap-4 rounded-2xl border border-orange-100 bg-white p-5">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-orange-100 text-2xl">🇰🇭</span>
              <span><strong className="block">Location</strong><span className="text-sm text-stone-500">Cambodia</span></span>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold">Common questions</h2>
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
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#f26b3a]">Donate</p>
          <h2 className="mb-6 text-3xl font-extrabold tracking-tight">Your support is powerful</h2>
          <DonateWidget />
        </div>
      </section>
    </main>
  );
}
