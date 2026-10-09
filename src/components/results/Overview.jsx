import { getTheme } from "@/lib/themes";

// Тестийн өнгө (дарааллыг CVD validator-оор шалгасан: зэргэлдээ өнгө ялгагдана)
const TEST_COLORS = {
  sky: "#3d9cf0",
  peach: "#ff7a59",
  sage: "#2fbf8f",
  lavender: "#8b5cf6",
  rose: "#f2558c",
};
const COLOR_ORDER = ["sky", "peach", "sage", "lavender", "rose"];

// Түвшний өнгө — төлөв (сайн → ноцтой)
const LEVEL_COLORS = {
  sage: { bar: "#10b981", text: "text-emerald-700" },
  sky: { bar: "#0ea5e9", text: "text-sky-700" },
  peach: { bar: "#f59e0b", text: "text-amber-700" },
  lavender: { bar: "#8b5cf6", text: "text-violet-700" },
  rose: { bar: "#ef4444", text: "text-red-600" },
};
const LEVEL_ORDER = ["Хэвийн", "Хөнгөн", "Дунд зэрэг", "Хүчтэй", "Маш хүчтэй"];

const categoryOf = (row) => row.category || "Сэтгэл гутрал";

export function timeAgo(value, now = Date.now()) {
  const diff = Math.max(0, now - new Date(value).getTime());
  const min = Math.floor(diff / 60000);
  if (min < 1) return "Саяхан";
  if (min < 60) return `${min} минутын өмнө`;
  const hours = Math.floor(min / 60);
  if (hours < 24) return `${hours} цагийн өмнө`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} өдрийн өмнө`;
  return new Date(value).toLocaleDateString("mn-MN");
}

function Panel({ title, children, className = "" }) {
  return (
    <section className={`rounded-xl border border-slate-200 bg-white p-5 ${className}`}>
      <h3 className="text-sm text-slate-500">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function WarningIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 3 2 20h20L12 3Z" />
      <path d="M12 10v4M12 17h.01" />
    </svg>
  );
}

// Хагас тойрог хэмжигч
function Gauge({ value }) {
  const r = 70;
  const len = Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 180 104" className="w-44" role="img" aria-label={`${pct}%`}>
        <path d={`M20 90 A${r} ${r} 0 0 1 160 90`} fill="none" stroke="#f1f5f9" strokeWidth="14" strokeLinecap="round" />
        <path
          d={`M20 90 A${r} ${r} 0 0 1 160 90`}
          fill="none"
          stroke="#10b981"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={`${(len * pct) / 100} ${len}`}
        >
          <title>{pct}%</title>
        </path>
      </svg>
      <div className="-mt-1 flex w-44 justify-between text-xs text-slate-400">
        <span>0%</span>
        <span>100%</span>
      </div>
      <p className="mt-2 text-4xl font-semibold tabular-nums">{pct}%</p>
    </div>
  );
}

// Бөөрөнхий график — сегмент хооронд 2px зай
function Donut({ items, total }) {
  const r = 36;
  const c = 2 * Math.PI * r;
  const gap = items.filter((i) => i.value > 0).length > 1 ? 2 : 0;
  let offset = 0;
  return (
    <svg viewBox="0 0 100 100" className="h-28 w-28 shrink-0 -rotate-90" role="img" aria-label="Тестээр">
      <circle cx="50" cy="50" r={r} fill="none" stroke="#f1f5f9" strokeWidth="14" />
      {items.map((item) => {
        if (!item.value) return null;
        const len = (item.value / total) * c;
        const seg = (
          <circle
            key={item.key}
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={item.color}
            strokeWidth="14"
            strokeDasharray={`${Math.max(len - gap, 0.5)} ${c}`}
            strokeDashoffset={-offset}
            className="transition-opacity hover:opacity-80"
          >
            <title>
              {item.label}: {item.value}
            </title>
          </circle>
        );
        offset += len;
        return seg;
      })}
    </svg>
  );
}

export default function Overview({
  rows,
  tests,
  schools,
  summary,
  levelOf,
  showSchools,
  onSelectSchool,
  schoolName,
}) {
  const total = rows.length;
  const okPct = total ? Math.round(((total - summary.urgent) / total) * 100) : 0;
  const lastWeek = rows.filter(
    (r) => Date.now() - new Date(r.createdAt).getTime() < 7 * 86400000
  ).length;

  // Тестээр
  const byTest = tests
    .map((t) => ({
      key: t._id,
      label: t.testName,
      theme: t.theme,
      value: rows.filter((r) => categoryOf(r) === t.testName).length,
    }))
    .sort((a, b) => COLOR_ORDER.indexOf(a.theme) - COLOR_ORDER.indexOf(b.theme))
    .map((t) => ({ ...t, color: TEST_COLORS[t.theme] || TEST_COLORS.sky }));

  const topTest = [...byTest].sort((a, b) => b.value - a.value)[0];

  // Түвшнээр
  const levelMap = new Map();
  rows.forEach((r) => {
    const level = levelOf(r);
    const name = r.tuvshin || level?.name || "—";
    const entry = levelMap.get(name) || { name, count: 0, tone: level?.tone || "sky" };
    entry.count += 1;
    levelMap.set(name, entry);
  });
  const rank = (n) => (LEVEL_ORDER.includes(n) ? LEVEL_ORDER.indexOf(n) : LEVEL_ORDER.length);
  const byLevel = [...levelMap.values()].sort((a, b) => rank(a.name) - rank(b.name) || b.count - a.count);
  const maxLevel = Math.max(1, ...byLevel.map((l) => l.count));

  // Сургуулиар эсвэл ангиар
  const groups = showSchools
    ? schools.map((s) => {
        const list = rows.filter((r) => r.school === s.code);
        return {
          key: s.code,
          label: s.name,
          total: list.length,
          urgent: list.filter((r) => levelOf(r)?.urgent).length,
        };
      })
    : Object.values(
        rows.reduce((acc, r) => {
          const key = `${r.class}${r.buleg}`;
          acc[key] ||= { key, label: `${r.class}${String(r.buleg).toUpperCase()} анги`, total: 0, urgent: 0 };
          acc[key].total += 1;
          if (levelOf(r)?.urgent) acc[key].urgent += 1;
          return acc;
        }, {})
      );
  groups.sort((a, b) => b.urgent - a.urgent || b.total - a.total);

  // Анхаарах сурагчид — сурагч бүрийн хамгийн сүүлийн анхаарах үр дүн
  const seen = new Set();
  const urgentStudents = rows
    .filter((r) => levelOf(r)?.urgent)
    .filter((r) => {
      const key = [r.school, r.lastname, r.firstname, r.class, r.buleg].join("|");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

  const recent = rows.slice(0, 6);
  const testTheme = (name) => tests.find((t) => t.testName === name)?.theme;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {/* Нийт */}
        <Panel title="Нийт өгсөн тест">
          <p className="text-5xl font-semibold tabular-nums">{total}</p>
          <p className="mt-1 text-sm text-slate-500">{summary.students} сурагч</p>
          <div className="mt-4 flex items-center justify-between rounded-lg border-l-4 border-amber-400 bg-slate-50 px-4 py-3">
            <div>
              <p className="text-2xl font-semibold tabular-nums">{summary.urgent}</p>
              <p className="text-sm text-slate-500">Анхаарах шаардлагатай</p>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500">
              <WarningIcon className="h-5 w-5" />
            </span>
          </div>
        </Panel>

        {/* Идэвх */}
        <Panel title="Идэвхийн статистик">
          <p className="text-3xl font-semibold tabular-nums">
            {summary.perDay} <span className="text-sm font-normal text-slate-500">тест/өдөр</span>
          </p>
          <p className="text-sm text-slate-500">Өдөрт дунджаар</p>
          <div className="my-3 border-t border-slate-100" />
          <p className="flex items-center gap-2 text-sm text-slate-500">
            <span className="text-lg font-semibold text-emerald-600 tabular-nums">↗ {lastWeek}</span>
            сүүлийн 7 хоногт
          </p>
          <div className="my-3 border-t border-slate-100" />
          <p className="truncate text-lg font-semibold" title={topTest?.label}>
            {topTest?.value ? topTest.label : "—"}
          </p>
          <p className="text-sm text-slate-500">
            Хамгийн их өгсөн тест{topTest?.value ? ` · ${topTest.value}` : ""}
          </p>
        </Panel>

        {/* Хэмжигч */}
        <Panel title="Анхаарал шаардлагагүй хувь">
          <div className="pt-2">
            <Gauge value={okPct} />
          </div>
        </Panel>

        {/* Тестээр */}
        <Panel title="Тестээр" className="bg-violet-50/60">
          <div className="flex flex-col items-center gap-4">
            <Donut items={byTest} total={Math.max(1, total)} />
            <ul className="w-full space-y-1.5 text-sm">
              {byTest.map((t) => (
                <li key={t.key} className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: t.color }} />
                  <span className="min-w-0 flex-1 truncate">{t.label}</span>
                  <span className="font-semibold tabular-nums">{t.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </Panel>

        {/* Сургуулиар / Ангиар */}
        <Panel title={showSchools ? "Сургуулиар" : "Ангиар"}>
          <div className="flex justify-between border-b border-slate-100 pb-2 text-xs text-slate-400">
            <span>Нэр</span>
            <span>Анхаарах / Нийт</span>
          </div>
          <ul className="mt-1 divide-y divide-slate-50">
            {groups.slice(0, 6).map((g) => (
              <li key={g.key}>
                <button
                  type="button"
                  disabled={!showSchools}
                  onClick={() => onSelectSchool?.(g.key)}
                  className="flex w-full items-center justify-between gap-2 py-2 text-left text-sm enabled:hover:text-slate-900 disabled:cursor-default"
                >
                  <span className="min-w-0 truncate">{g.label}</span>
                  <span className="shrink-0 tabular-nums">
                    <b className={g.urgent ? "text-red-600" : "text-slate-900"}>{g.urgent}</b>
                    <span className="text-slate-400">/{g.total}</span>
                  </span>
                </button>
              </li>
            ))}
            {groups.length === 0 && <li className="py-2 text-sm text-slate-400">Мэдээлэл алга</li>}
          </ul>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Түвшнээр */}
        <Panel title="Түвшнээр">
          <ul className="space-y-4">
            {byLevel.map((l) => {
              const color = LEVEL_COLORS[l.tone] || LEVEL_COLORS.sky;
              return (
                <li key={l.name}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color.bar }} />
                      {l.name}
                    </span>
                    <span className="tabular-nums text-slate-500">{l.count}</span>
                  </div>
                  <div className="mt-1.5 h-2 rounded-full bg-slate-100" title={`${l.name}: ${l.count}`}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${(l.count / maxLevel) * 100}%`, backgroundColor: color.bar }}
                    />
                  </div>
                </li>
              );
            })}
            {byLevel.length === 0 && <li className="text-sm text-slate-400">Мэдээлэл алга</li>}
          </ul>
        </Panel>

        {/* Сүүлийн үр дүн */}
        <Panel title="Сүүлийн үр дүнгүүд">
          <ul className="space-y-3">
            {recent.map((r) => {
              const level = levelOf(r);
              const theme = getTheme(testTheme(categoryOf(r)));
              return (
                <li key={r._id} className="flex items-center gap-3">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${theme.soft} ${theme.text}`}>
                    <theme.Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {r.firstname} {r.lastname}
                      <span className="font-normal text-slate-400"> · {r.class}{r.buleg}</span>
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {categoryOf(r)} · {timeAgo(r.createdAt)}
                    </p>
                  </div>
                  <span
                    title={r.tuvshin}
                    className={`max-w-[38%] shrink-0 truncate rounded px-2 py-0.5 text-xs font-medium ${
                      level?.urgent ? "bg-red-50 text-red-700" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {r.tuvshin}
                  </span>
                </li>
              );
            })}
            {recent.length === 0 && <li className="text-sm text-slate-400">Мэдээлэл алга</li>}
          </ul>
        </Panel>

        {/* Анхаарах сурагчид */}
        <Panel title="Анхаарах сурагчид">
          <div className="flex justify-between border-b border-slate-100 pb-2 text-xs text-slate-400">
            <span>Нэр</span>
            <span>Түвшин</span>
          </div>
          <ul className="divide-y divide-slate-50">
            {urgentStudents.slice(0, 8).map((r) => (
              <li key={r._id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                <span className="min-w-0">
                  <span className="block truncate font-medium">
                    {r.firstname} {r.lastname}
                  </span>
                  <span className="block truncate text-xs text-slate-500">
                    {r.class}{r.buleg}
                    {showSchools && ` · ${schoolName(r.school)}`} · {categoryOf(r)}
                  </span>
                </span>
                <span className="shrink-0 font-medium text-red-600">{r.tuvshin}</span>
              </li>
            ))}
            {urgentStudents.length === 0 && (
              <li className="py-3 text-sm text-emerald-700">✓ Анхаарах сурагч алга</li>
            )}
          </ul>
          {urgentStudents.length > 8 && (
            <p className="mt-2 text-xs text-slate-400">+{urgentStudents.length - 8} сурагч — «Жагсаалт» хэсгээс харна уу</p>
          )}
        </Panel>
      </div>
    </div>
  );
}
