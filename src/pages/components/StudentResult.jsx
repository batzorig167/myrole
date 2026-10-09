import { useEffect, useMemo, useState } from "react";
import { useUser } from "../Context/UserContext";
import { useData } from "../Context/DataContext";
import { getTheme } from "@/lib/themes";
import { findLevel } from "@/lib/levels";
import { dayCount, inRange, presetRange } from "@/lib/dateRange";
import DateFilter from "@/components/results/DateFilter";
import Stats from "@/components/results/Stats";

// Хуучин үр дүнд category байхгүй бол "Сэтгэл гутрал" гэж үзнэ.
const categoryOf = (row) => row.category || "Сэтгэл гутрал";

const formatDate = (value) =>
  new Date(value).toLocaleString("mn-MN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function StudentResult() {
  const { user } = useUser();
  const { test, schools } = useData();
  const isAdmin = user?.role === "admin";

  const [rows, setRows] = useState([]);
  // Админ эхлээд сургуулиа сонгоно; сургуулийн эрх зөвхөн өөрийнхөө сургуулийг харна
  const [school, setSchool] = useState(isAdmin ? "" : user?.school);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState({ key: "createdAt", dir: -1 });
  const [range, setRange] = useState(presetRange("all"));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Бүх үр дүнг нэг удаа татаж, сургуулиар нь клиент дээр шүүнэ
  useEffect(() => {
    setLoading(true);
    fetch("/api/test-result")
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setRows(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Мөр бүрийн түвшний мэдээлэл (өнгө, анхааруулга)
  const levelOf = (row) => {
    const t = test.find((x) => x.testName === categoryOf(row));
    return t ? findLevel(t.levels, row.score) : null;
  };

  // Сонгосон огнооны хүрээнд багтах үр дүн
  const dateRows = useMemo(
    () => rows.filter((row) => inRange(row.createdAt, range)),
    [rows, range]
  );

  const schoolRows = useMemo(
    () => (school ? dateRows.filter((row) => row.school === school) : dateRows),
    [dateRows, school]
  );

  // Нийт тест, давхардаагүй сурагч, анхаарах, өдөрт дунджаар
  const summarize = (list) => {
    const students = new Set(
      list.map((r) =>
        [r.school, r.lastname, r.firstname, r.class, r.buleg]
          .map((v) => String(v ?? "").trim().toLowerCase())
          .join("|")
      )
    );
    const days = dayCount(range, list.map((r) => r.createdAt));
    return {
      total: list.length,
      students: students.size,
      urgent: list.filter((row) => levelOf(row)?.urgent).length,
      perDay: list.length ? Math.round((list.length / days) * 10) / 10 : 0,
    };
  };

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    const list = schoolRows.filter(
      (row) =>
        !q ||
        [
          row.lastname,
          row.firstname,
          row.class + row.buleg,
          categoryOf(row),
          row.challenge?.name,
          row.tuvshin,
          formatDate(row.createdAt),
        ].some((value) => value?.toString().toLowerCase().includes(q))
    );
    const value = (row) =>
      sort.key === "category" ? categoryOf(row) : String(row[sort.key] ?? "");
    return [...list].sort((a, b) => value(a).localeCompare(value(b)) * sort.dir);
  }, [schoolRows, query, sort]);

  const schoolName = (code) => schools.find((s) => s.code === code)?.name || code;

  const sortBy = (key) =>
    setSort((prev) => ({ key, dir: prev.key === key ? -prev.dir : 1 }));

  const SortButton = ({ field, children }) => (
    <button onClick={() => sortBy(field)} className="font-black hover:underline">
      {children}
      {sort.key === field ? (sort.dir === 1 ? " ↑" : " ↓") : ""}
    </button>
  );

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <span className="loading loading-spinner loading-lg text-coral"></span>
      </div>
    );
  }
  if (error) {
    return <p className="rounded-2xl bg-rose-soft p-4 font-bold text-rose">{error}</p>;
  }

  // ---- Админ: сургууль сонгох ----
  if (isAdmin && !school) {
    const stats = schools.map((s) => {
      const list = dateRows.filter((row) => row.school === s.code);
      return {
        ...s,
        count: list.length,
        urgent: list.filter((row) => levelOf(row)?.urgent).length,
        last: list[0]?.createdAt,
      };
    });
    const colors = [
      "bg-bubble-soft",
      "bg-grape-soft",
      "bg-coral-soft",
      "bg-mint-soft",
      "bg-sun-soft",
      "bg-pink-soft",
    ];
    return (
      <div>
        <p className="text-sm font-bold text-muted">Сургуулийн сэтгэл зүйн тойм</p>
        <h2 className="text-3xl font-black">Сургуулиа сонгоорой 🏫</h2>
        <div className="mt-5 space-y-4">
          <DateFilter range={range} onChange={setRange} />
          <Stats {...summarize(dateRows)} />
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s, i) => (
            <button
              key={s._id}
              onClick={() => setSchool(s.code)}
              className={`pop group flex flex-col rounded-[1.75rem] ${
                colors[i % colors.length]
              } p-5 text-left transition hover:-translate-y-0.5`}
            >
              <span className="text-lg font-black leading-snug">{s.name}</span>
              <span className="mt-4 flex items-end gap-2">
                <span className="text-4xl font-black">{s.count}</span>
                <span className="pb-1 text-sm font-bold text-muted">сурагч тест өгсөн</span>
              </span>
              <span className="mt-3 flex flex-wrap items-center gap-2 text-xs font-black">
                {s.urgent > 0 ? (
                  <span className="rounded-full bg-rose px-2.5 py-1 text-white">
                    ⚠ {s.urgent} анхаарах
                  </span>
                ) : (
                  <span className="rounded-full bg-white px-2.5 py-1 text-sage">
                    ✓ Анхаарах зүйлгүй
                  </span>
                )}
                {s.last && (
                  <span className="text-muted">Сүүлд: {formatDate(s.last).split(",")[0]}</span>
                )}
              </span>
              <span className="mt-4 text-sm font-black text-ink/70 group-hover:underline">
                Үр дүн харах →
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ---- Сонгосон сургуулийн үр дүн ----
  const averages = test.map((t) => {
    const scores = filtered
      .filter((row) => categoryOf(row) === t.testName)
      .map((row) => row.score);
    const max = t.question.length * Math.max(...t.result.map((r) => r.score));
    if (scores.length === 0) {
      return { test: t, label: "Тест бөглөөгүй", count: 0, max };
    }
    const avg = scores.reduce((sum, v) => sum + v, 0) / scores.length;
    return {
      test: t,
      label: findLevel(t.levels, avg)?.name,
      count: scores.length,
      avg: Math.round(avg * 10) / 10,
      max,
    };
  });
  const urgentCount = filtered.filter((row) => levelOf(row)?.urgent).length;
  const summary = summarize(filtered);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          {isAdmin && (
            <button
              onClick={() => {
                setSchool("");
                setQuery("");
                setSearch("");
              }}
              className="mb-2 rounded-full bg-cream px-3 py-1 text-sm font-black text-muted ring-2 ring-line hover:text-ink"
            >
              ← Бүх сургууль
            </button>
          )}
          <h2 className="text-3xl font-black">{schoolName(school)}</h2>
          <p className="font-medium text-muted">
            {schoolRows.length} үр дүн (сонгосон хугацаанд)
            {urgentCount > 0 && (
              <span className="ml-2 rounded-full bg-rose px-2.5 py-0.5 text-xs font-black text-white">
                ⚠ {urgentCount} анхаарах
              </span>
            )}
          </p>
        </div>
        {isAdmin && (
          <select
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className="rounded-2xl border-2 border-line bg-cream px-4 py-2.5 font-bold"
          >
            {schools.map((s) => (
              <option key={s._id} value={s.code}>
                {s.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="mt-5 space-y-4">
        <DateFilter range={range} onChange={setRange} />
        <Stats {...summary} />
      </div>

      <h3 className="mt-8 text-lg font-black">Тест тус бүрийн дундаж</h3>
      <div className="mb-6 mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {averages.map(({ test: t, label, count, avg, max }) => {
          const meta = getTheme(t.theme);
          return (
            <div key={t._id} className={`rounded-[1.75rem] ${meta.card} p-5 text-white`}>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/25">
                  <meta.Icon className="h-5 w-5" />
                </span>
                <h3 className="text-sm font-black text-white/90">{t.testName}</h3>
              </div>
              <p className="mt-3 text-xl font-black leading-tight">{label}</p>
              {count > 0 && (
                <div className="mt-3">
                  <div className="flex items-baseline justify-between text-xs font-bold text-white/85">
                    <span>Дундаж оноо</span>
                    <span>
                      <b className="text-base font-black text-white">{avg}</b> / {max}
                    </span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-white/25">
                    <div
                      className="h-full rounded-full bg-white"
                      style={{ width: `${Math.min(100, (avg / max) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
              <p className="mt-2 text-xs font-bold text-white/80">{count} удаа өгсөн</p>
            </div>
          );
        })}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setQuery(search);
        }}
        className="mb-6 flex flex-wrap gap-3"
      >
        <input
          type="text"
          name="search"
          value={search}
          placeholder="🔍 Нэр, анги, тест, түвшнээр хайх..."
          className="min-w-0 flex-grow rounded-2xl border-2 border-line bg-cream px-5 py-3 font-semibold text-ink focus:border-sage focus:outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="pop rounded-2xl bg-sage px-6 py-3 font-black text-white [--edge:#12704f]"
        >
          Хайх
        </button>
      </form>

      <div className="overflow-x-auto rounded-2xl ring-2 ring-line">
        <table className="min-w-full text-sm text-ink">
          <thead className="bg-cream text-xs uppercase text-muted">
            <tr>
              <th className="p-3">№</th>
              <th className="hidden p-3 md:table-cell">
                <SortButton field="lastname">Овог</SortButton>
              </th>
              <th className="p-3">
                <SortButton field="firstname">Нэр</SortButton>
              </th>
              <th className="p-3">
                <SortButton field="class">Анги</SortButton>
              </th>
              <th className="p-3">
                <SortButton field="category">Тест</SortButton>
              </th>
              <th className="p-3">Сонгосон даалгавар</th>
              <th className="p-3">
                <SortButton field="tuvshin">Түвшин</SortButton>
              </th>
              <th className="p-3">
                <SortButton field="createdAt">Огноо</SortButton>
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((data, index) => {
              const level = levelOf(data);
              const tone = getTheme(level?.tone);
              return (
                <tr key={data._id} className="border-t-2 border-line text-center font-semibold">
                  <td className="p-3 text-muted">{index + 1}</td>
                  <td className="hidden p-3 md:table-cell">{data.lastname}</td>
                  <td className="p-3">{data.firstname}</td>
                  <td className="p-3">{data.class + data.buleg}</td>
                  <td className="p-3">{categoryOf(data)}</td>
                  <td className="p-3 text-left">
                    {data.challenge?.name || <span className="text-muted">Сонгоогүй</span>}
                  </td>
                  <td className="p-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-black ${
                        level ? `${tone.cardSoft} ${tone.cardText}` : "bg-sand text-muted"
                      }`}
                    >
                      {level?.urgent && "⚠ "}
                      {data.tuvshin}
                    </span>
                  </td>
                  <td className="whitespace-nowrap p-3 text-muted">
                    {formatDate(data.createdAt)}
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="p-10 text-center font-bold text-muted">
                  Үр дүн олдсонгүй
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
