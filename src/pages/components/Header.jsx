import Link from "next/link";

export function Logo({ className = "" }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`}>
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage text-white">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
          aria-hidden="true"
        >
          {/* Толгойн дүрс доторх нахиа */}
          <path d="M15.5 20v-3.2a6.5 6.5 0 1 0-8.6-6.1c0 1-.4 1.6-1.4 2.8l1.4.9V17h2.6v3" />
          <path d="M12 14v-3.5" />
          <path d="M12 10.5c0-1.8 1.1-2.9 3-3 0 1.9-1.1 3-3 3Z" />
          <path d="M12 12c0-1.4-.9-2.3-2.5-2.4 0 1.5.9 2.4 2.5 2.4Z" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block font-serif text-lg font-semibold text-ink">
          Сэтгэлийн эрүүл мэнд
        </span>
        <span className="block text-xs text-muted">Сэтгэл судлалын төв</span>
      </span>
    </Link>
  );
}

export default function Header({ children }) {
  return (
    <header className="border-b border-line bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Logo />
        {children}
      </div>
    </header>
  );
}
