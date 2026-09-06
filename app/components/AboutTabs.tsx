'use client';

import { useSiteContent } from '@/app/components/ContentProvider';


import { useEffect, useState } from 'react';


const tabs = [
  ['history', 'Our History'],
  ['who-we-are', 'Who We Are'],
  ['mission', 'Our Mission'],
  ['vision', 'Our Vision'],
  ['values', 'Our Values'],
] as const;

type TabId = (typeof tabs)[number][0];

function isTabId(value: string): value is TabId {
  return tabs.some(([id]) => id === value);
}

export default function AboutTabs() {
  const { copy, team, values } = useSiteContent();

  const [active, setActive] = useState<TabId>('history');

  useEffect(() => {
    const updateFromHash = () => {
      const hash = window.location.hash.slice(1);
      if (isTabId(hash)) setActive(hash);
    };
    updateFromHash();
    window.addEventListener('hashchange', updateFromHash);
    return () => window.removeEventListener('hashchange', updateFromHash);
  }, []);

  const choose = (id: TabId) => {
    setActive(id);
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <div className="grid gap-5 sm:gap-8 lg:grid-cols-[280px_1fr] lg:items-start">
      <div className="rounded-2xl border border-orange-100 bg-white p-2 sm:rounded-3xl sm:p-4 lg:sticky lg:top-36">
        <p className="px-3 pb-2 pt-2 text-xs font-extrabold uppercase tracking-wider text-stone-400 sm:px-4 sm:pb-3">{copy["AboutTabs"]["001 About Us"]}</p>
        <nav aria-label="About sections" className="grid grid-cols-2 gap-1 lg:block lg:space-y-1">
          {tabs.map(([id, label], index) => (
            <button
              key={id}
              type="button"
              onClick={() => choose(id)}
              aria-pressed={active === id}
              className={`flex w-full items-center gap-2 rounded-xl px-3 py-3 text-left text-sm font-bold transition sm:gap-4 sm:rounded-2xl sm:px-4 sm:py-3.5 sm:text-base ${
                index === tabs.length - 1 ? 'col-span-2 lg:col-span-1' : ''
              } ${
                active === id
                  ? 'bg-[#f26b3a] text-white'
                  : 'text-stone-700 hover:bg-orange-50 hover:text-[#e05a29]'
              }`}
            >
              <span className={`text-sm ${active === id ? 'text-orange-100' : 'text-stone-400'}`}>{index + 1}.</span>
              {label}
            </button>
          ))}
        </nav>
      </div>

      <div className="min-h-0 rounded-3xl border border-orange-100 bg-white p-5 sm:min-h-[520px] sm:rounded-[32px] sm:p-10">
        {active === 'history' && (
          <section aria-labelledby="history-heading">
            <p className="text-sm font-bold uppercase tracking-wider text-[#f26b3a]">{copy["AboutTabs"]["002 Our story"]}</p>
            <h2 id="history-heading" className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">{copy["AboutTabs"]["003 A journey that began with 45 children"]}</h2>
            <div className="mt-6 space-y-5 leading-relaxed text-stone-600">
              <p>{copy["AboutTabs"]["004 In 2010, Samnang began personally supporting 45 ch"]}</p>
              <p>{copy["AboutTabs"]["005 Samnang shared the work on Facebook, hoping others"]}</p>
              <p>{copy["AboutTabs"]["006 Today, those 45 children have grown up. Many are s"]}<strong className="text-stone-800">{copy["AboutTabs"]["007 Dr. Joseph Helping Children Community"]}</strong>{copy["AboutTabs"]["008 in 2024."]}</p>
            </div>
            <div className="mt-8 grid overflow-hidden rounded-2xl border border-orange-100 sm:grid-cols-3">
              {[
                ['2010', 'Samnang begins supporting 45 children.'],
                ['Today', 'The children are students, graduates, and young adults.'],
                ['2024', 'The community is named to honor Dr. Joseph.'],
              ].map(([year, text], index) => (
                <div key={year} className={`p-5 ${index > 0 ? 'border-t border-orange-100 sm:border-l sm:border-t-0' : ''}`}>
                  <p className="text-xl font-extrabold text-[#f26b3a]">{year}</p>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{text}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 rounded-2xl bg-[#201a15] px-6 py-5 text-center text-lg font-extrabold text-white">{copy["AboutTabs"]["009 Helping Children. Building Hope. Changing Lives."]}</p>
          </section>
        )}

        {active === 'who-we-are' && (
          <section aria-labelledby="team-heading">
            <p className="text-sm font-bold uppercase tracking-wider text-[#f26b3a]">{copy["AboutTabs"]["010 Who we are"]}</p>
            <h2 id="team-heading" className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">{copy["AboutTabs"]["011 Local care, shared responsibility"]}</h2>
            <p className="mt-5 max-w-3xl leading-relaxed text-stone-600">{copy["AboutTabs"]["012 We are a team working together to support children"]}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {team.map((member) => (
                <article key={member.name} className="rounded-2xl bg-[#fdf8f3] p-5">
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#f26b3a] text-xs font-extrabold text-white">{member.initials}</span>
                    <div>
                      <h3 className="font-bold">{member.name}</h3>
                      <p className="text-sm font-bold text-[#e05a29]">{member.role}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-stone-600">{member.description}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {active === 'mission' && (
          <section aria-labelledby="mission-heading" className="grid min-h-[300px] place-items-center sm:min-h-[430px]">
            <div className="max-w-2xl text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-orange-100 text-3xl">🎯</span>
              <p className="mt-7 text-sm font-bold uppercase tracking-wider text-[#f26b3a]">{copy["AboutTabs"]["013 Our mission"]}</p>
              <h2 id="mission-heading" className="mt-4 text-2xl font-extrabold leading-snug tracking-tight sm:text-4xl">{copy["AboutTabs"]["014 To support children and communities in need throug"]}</h2>
            </div>
          </section>
        )}

        {active === 'vision' && (
          <section aria-labelledby="vision-heading" className="grid min-h-[300px] place-items-center sm:min-h-[430px]">
            <div className="max-w-2xl text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-orange-100 text-3xl">🌅</span>
              <p className="mt-7 text-sm font-bold uppercase tracking-wider text-[#f26b3a]">{copy["AboutTabs"]["015 Our vision"]}</p>
              <h2 id="vision-heading" className="mt-4 text-2xl font-extrabold leading-snug tracking-tight sm:text-4xl">{copy["AboutTabs"]["016 A caring and supportive Cambodia where every child"]}</h2>
            </div>
          </section>
        )}

        {active === 'values' && (
          <section aria-labelledby="values-heading">
            <p className="text-sm font-bold uppercase tracking-wider text-[#f26b3a]">{copy["AboutTabs"]["017 Our values"]}</p>
            <h2 id="values-heading" className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">{copy["AboutTabs"]["018 The principles behind our work"]}</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {values.map(([title, text], index) => (
                <article key={title} className={`rounded-2xl border border-orange-100 p-6 ${index === values.length - 1 ? 'sm:col-span-2' : ''}`}>
                  <span className="text-sm font-extrabold text-[#f26b3a]">0{index + 1}</span>
                  <h3 className="mt-3 text-xl font-bold">{title}</h3>
                  <p className="mt-2 leading-relaxed text-stone-600">{text}</p>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
