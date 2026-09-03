'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          options: { pageLanguage: string; autoDisplay?: boolean },
          elementId: string,
        ) => void;
      };
    };
  }
}

const languages = [
  ['en', 'English'],
  ['km', 'ភាសាខ្មែរ'],
  ['zh-CN', '中文'],
  ['ja', '日本語'],
  ['ko', '한국어'],
  ['fr', 'Français'],
  ['es', 'Español'],
  ['de', 'Deutsch'],
  ['it', 'Italiano'],
  ['pt', 'Português'],
  ['ru', 'Русский'],
  ['ar', 'العربية'],
  ['hi', 'हिन्दी'],
  ['th', 'ไทย'],
  ['vi', 'Tiếng Việt'],
  ['id', 'Bahasa Indonesia'],
  ['ms', 'Bahasa Melayu'],
  ['nl', 'Nederlands'],
  ['tr', 'Türkçe'],
  ['sv', 'Svenska'],
] as const;

function readLangFromCookie(): string {
  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
  if (!match) return 'en';
  const code = decodeURIComponent(match[1]).split('/')[2];
  return code || 'en';
}

function setLanguage(code: string) {
  const host = window.location.hostname;
  const expire = 'expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  for (const domain of ['', `domain=${host};`, `domain=.${host};`]) {
    if (code === 'en') {
      document.cookie = `googtrans=; ${expire} path=/; ${domain}`;
    } else {
      document.cookie = `googtrans=/en/${code}; path=/; ${domain}`;
    }
  }
  window.location.reload();
}

export default function LanguageSwitcher() {
  const [current, setCurrent] = useState('en');

  useEffect(() => {
    setCurrent(readLangFromCookie());

    if (document.getElementById('google-translate-script')) return;
    window.googleTranslateElementInit = () => {
      if (!window.google) return;
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en', autoDisplay: false },
        'google_translate_element',
      );
    };
    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src =
      'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const currentLabel =
    languages.find(([code]) => code === current)?.[1] ?? 'English';

  return (
    <>
      {/* The widget needs a container to boot; keep it out of sight but not display:none. */}
      <div
        id="google_translate_element"
        className="pointer-events-none fixed h-0 w-0 overflow-hidden"
      />
      <label className="notranslate relative flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-orange-200 bg-[#fdf8f3] text-sm font-bold text-stone-700 transition hover:border-[#f26b3a] lg:w-auto lg:gap-1.5 lg:px-3">
        <span aria-hidden className="text-base">🌐</span>
        <span className="hidden whitespace-nowrap lg:inline">
          {currentLabel}
        </span>
        <select
          aria-label="Select language"
          value={current}
          onChange={(e) => setLanguage(e.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        >
          {languages.map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}
