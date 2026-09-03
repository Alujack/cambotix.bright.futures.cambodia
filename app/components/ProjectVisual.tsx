import Image from 'next/image';
import type { Project } from '../content';

type ProjectVisualProps = {
  project: Project;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export default function ProjectVisual({
  project,
  className = '',
  sizes = '100vw',
  priority = false,
}: ProjectVisualProps) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={project.imageAlt ?? ''}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`grid h-full w-full place-items-center bg-[radial-gradient(circle_at_20%_20%,#fff7dc_0%,#e6efd7_52%,#cbdcb9_100%)] ${className}`}
      aria-hidden="true"
    >
      <span className="text-7xl sm:text-8xl">{project.emoji}</span>
    </div>
  );
}
