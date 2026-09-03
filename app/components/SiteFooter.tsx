import Link from 'next/link';
import { NGO_NAME } from '../content';
import HeartMark from './HeartMark';

export default function SiteFooter() {
  return (
    <footer className="bg-[#181411] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-2 lg:grid-cols-[1.35fr_0.65fr_0.75fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <HeartMark />
            <span className="font-extrabold leading-tight">
              <span className="block">Dr. Joseph Helping Children</span>
              <span className="block">Community</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone-400">
            Helping children and communities in Cambodia through education,
            food, care, and meaningful opportunities for a better future.
          </p>
          <Link href="/contact#donate" className="mt-6 inline-flex rounded-xl bg-[#f26b3a] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#df5524]">
            Support the community
          </Link>
        </div>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-stone-500">Explore</p>
          <ul className="space-y-2.5 text-sm font-semibold text-stone-300">
            <li><Link href="/about" className="transition hover:text-[#f26b3a]">About Us</Link></li>
            <li><Link href="/projects" className="transition hover:text-[#f26b3a]">Our Projects</Link></li>
            <li><Link href="/impact" className="transition hover:text-[#f26b3a]">Impact &amp; Updates</Link></li>
            <li><Link href="/volunteers" className="transition hover:text-[#f26b3a]">Volunteer</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-stone-500">Projects</p>
          <ul className="space-y-2.5 text-sm font-medium text-stone-300">
            <li><Link href="/projects/children-support" className="transition hover:text-[#f26b3a]">Children</Link></li>
            <li><Link href="/projects/education-support" className="transition hover:text-[#f26b3a]">Education</Link></li>
            <li><Link href="/projects/family-agriculture" className="transition hover:text-[#f26b3a]">Families</Link></li>
            <li><Link href="/projects/elderly-support" className="transition hover:text-[#f26b3a]">Elderly people</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-stone-500">Contact</p>
          <ul className="space-y-3 text-sm font-medium text-stone-300">
            <li><a href="https://t.me/Lemongrassoils" target="_blank" rel="noopener noreferrer" className="transition hover:text-[#f26b3a]">Telegram: @Lemongrassoils</a></li>
            <li><a href="mailto:aloudoil@gmail.com" className="break-all transition hover:text-[#f26b3a]">aloudoil@gmail.com</a></li>
            <li className="text-stone-400">Cambodia 🇰🇭</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} {NGO_NAME}. Community-led with care in Cambodia.
      </div>
    </footer>
  );
}
