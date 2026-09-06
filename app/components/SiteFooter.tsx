import { getSiteContent } from '@/app/lib/cms/content';
import Link from 'next/link';

import HeartMark from './HeartMark';

export default function SiteFooter() {
  const { copy, NGO_NAME } = getSiteContent();

  return (
    <footer className="bg-[#181411] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-2 lg:grid-cols-[1.35fr_0.65fr_0.75fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <HeartMark />
            <span className="font-extrabold leading-tight">
              <span className="block">{copy["SiteFooter"]["001 Dr. Joseph Helping Children"]}</span>
              <span className="block">{copy["SiteFooter"]["002 Community"]}</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone-400">{copy["SiteFooter"]["003 Helping children and communities in Cambodia throu"]}</p>
          <Link href={copy["SiteFooter"]["004 href: /contact#donate"]} className="mt-6 inline-flex rounded-xl bg-[#f26b3a] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#df5524]">{copy["SiteFooter"]["005 Support the community"]}</Link>
        </div>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-stone-500">{copy["SiteFooter"]["006 Explore"]}</p>
          <ul className="space-y-2.5 text-sm font-semibold text-stone-300">
            <li><Link href={copy["SiteFooter"]["007 href: /about"]} className="transition hover:text-[#f26b3a]">{copy["SiteFooter"]["008 About Us"]}</Link></li>
            <li><Link href={copy["SiteFooter"]["009 href: /projects"]} className="transition hover:text-[#f26b3a]">{copy["SiteFooter"]["010 Our Projects"]}</Link></li>
            <li><Link href={copy["SiteFooter"]["011 href: /impact"]} className="transition hover:text-[#f26b3a]">{copy["SiteFooter"]["012 Impact &amp; Updates"]}</Link></li>
            <li><Link href={copy["SiteFooter"]["013 href: /volunteers"]} className="transition hover:text-[#f26b3a]">{copy["SiteFooter"]["014 Volunteer"]}</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-stone-500">{copy["SiteFooter"]["015 Projects"]}</p>
          <ul className="space-y-2.5 text-sm font-medium text-stone-300">
            <li><Link href={copy["SiteFooter"]["016 href: /projects/children-support"]} className="transition hover:text-[#f26b3a]">{copy["SiteFooter"]["017 Children"]}</Link></li>
            <li><Link href={copy["SiteFooter"]["018 href: /projects/education-support"]} className="transition hover:text-[#f26b3a]">{copy["SiteFooter"]["019 Education"]}</Link></li>
            <li><Link href={copy["SiteFooter"]["020 href: /projects/family-agriculture"]} className="transition hover:text-[#f26b3a]">{copy["SiteFooter"]["021 Families"]}</Link></li>
            <li><Link href={copy["SiteFooter"]["022 href: /projects/elderly-support"]} className="transition hover:text-[#f26b3a]">{copy["SiteFooter"]["023 Elderly people"]}</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-stone-500">{copy["SiteFooter"]["024 Contact"]}</p>
          <ul className="space-y-3 text-sm font-medium text-stone-300">
            <li><a href={copy["SiteFooter"]["025 href: https://t.me/Lemongrassoils"]} target="_blank" rel="noopener noreferrer" className="transition hover:text-[#f26b3a]">{copy["SiteFooter"]["026 Telegram: @Lemongrassoils"]}</a></li>
            <li><a href={copy["SiteFooter"]["027 href: mailto:aloudoil@gmail.com"]} className="break-all transition hover:text-[#f26b3a]">{copy["SiteFooter"]["028 aloudoil@gmail.com"]}</a></li>
            <li className="text-stone-400">{copy["SiteFooter"]["029 Cambodia 🇰🇭"]}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} {NGO_NAME}{copy["SiteFooter"]["030 . Community-led with care in Cambodia."]}</div>
    </footer>
  );
}
