import Image from 'next/image';

type HeartMarkProps = {
  className?: string;
};

export default function HeartMark({ className = 'h-10 w-10' }: HeartMarkProps) {
  return (
    <Image
      src="/images/logo.png"
      alt=""
      aria-hidden="true"
      width={48}
      height={48}
      className={`shrink-0 object-contain ${className}`}
    />
  );
}
