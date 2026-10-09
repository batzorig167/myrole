import Link from "next/link";
import { useState } from "react";
import Info from "./Info";
import HomeTsesniihesg from "./HomeTsesniihesg";
import { useRouter } from "next/router";
import { useCategory } from "../Context/CategoryContext";
import { useData } from "../Context/DataContext";
import { getTheme } from "@/lib/themes";

// Нүүр хуудсанд тестийн theme бүрийг тод өнгөөр харуулна
const bright = {
  sky: { card: "bg-bubble", soft: "bg-bubble-soft", text: "text-bubble", shadow: "shadow-[0_6px_0_#2a7cc7]" },
  lavender: { card: "bg-grape", soft: "bg-grape-soft", text: "text-grape", shadow: "shadow-[0_6px_0_#6d3fd6]" },
  peach: { card: "bg-coral", soft: "bg-coral-soft", text: "text-coral", shadow: "shadow-[0_6px_0_#e05a38]" },
  sage: { card: "bg-mint", soft: "bg-mint-soft", text: "text-mint", shadow: "shadow-[0_6px_0_#1f9a71]" },
  rose: { card: "bg-pink", soft: "bg-pink-soft", text: "text-pink", shadow: "shadow-[0_6px_0_#cc3a6d]" },
};
const tilts = ["-rotate-1", "rotate-1", "-rotate-2", "rotate-2"];

const moods = [
  {
    key: "great",
    label: "Гайхалтай",
    color: "#2fbf8f",
    mouth: "M14 27 Q24 37 34 27",
    reply: "Ёстой гоё! Энэ сайхан мэдрэмжээ хадгалаад, найздаа ч бас инээмсэглэл бэлэглээрэй.",
  },
  {
    key: "good",
    label: "Сайн",
    color: "#3d9cf0",
    mouth: "M15 28 Q24 34 33 28",
    reply: "Сайн байна! Өөрийгөө илүү сайн таньж мэдэхийн тулд нэг тест өгөөд үзэх үү?",
  },
  {
    key: "okay",
    label: "Зүгээр",
    color: "#ffc93c",
    mouth: "M16 30 L32 30",
    reply: "Заримдаа ердийн л өдөр байдаг. Хэдэн минут амьсгалын дасгал хийвэл сэтгэл сэргэнэ.",
  },
  {
    key: "worried",
    label: "Санаа зовж байна",
    color: "#ff7a59",
    mouth: "M15 32 Q24 26 33 32",
    reply: "Санаа зовох нь хэвийн зүйл. Тайвшруулах дасгал хийж, итгэдэг хүндээ хэлээд үзээрэй.",
  },
  {
    key: "sad",
    label: "Гунигтай",
    color: "#8b5cf6",
    mouth: "M15 33 Q24 25 33 33",
    tear: true,
    reply: "Чамайг сонсох хүмүүс бий. Багш, эцэг эх эсвэл сургуулийн сэтгэл зүйчтэйгээ ярилцаарай. 108 руу үнэ төлбөргүй залгаж болно.",
  },
];

function Face({ mood, className = "h-12 w-12" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill={mood.color} />
      <circle cx="17" cy="19" r="3" fill="#1f1b3a" />
      <circle cx="31" cy="19" r="3" fill="#1f1b3a" />
      <path d={mood.mouth} stroke="#1f1b3a" strokeWidth="3" fill="none" strokeLinecap="round" />
      {mood.tear && <path d="M33 23 q2 4 0 6 q-2 -2 0 -6" fill="#dcedfd" />}
    </svg>
  );
}

// Найрсаг маскот — толгой дээрээ нахиатай дугуй дүр
function Mascot() {
  return (
    <svg viewBox="0 0 220 220" className="h-full w-full" aria-hidden="true">
      <ellipse cx="110" cy="205" rx="62" ry="9" fill="#1f1b3a" opacity="0.08" />
      <path d="M110 46 C110 30 118 20 134 18 C134 34 126 44 110 46 Z" fill="#2fbf8f" />
      <path d="M110 50 C108 36 98 28 84 30 C86 44 96 50 110 50 Z" fill="#45d3a3" />
      <path d="M110 50 L110 62" stroke="#1f9a71" strokeWidth="4" strokeLinecap="round" />
      <path
        d="M40 128 C40 84 72 58 110 58 C150 58 180 86 180 128 C180 172 150 196 110 196 C70 196 40 172 40 128 Z"
        fill="#ffc93c"
      />
      <path d="M44 132 C26 120 20 104 26 96" stroke="#ffc93c" strokeWidth="14" strokeLinecap="round" fill="none" />
      <path d="M176 128 C196 132 204 150 198 160" stroke="#ffc93c" strokeWidth="14" strokeLinecap="round" fill="none" />
      <circle cx="88" cy="118" r="9" fill="#1f1b3a" />
      <circle cx="132" cy="118" r="9" fill="#1f1b3a" />
      <circle cx="91" cy="115" r="3" fill="#fff" />
      <circle cx="135" cy="115" r="3" fill="#fff" />
      <circle cx="72" cy="140" r="9" fill="#ff7a59" opacity="0.45" />
      <circle cx="148" cy="140" r="9" fill="#ff7a59" opacity="0.45" />
      <path d="M94 144 Q110 160 126 144" stroke="#1f1b3a" strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function Sparkle({ className, color }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" fill={color} />
    </svg>
  );
}

function Heart({ className, color }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11Z" fill={color} />
    </svg>
  );
}

export default function Homepage() {
  const { setCatindex } = useCategory();
  const { test, loading, error } = useData();
  const [mood, setMood] = useState(null);
  const router = useRouter();

  const changeTest = (index) => {
    setCatindex(index);
    router.push("/taketest");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fffaf0] text-night">
      {/* Толгой */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sun shadow-[0_4px_0_#e0a800]">
            <Heart className="h-6 w-6" color="#ff7a59" />
          </span>
          <span className="text-xl font-black tracking-tight">
            Сэтгэлийн <span className="text-coral">найз</span>
          </span>
        </Link>
        <Link
          href="/login"
          className="rounded-full border-2 border-night/15 bg-white px-5 py-2 text-sm font-bold transition hover:border-night/40"
        >
          Нэвтрэх
        </Link>
      </header>

      <main>
        {/* Нүүр хэсэг */}
        <section className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 pb-16 pt-6 md:grid-cols-[1.1fr_1fr] md:pt-12">
          <div className="relative z-10">
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-bold shadow-sm ring-2 ring-sun">
              👋 Сайн уу, найзаа!
            </p>
            <h1 className="mt-5 text-4xl font-black leading-[1.1] tracking-tight md:text-6xl">
              Сэтгэлээ{" "}
              <span className="relative inline-block text-coral">
                таньж
                <svg viewBox="0 0 200 20" className="absolute -bottom-2 left-0 w-full" aria-hidden="true">
                  <path d="M4 14 Q50 2 100 12 T196 8" stroke="#ffc93c" strokeWidth="6" fill="none" strokeLinecap="round" />
                </svg>
              </span>
              <br />
              өөрийгөө хайрла
            </h1>
            <p className="mt-6 max-w-lg text-lg font-medium leading-relaxed text-night/70">
              Хэдхэн минутын богино тест бөглөөд сэтгэл санаагаа ажиглаж, өөрт
              тохирсон хөгжилтэй даалгавар аваарай. Зөв, буруу хариулт гэж
              байхгүй!
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#tests"
                className="rounded-2xl bg-coral px-7 py-4 text-lg font-extrabold text-white shadow-[0_6px_0_#e05a38] transition active:translate-y-1 active:shadow-[0_2px_0_#e05a38]"
              >
                Тест эхлүүлэх 🚀
              </a>
              <Link
                href="/dasgal"
                className="rounded-2xl bg-white px-7 py-4 text-lg font-extrabold text-night shadow-[0_6px_0_#e8dfcc] ring-2 ring-[#e8dfcc] transition active:translate-y-1 active:shadow-[0_2px_0_#e8dfcc]"
              >
                Тайвшрах дасгал 🌿
              </Link>
            </div>
          </div>

          <div className="relative mx-auto h-72 w-72 md:h-[26rem] md:w-[26rem]">
            <div className="absolute inset-4 rounded-full bg-sun-soft" />
            <div className="absolute inset-12 rounded-full bg-coral-soft" />
            <div className="animate-float absolute inset-10">
              <Mascot />
            </div>
            <div className="animate-float absolute -right-2 top-6 rounded-2xl rounded-bl-none bg-white px-4 py-2 text-sm font-bold shadow-md [--r:3deg] md:right-0">
              Би чамтай хамт байна!
            </div>
            <Sparkle className="animate-float absolute left-2 top-10 h-8 w-8 [animation-delay:1s]" color="#3d9cf0" />
            <Sparkle className="animate-float absolute bottom-10 right-4 h-6 w-6 [animation-delay:2s]" color="#8b5cf6" />
            <Heart className="animate-float absolute bottom-16 left-0 h-9 w-9 [--r:-12deg] [animation-delay:.5s]" color="#f2558c" />
          </div>
        </section>

        {/* Сэтгэл санааны шалгалт */}
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <div className="rounded-[2.5rem] bg-white p-6 shadow-[0_8px_0_#efe6d2] ring-2 ring-[#efe6d2] md:p-10">
            <h2 className="text-center text-2xl font-black md:text-3xl">
              Өнөөдөр сэтгэл чинь ямар байна?
            </h2>
            <div className="mt-6 flex justify-center gap-1 md:gap-5">
              {moods.map((m) => (
                <button
                  key={m.key}
                  onClick={() => setMood(m)}
                  aria-pressed={mood?.key === m.key}
                  className={`hover-wiggle flex w-[19%] max-w-28 flex-col items-center gap-2 rounded-3xl px-1 py-3 transition md:w-28 md:p-3 ${
                    mood?.key === m.key ? "scale-110 bg-[#fffaf0] ring-4" : "hover:bg-[#fffaf0]"
                  }`}
                  style={{ "--tw-ring-color": m.color }}
                >
                  <Face mood={m} className="h-11 w-11 md:h-14 md:w-14" />
                  <span className="text-xs font-bold leading-tight md:text-sm">{m.label}</span>
                </button>
              ))}
            </div>
            {mood && (
              <div
                className="mx-auto mt-6 flex max-w-2xl flex-col items-center gap-4 rounded-3xl p-5 text-center md:flex-row md:text-left"
                style={{ backgroundColor: `${mood.color}22` }}
              >
                <Face mood={mood} className="h-11 w-11 shrink-0" />
                <p className="flex-1 font-semibold leading-relaxed">{mood.reply}</p>
                <div className="flex shrink-0 gap-2">
                  <a href="#tests" className="rounded-xl bg-night px-4 py-2 text-sm font-bold text-white">
                    Тест
                  </a>
                  <Link href="/dasgal" className="rounded-xl bg-white px-4 py-2 text-sm font-bold">
                    Дасгал
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Тестүүд */}
        <section id="tests" className="mx-auto max-w-6xl scroll-mt-6 px-4 pb-20">
          <div className="text-center">
            <h2 className="text-3xl font-black md:text-4xl">Аль тестийг өгөх вэ? 🧩</h2>
            <p className="mt-2 font-medium text-night/60">
              Нэгийг сонгоод сүүлийн үеийн мэдрэмждээ тулгуурлан хариулаарай.
            </p>
          </div>
          {loading && <p className="mt-8 text-center font-semibold text-night/50">Ачааллаж байна...</p>}
          {error && <p className="mt-8 text-center text-rose">{error}</p>}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {test.map((item, index) => {
              const { Icon } = getTheme(item.theme);
              const color = bright[item.theme] || bright.sage;
              const minutes = Math.max(1, Math.ceil((item.question.length * 10) / 60));
              return (
                <button
                  key={item._id}
                  onClick={() => changeTest(index)}
                  className={`group flex flex-col rounded-[2rem] ${color.card} ${color.shadow} ${tilts[index % tilts.length]} p-6 text-left text-white transition hover:rotate-0 hover:-translate-y-1 active:translate-y-1`}
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/25">
                    <Icon className="h-10 w-10" />
                  </span>
                  <span className="mt-5 text-2xl font-black leading-tight">{item.testName}</span>
                  <span className="mt-2 flex-1 font-medium leading-relaxed text-white/85">
                    {item.description}
                  </span>
                  <span className="mt-5 flex items-center justify-between">
                    <span className="rounded-full bg-white/25 px-3 py-1 text-xs font-bold">
                      ⏱ {minutes} мин · {item.question.length} асуулт
                    </span>
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-black ${color.text} transition group-hover:translate-x-1`}
                    >
                      →
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <HomeTsesniihesg />
      </main>

      <Info />
    </div>
  );
}
