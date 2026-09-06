import { getSiteContent } from '@/app/lib/cms/content';
import type { Metadata } from 'next';
import AboutTabs from '../components/AboutTabs';
import PageIntro from '../components/PageIntro';
import PlacedArticles from '../components/PlacedArticles';

export const metadata: Metadata = {
  title: 'About Us | Dr. Joseph Helping Children Community',
  description: 'Our history, team, mission, vision, and values.',
};

export default function AboutPage() {
  const { copy } = getSiteContent();

  return (
    <main>
      <PageIntro
        eyebrow={copy["about"]["001 eyebrow: About Us"]}
        title={copy["about"]["002 title: A community built through care and consistenc"]}
        description={copy["about"]["003 description: Explore our journey, the people behind the wo"]}
      />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <AboutTabs />
      </section>
      <PlacedArticles placement="about" tone="white" />
    </main>
  );
}
