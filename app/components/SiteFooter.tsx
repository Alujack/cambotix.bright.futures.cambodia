import Link from 'next/link';
import { NGO_NAME } from '../content';
import HeartMark from './HeartMark';

export default function SiteFooter() {
  return (
    <footer className="border-t border-orange-100 bg-white">
      <div className="mx-auto grid max-w-6xl gap-9 px-4 py-10 sm:px-5 sm:py-12 md:grid-cols-[1.2fr_0.8fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <HeartMark />
            <span className="font-extrabold leading-tight">
              <span className="block">Dr. Joseph Helping Children</span>
              <span className="block">Community</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone-500">
            Helping children and communities in Cambodia through education,
            food, care, and meaningful opportunities for a better future.
          </p>
        </div>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-stone-400">Navigate</p>
          <ul className="space-y-2.5 text-sm font-semibold text-stone-600">
            <li><Link href="/about" className="hover:text-[#f26b3a]">About Us</Link></li>
            <li><Link href="/projects" className="hover:text-[#f26b3a]">Projects</Link></li>
            <li><Link href="/volunteers" className="hover:text-[#f26b3a]">Volunteers</Link></li>
            <li><Link href="/contact" className="hover:text-[#f26b3a]">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-stone-400">Contact</p>
          <ul className="space-y-2.5 text-sm font-medium text-stone-600">
            <li><a href="https://t.me/Lemongrassoils" target="_blank" rel="noopener noreferrer" className="hover:text-[#f26b3a]">Telegram: @Lemongrassoils</a></li>
            <li><a href="mailto:aloudoil@gmail.com" className="hover:text-[#f26b3a]">Email: aloudoil@gmail.com</a></li>
            <li>Cambodia 🇰🇭</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-orange-100 py-5 text-center text-xs text-stone-400">
        © {new Date().getFullYear()} {NGO_NAME}. Made with ♥ in Cambodia.
      </div>
    </footer>
  );
}
