// Сонгосон хугацааны ерөнхий тоон үзүүлэлт
export default function Stats({ total, students, urgent, perDay }) {
  const urgentPct = total ? Math.round((urgent / total) * 100) : 0;
  const tiles = [
    { label: "Нийт өгсөн тест", value: total, note: "үр дүн" },
    { label: "Сурагч", value: students, note: "давхардаагүй" },
    {
      label: "Анхаарах",
      value: urgent,
      note: total ? `нийтийн ${urgentPct}%` : "—",
      alert: urgent > 0,
    },
    { label: "Өдөрт дунджаар", value: perDay, note: "тест" },
  ];
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 lg:grid-cols-4">
      {tiles.map((t) => (
        <div key={t.label} className="bg-white px-5 py-4">
          <p className="text-sm text-slate-500">{t.label}</p>
          <p className={`mt-1 text-3xl font-semibold tabular-nums ${t.alert ? "text-red-600" : "text-slate-900"}`}>
            {t.value}
          </p>
          <p className="text-xs text-slate-400">{t.note}</p>
        </div>
      ))}
    </div>
  );
}
