import Image from 'next/image';

type HeartMarkProps = {
  className?: string;
};

export default function HeartMark({ className = '' }: HeartMarkProps) {
  return (
    <Image
      src="/images/logo.png"
      alt=""
      aria-hidden="true"
      width={48}
      height={48}
      className={`h-10 w-10 shrink-0 object-contain ${className}`}
    />
  );
}
