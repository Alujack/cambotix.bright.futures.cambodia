import type { Metadata } from 'next';
import AboutTabs from '../components/AboutTabs';
import PageIntro from '../components/PageIntro';

export const metadata: Metadata = {
  title: 'About Us | Dr. Joseph Helping Children Community',
  description: 'Our history, team, mission, vision, and values.',
};

export default function AboutPage() {
  return (
    <main>
      <PageIntro
        eyebrow="About Us"
        title="A community built through care and consistency."
        description="Explore our journey, the people behind the work, and the beliefs that guide how we support Cambodian communities."
      />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <AboutTabs />
      </section>
    </main>
  );
}
