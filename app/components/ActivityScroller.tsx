'use client';

import { useRef } from 'react';
import ActivityCard from './ActivityCard';
import type { Activity } from '../content';

type ActivityScrollerProps = {
  activities: Activity[];
};

export default function ActivityScroller({ activities }: ActivityScrollerProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('[data-activity-card]');
    const step = card ? card.offsetWidth + 20 : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  return (
    <div>
      <div
        ref={trackRef}
        className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 scroll-px-4 [scrollbar-width:none] sm:-mx-6 sm:px-6 sm:scroll-px-6 lg:-mx-8 lg:px-8 lg:scroll-px-8 [&::-webkit-scrollbar]:hidden"
      >
        {activities.map((activity) => (
          <div key={activity.id} data-activity-card className="w-[78vw] max-w-[360px] shrink-0 snap-start sm:w-[340px] lg:w-[360px]">
            <ActivityCard activity={activity} sizes="(min-width: 640px) 360px, 78vw" />
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-stone-500">Scroll or use the arrows to see more.</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Show previous activities"
            className="grid h-11 w-11 place-items-center rounded-full border border-orange-200 bg-white text-stone-700 transition hover:border-[#f26b3a] hover:text-[#d95121]"
          >
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Show next activities"
            className="grid h-11 w-11 place-items-center rounded-full bg-[#f26b3a] text-white transition hover:bg-[#df5524]"
          >
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
