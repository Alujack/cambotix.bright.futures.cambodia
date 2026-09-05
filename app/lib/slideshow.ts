import fs from 'node:fs';
import path from 'node:path';
import type { HeroSlide } from '../content';

// The home page slideshow shows every image in public/images/slideshow.
// Files are ordered by name, so a leading number controls the order,
// and the rest of the filename becomes the caption for screen readers.
// Example: "06-children-learning-english.jpg" -> "Children learning english".

const SLIDESHOW_DIR = path.join(process.cwd(), 'public', 'images', 'slideshow');
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

const FALLBACK_SLIDES: HeroSlide[] = [
  {
    image: '/images/hero-community.jpg',
    alt: 'Children, elders, and community members gathered with our team in front of the center',
  },
];

function captionFromFilename(file: string): string {
  const base = file.replace(/\.[^.]+$/, '');
  const words = base.replace(/^[\d\s._-]+/, '').replace(/[-_]+/g, ' ').trim();
  if (!words) return 'Photo from our community';
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export function getHeroSlides(): HeroSlide[] {
  let files: string[];
  try {
    files = fs.readdirSync(SLIDESHOW_DIR);
  } catch {
    return FALLBACK_SLIDES;
  }

  const slides = files
    .filter((file) => !file.startsWith('.') && IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))
    .map((file) => ({
      image: `/images/slideshow/${encodeURIComponent(file)}`,
      alt: captionFromFilename(file),
    }));

  return slides.length > 0 ? slides : FALLBACK_SLIDES;
}
