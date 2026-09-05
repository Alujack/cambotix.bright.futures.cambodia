'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { HeroSlide } from '../content';

type HeroSlideshowProps = {
  slides: HeroSlide[];
  /** Time each photo stays on screen, in milliseconds. */
  interval?: number;
  sizes?: string;
};

const FADE_MS = 1000;

export default function HeroSlideshow({
  slides,
  interval = 5500,
  sizes = '(min-width: 1024px) 54vw, 100vw',
}: HeroSlideshowProps) {
  const count = slides.length;
  const [state, setState] = useState({ index: 0, previous: 0 });
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (next: number) => {
      if (count < 2) return;
      const normalized = ((next % count) + count) % count;
      setState((current) => (current.index === normalized ? current : { index: normalized, previous: current.index }));
    },
    [count],
  );

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const onVisibility = () => setHidden(document.visibilityState !== 'visible');
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const paused = hovering || hidden;

  useEffect(() => {
    if (count < 2 || paused || reduceMotion) return;
    const id = window.setInterval(() => {
      setState((current) => ({ index: (current.index + 1) % count, previous: current.index }));
    }, interval);
    return () => window.clearInterval(id);
  }, [count, paused, reduceMotion, interval]);

  const onTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start === null) return;
    const delta = (event.changedTouches[0]?.clientX ?? start) - start;
    if (Math.abs(delta) < 40) return;
    goTo(delta < 0 ? state.index + 1 : state.index - 1);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(state.index + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(state.index - 1);
    }
  };

  const current = slides[state.index];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Photos from our community"
      className="absolute inset-0 isolate bg-[#201a15]"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setHovering(true)}
      onBlurCapture={() => setHovering(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={onKeyDown}
    >
      {slides.map((slide, i) => {
        const isActive = i === state.index;
        const isPrevious = i === state.previous && !isActive;
        const layer = isActive ? 'z-20 opacity-100' : isPrevious ? 'z-10 opacity-100' : 'z-0 opacity-0';
        const zoom = reduceMotion ? '' : isActive ? 'scale-110' : 'scale-100';

        return (
          <div
            key={slide.image}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity ease-in-out ${layer}`}
            style={{ transitionDuration: `${FADE_MS}ms` }}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes={sizes}
              className={`object-cover object-center ${reduceMotion ? '' : 'transition-transform ease-linear'} ${zoom}`}
              style={reduceMotion ? undefined : { transitionDuration: `${interval + FADE_MS}ms` }}
            />
          </div>
        );
      })}

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(state.index - 1)}
            aria-label="Show previous photo"
            className="absolute left-2 top-1/2 z-30 grid h-9 w-9 -translate-y-1/2 place-items-center text-white drop-shadow-[0_1px_3px_rgb(0_0_0/65%)] transition hover:scale-110 sm:left-3"
          >
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            type="button"
            onClick={() => goTo(state.index + 1)}
            aria-label="Show next photo"
            className="absolute right-2 top-1/2 z-30 grid h-9 w-9 -translate-y-1/2 place-items-center text-white drop-shadow-[0_1px_3px_rgb(0_0_0/65%)] transition hover:scale-110 sm:right-3"
          >
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
          </button>

          <p className="sr-only" aria-live="polite">{`Photo ${state.index + 1} of ${count}: ${current.alt}`}</p>
        </>
      )}
    </div>
  );
}
