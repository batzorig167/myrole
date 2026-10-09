import { presetRange } from "@/lib/dateRange";

const PRESETS = [
  { key: "today", label: "Өнөөдөр" },
  { key: "week", label: "Сүүлийн 7 хоног" },
  { key: "month", label: "Энэ сар" },
  { key: "all", label: "Бүгд" },
];

// Огнооны хүрээ сонгох: бэлэн товч эсвэл эхлэх/дуусах өдөр
export default function DateFilter({ range, onChange }) {
  const activePreset = PRESETS.find((p) => {
    const r = presetRange(p.key);
    return r.from === range.from && r.to === range.to;
  })?.key;

  const dateClass =
    "rounded-xl border-2 border-line bg-white px-3 py-2 text-sm font-bold text-ink focus:border-sage focus:outline-none";

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-[1.5rem] bg-cream p-2 ring-2 ring-line">
      <span className="px-2 text-sm font-black" aria-hidden="true">
        📅
      </span>
      {PRESETS.map((p) => (
        <button
          key={p.key}
          type="button"
          onClick={() => onChange(presetRange(p.key))}
          aria-pressed={activePreset === p.key}
          className={`rounded-xl px-3 py-2 text-sm font-black transition ${
            activePreset === p.key
              ? "pop bg-ink text-white [--edge:#000]"
              : "bg-white text-muted ring-2 ring-line hover:text-ink"
          }`}
        >
          {p.label}
        </button>
      ))}
      <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
        <input
          type="date"
          aria-label="Эхлэх өдөр"
          value={range.from}
          max={range.to || undefined}
          onChange={(e) => onChange({ ...range, from: e.target.value })}
          className={dateClass}
        />
        <span className="font-black text-muted">—</span>
        <input
          type="date"
          aria-label="Дуусах өдөр"
          value={range.to}
          min={range.from || undefined}
          onChange={(e) => onChange({ ...range, to: e.target.value })}
          className={dateClass}
        />
      </div>
    </div>
  );
}
