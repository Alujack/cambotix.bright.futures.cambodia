import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { publicPost } from '@/app/lib/cms/content';
import PageIntro from '../components/PageIntro';
import PostBody from '../components/PostBody';

type CustomPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: CustomPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = publicPost('page', slug);
  if (!page) return {};
  return {
    title: `${page.title} | Dr. Joseph Helping Children Community`,
    description: page.excerpt || undefined,
    openGraph: { title: page.title, description: page.excerpt || undefined, images: page.image ? [{ url: page.image, alt: page.image_alt }] : undefined },
  };
}

// Pages created in the admin panel. Built-in routes always win over this
// catch-all, and reserved addresses are refused when a page is saved.
export default async function CustomPage({ params }: CustomPageProps) {
  const { slug } = await params;
  const page = publicPost('page', slug);
  if (!page) notFound();
  return (
    <main>
      <PageIntro title={page.title} description={page.excerpt} />
      {page.image && (
        <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 sm:pt-12 lg:px-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[30px] bg-stone-200 shadow-[0_18px_55px_rgb(91_60_37/10%)]">
            <Image src={page.image} alt={page.image_alt} fill priority sizes="(min-width: 1024px) 64rem, 100vw" className="object-cover" />
          </div>
        </div>
      )}
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <PostBody body={page.body} />
      </section>
    </main>
  );
}
