import Link from "next/link";

export function HeartIcon({ className, color = "#ff7a59" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11Z"
        fill={color}
      />
    </svg>
  );
}

export function Logo({ className = "" }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <span className="pop flex h-11 w-11 items-center justify-center rounded-2xl bg-sun [--edge:#e0a800]">
        <HeartIcon className="h-6 w-6" />
      </span>
      <span className="text-xl font-black tracking-tight text-ink">
        Сэтгэлийн <span className="text-coral">найз</span>
      </span>
    </Link>
  );
}

export default function Header({ children, wide = false }) {
  return (
    <header className="bg-cream">
      <div
        className={`mx-auto flex items-center justify-between gap-3 px-4 py-4 ${
          wide ? "max-w-7xl" : "max-w-6xl"
        }`}
      >
        <Logo />
        {children}
      </div>
    </header>
  );
}
