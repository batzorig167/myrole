import Link from "next/link";

const steps = [
  {
    emoji: "📝",
    title: "Тест бөглө",
    text: "Хэдхэн асуултад өөрийнхөөрөө, үнэнээр хариулна.",
    bg: "bg-bubble-soft",
  },
  {
    emoji: "🔍",
    title: "Өөрийгөө мэд",
    text: "Одоо ямар байгаагаа харж, хэрэгтэй зөвлөгөө авна.",
    bg: "bg-grape-soft",
  },
  {
    emoji: "🎯",
    title: "Даалгавар сонго",
    text: "Хөгжилтэй чалленж сонгоод өдөр бүр хийж үзнэ.",
    bg: "bg-mint-soft",
  },
];

const exercises = [
  { emoji: "🌬️", name: "4-7-8 амьсгал", text: "Бөмбөлөгтэй хамт амьсгал" },
  { emoji: "🖐️", name: "5-4-3-2-1 арга", text: "Мэдрэхүйгээрээ тайвшир" },
  { emoji: "📔", name: "Өдрийн тэмдэглэл", text: "Бодлоо үгээр илэрхийл" },
];

export default function HomeTsesniihesg() {
  return (
    <>
      {/* Хэрхэн ажилладаг вэ */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <h2 className="text-center text-3xl font-black md:text-4xl">Хэрхэн ажилладаг вэ?</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={index}
              className={`relative rounded-[2rem] ${step.bg} p-6 pt-10 text-center`}
            >
              <span className="absolute -top-5 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-night text-lg font-black text-white">
                {index + 1}
              </span>
              <span className="text-5xl" aria-hidden="true">
                {step.emoji}
              </span>
              <p className="mt-3 text-xl font-black">{step.title}</p>
              <p className="mt-1 font-medium text-night/65">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Тайвшруулах дасгал */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-night p-8 text-white md:p-12">
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-grape/40" />
          <div className="pointer-events-none absolute -bottom-16 right-40 h-40 w-40 rounded-full bg-bubble/30" />
          <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-sun">
                Стресс ихэссэн үү?
              </p>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">Түр амсхийе 🫧</h2>
              <p className="mt-3 max-w-md font-medium text-white/75">
                Хэдхэн минутын энгийн дасгалууд сэтгэлийг тайвшруулж, анхаарлаа
                төвлөрүүлэхэд тусална.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                {exercises.map((ex) => (
                  <li key={ex.name} className="rounded-2xl bg-white/10 p-4">
                    <span className="text-2xl" aria-hidden="true">
                      {ex.emoji}
                    </span>
                    <p className="mt-1 font-bold">{ex.name}</p>
                    <p className="text-sm text-white/65">{ex.text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-center gap-5">
              <span className="relative flex h-36 w-36 items-center justify-center">
                <span className="animate-breathe absolute inset-0 rounded-full bg-mint/30" />
                <span className="animate-breathe absolute inset-5 rounded-full bg-mint/50 [animation-delay:.3s]" />
                <span className="h-14 w-14 rounded-full bg-mint" />
              </span>
              <Link
                href="/dasgal"
                className="rounded-2xl bg-sun px-7 py-4 text-lg font-extrabold text-night shadow-[0_6px_0_#e0a800] transition active:translate-y-1 active:shadow-[0_2px_0_#e0a800]"
              >
                Дасгал эхлэх
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Итгэл төрүүлэх хэсэг */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["🔒", "Нууцлалтай", "Хариултыг чинь зөвхөн эрх бүхий сэтгэл зүйч харна."],
            ["💛", "Шүүмжлэлгүй", "Зөв, буруу хариулт гэж байхгүй — чи чи хэвээрээ."],
            ["📞", "Тусламж бий", "Хэцүү байвал 108 руу үнэ төлбөргүй залгаарай."],
          ].map(([emoji, title, text]) => (
            <div key={title} className="flex items-start gap-4 rounded-3xl bg-white p-5 ring-2 ring-[#efe6d2]">
              <span className="text-3xl" aria-hidden="true">
                {emoji}
              </span>
              <div>
                <p className="font-black">{title}</p>
                <p className="text-sm font-medium text-night/65">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
