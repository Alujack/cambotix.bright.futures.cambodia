'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { NGO_NAME } from '../content';
import HeartMark from './HeartMark';
import LanguageSwitcher from './LanguageSwitcher';

const links = [
  ['Home', '/'],
  ['About Us', '/about'],
  ['Projects', '/projects'],
  ['Volunteers', '/volunteers'],
  ['Impact', '/impact'],
  ['Contact Us', '/contact'],
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-orange-100 bg-white/95 backdrop-blur">
      <div className="hidden bg-[#201a15] text-stone-200 sm:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-6 px-6 text-[0.67rem] font-semibold lg:px-8">
          <div className="flex items-center gap-5">
            <a href="mailto:aloudoil@gmail.com" className="transition hover:text-white">✉&nbsp; aloudoil@gmail.com</a>
            <a href="https://t.me/Lemongrassoils" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">Telegram&nbsp; @Lemongrassoils</a>
          </div>
          <p className="text-stone-400">Community-led support in Cambodia 🇰🇭</p>
        </div>
      </div>

      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8 xl:gap-6 xl:py-0">
        <Link href="/" className="flex min-w-0 items-center gap-2.5 xl:shrink-0">
          <HeartMark className="h-11 w-11" />
          <span className="text-xs font-extrabold leading-[1.22] tracking-tight sm:text-sm">
            <span className="block xl:hidden">Dr. Joseph Helping</span>
            <span className="block xl:hidden">Children Community</span>
            <span className="hidden whitespace-nowrap text-sm xl:block 2xl:text-base">{NGO_NAME}</span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-4 text-[0.78rem] font-bold text-stone-600 xl:flex 2xl:gap-6 2xl:text-sm">
          {links.map(([label, href]) => {
            const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`relative whitespace-nowrap py-2 transition hover:text-[#f26b3a] ${active ? 'text-[#f26b3a]' : ''}`}
              >
                {label}
                {active && <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-[#f26b3a]" />}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher />
          <Link
            href="/contact#donate"
            className="hidden rounded-xl bg-[#f26b3a] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#df5524] xl:block"
          >
            Donate now
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="grid h-11 w-11 place-items-center rounded-xl border border-orange-200 bg-[#fdf8f3] text-2xl font-bold text-stone-700 xl:hidden"
          >
            <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-orange-100 bg-white px-4 pb-4 pt-3 xl:hidden">
          <div className="mx-auto grid max-w-7xl gap-1">
            {links.map(([label, href]) => {
              const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active ? 'page' : undefined}
                  className={`flex min-h-12 items-center justify-between rounded-xl px-4 py-3 text-sm font-extrabold uppercase tracking-wide ${active ? 'bg-orange-50 text-[#e05a29]' : 'text-stone-700'}`}
                >
                  {label}
                  <span aria-hidden="true" className="text-[#f26b3a]">→</span>
                </Link>
              );
            })}
            <Link
              href="/contact#donate"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-xl bg-[#f26b3a] px-4 py-3.5 text-center text-sm font-bold text-white"
            >
              Donate now
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
