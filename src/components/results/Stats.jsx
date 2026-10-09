// Сонгосон хугацааны ерөнхий тоон үзүүлэлт
export default function Stats({ total, students, urgent, perDay }) {
  const urgentPct = total ? Math.round((urgent / total) * 100) : 0;
  const tiles = [
    { label: "Нийт өгсөн тест", value: total, note: "үр дүн", bg: "bg-bubble-soft", text: "text-sky" },
    { label: "Сурагч", value: students, note: "давхардаагүй", bg: "bg-grape-soft", text: "text-lavender" },
    {
      label: "Анхаарах",
      value: urgent,
      note: total ? `нийтийн ${urgentPct}%` : "—",
      bg: urgent ? "bg-pink-soft" : "bg-mint-soft",
      text: urgent ? "text-rose" : "text-sage",
    },
    { label: "Өдөрт дунджаар", value: perDay, note: "тест", bg: "bg-sun-soft", text: "text-[#b07d00]" },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {tiles.map((t) => (
        <div key={t.label} className={`rounded-[1.5rem] ${t.bg} px-5 py-4`}>
          <p className="text-xs font-black uppercase tracking-wide text-muted">{t.label}</p>
          <p className={`mt-1 text-4xl font-black ${t.text}`}>{t.value}</p>
          <p className="text-xs font-bold text-muted">{t.note}</p>
        </div>
      ))}
    </div>
  );
}
