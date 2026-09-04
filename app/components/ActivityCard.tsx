import Image from 'next/image';
import type { Activity } from '../content';

type ActivityCardProps = {
  activity: Activity;
  sizes?: string;
};

export default function ActivityCard({ activity, sizes = '(min-width: 640px) 33vw, 100vw' }: ActivityCardProps) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-orange-100 bg-white shadow-[0_16px_50px_rgb(91_60_37/6%)]">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#201a15]">
        {activity.kind === 'video' ? (
          <video
            controls
            muted
            playsInline
            preload="metadata"
            poster={activity.poster}
            aria-label={activity.alt}
            className="h-full w-full object-cover"
          >
            <source src={activity.src} type="video/mp4" />
            Your browser does not support video playback.
          </video>
        ) : (
          <Image src={activity.src} alt={activity.alt} fill sizes={sizes} className="object-cover" />
        )}
        <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-extrabold text-[#d95121] shadow-sm backdrop-blur">
          {activity.kind === 'video' ? 'Video' : 'Photo'}
        </span>
      </div>
      <div className="p-5 sm:p-6">
        <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-[#e05a29]">{activity.category}</p>
        <h3 className="mt-2 text-xl font-extrabold leading-snug">{activity.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-stone-600">{activity.description}</p>
      </div>
    </article>
  );
}
