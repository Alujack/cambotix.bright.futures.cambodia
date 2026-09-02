import type { Metadata } from 'next';
import AboutTabs from '../components/AboutTabs';

export const metadata: Metadata = {
  title: 'About Us | Dr. Joseph Helping Children Community',
  description: 'Our history, team, mission, vision, and values.',
};

export default function AboutPage() {
  return (
    <main>
      <section className="border-b border-orange-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-5 sm:py-16">
          <p className="text-sm font-bold uppercase tracking-wider text-[#f26b3a]">About Us</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">Learn about our community</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-stone-600">
            Choose a section below to explore our journey, our people, and the beliefs that guide our work.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-5 sm:py-16">
        <AboutTabs />
      </section>
    </main>
  );
}
