type HeartMarkProps = {
  className?: string;
};

export default function HeartMark({ className = '' }: HeartMarkProps) {
  return (
    <img
      src="/images/logo.png"
      alt=""
      aria-hidden="true"
      className={`h-10 w-10 shrink-0 object-contain ${className}`}
    />
  );
}
