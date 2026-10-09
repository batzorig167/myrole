// Тест бүрийн өнгө, дүрс. Тестийн `theme` талбар (DB) эдгээрийн аль нэгийг заана.
const iconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

// Үүл, бороо — гунигтай сэтгэл
function CloudIcon({ className }) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M7 15a4 4 0 1 1 .9-7.9A5 5 0 0 1 17.5 8 3.5 3.5 0 0 1 17 15H7Z" />
      <path d="M9 18.5 8.5 20M13 18.5l-.5 1.5M17 18.5l-.5 1.5" />
    </svg>
  );
}

// Долгион — түгшүүр
function WaveIcon({ className }) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M3 9c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0" />
      <path d="M3 15c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0" />
    </svg>
  );
}

// Аянга — стресс
function BoltIcon({ className }) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M13 3 5 13.5h6L10 21l8-10.5h-6L13 3Z" />
    </svg>
  );
}

// Нахиа — өөртөө итгэх итгэл
function SproutIcon({ className }) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M12 21v-9" />
      <path d="M12 12c0-4 2.5-6.5 7-7 0 4.5-2.5 7-7 7Z" />
      <path d="M12 14c0-3-2-5-6-5.5 0 3.5 2 5.5 6 5.5Z" />
    </svg>
  );
}

// Сэтгэл судлалын ерөнхий дүрс — шинэ сэдэвт
function HeartIcon({ className }) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
    </svg>
  );
}

export const themes = {
  sky: {
    label: "Цэнхэр · үүл",
    Icon: CloudIcon,
    text: "text-sky",
    bg: "bg-sky",
    soft: "bg-sky-soft",
    card: "bg-bubble",
    cardSoft: "bg-bubble-soft",
    cardText: "text-bubble",
    edge: "#2a7cc7",
  },
  lavender: {
    label: "Ягаан · долгион",
    Icon: WaveIcon,
    text: "text-lavender",
    bg: "bg-lavender",
    soft: "bg-lavender-soft",
    card: "bg-grape",
    cardSoft: "bg-grape-soft",
    cardText: "text-grape",
    edge: "#6d3fd6",
  },
  peach: {
    label: "Тоор · аянга",
    Icon: BoltIcon,
    text: "text-peach",
    bg: "bg-peach",
    soft: "bg-peach-soft",
    card: "bg-coral",
    cardSoft: "bg-coral-soft",
    cardText: "text-coral",
    edge: "#e05a38",
  },
  sage: {
    label: "Ногоон · нахиа",
    Icon: SproutIcon,
    text: "text-sage",
    bg: "bg-sage",
    soft: "bg-sage-soft",
    card: "bg-mint",
    cardSoft: "bg-mint-soft",
    cardText: "text-mint",
    edge: "#1f9a71",
  },
  rose: {
    label: "Улаан · зүрх",
    Icon: HeartIcon,
    text: "text-rose",
    bg: "bg-rose",
    soft: "bg-rose-soft",
    card: "bg-pink",
    cardSoft: "bg-pink-soft",
    cardText: "text-pink",
    edge: "#cc3a6d",
  },
};

export const getTheme = (key) => themes[key] || themes.sage;
