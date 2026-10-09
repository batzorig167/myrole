import { presetRange } from "@/lib/dateRange";

const PRESETS = [
  { key: "today", label: "Өнөөдөр" },
  { key: "week", label: "7 хоног" },
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
    "rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="inline-flex rounded-md border border-slate-300 bg-white p-0.5 shadow-sm">
        {PRESETS.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => onChange(presetRange(p.key))}
            aria-pressed={activePreset === p.key}
            className={`rounded px-3 py-1.5 text-sm font-medium transition ${
              activePreset === p.key
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <input
          type="date"
          aria-label="Эхлэх өдөр"
          value={range.from}
          max={range.to || undefined}
          onChange={(e) => onChange({ ...range, from: e.target.value })}
          className={dateClass}
        />
        <span>—</span>
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
