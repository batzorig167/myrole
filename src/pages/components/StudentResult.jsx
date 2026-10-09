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
    <button onClick={() => sortBy(field)} className="font-medium hover:text-slate-900">
      {children}
      {sort.key === field ? (sort.dir === 1 ? " ↑" : " ↓") : ""}
    </button>
  );

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <span className="loading loading-spinner loading-md text-slate-400"></span>
      </div>
    );
  }
  if (error) {
    return (
      <p className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        {error}
      </p>
    );
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
    return (
      <div className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">Үр дүн</h1>
            <p className="text-sm text-slate-500">Сургуулиа сонгож дэлгэрэнгүйг харна уу</p>
          </div>
          <DateFilter range={range} onChange={setRange} />
        </div>
        <Stats {...summarize(dateRows)} />
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs font-medium text-slate-500">
              <tr>
                <th className="px-4 py-2.5">Сургууль</th>
                <th className="px-4 py-2.5 text-right">Өгсөн тест</th>
                <th className="px-4 py-2.5 text-right">Анхаарах</th>
                <th className="hidden px-4 py-2.5 sm:table-cell">Сүүлд</th>
                <th className="px-4 py-2.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats.map((s) => (
                <tr
                  key={s._id}
                  onClick={() => setSchool(s.code)}
                  className="cursor-pointer hover:bg-slate-50"
                >
                  <td className="px-4 py-3 font-medium">{s.name}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{s.count}</td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {s.urgent > 0 ? (
                      <span className="rounded bg-red-50 px-2 py-0.5 font-medium text-red-700">
                        {s.urgent}
                      </span>
                    ) : (
                      <span className="text-slate-400">0</span>
                    )}
                  </td>
                  <td className="hidden px-4 py-3 text-slate-500 sm:table-cell">
                    {s.last ? formatDate(s.last).split(",")[0] : "—"}
                  </td>
                  <td className="px-4 py-3 text-right text-slate-400">Харах →</td>
                </tr>
              ))}
            </tbody>
          </table>
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
      return { test: t, label: "—", count: 0, max };
    }
    const avg = scores.reduce((sum, v) => sum + v, 0) / scores.length;
    const level = findLevel(t.levels, avg);
    return {
      test: t,
      label: level?.name,
      urgent: level?.urgent,
      count: scores.length,
      avg: Math.round(avg * 10) / 10,
      max,
    };
  });
  const summary = summarize(filtered);

  const badge = {
    sage: "bg-emerald-50 text-emerald-700",
    sky: "bg-sky-50 text-sky-700",
    peach: "bg-amber-50 text-amber-800",
    lavender: "bg-violet-50 text-violet-700",
    rose: "bg-red-50 text-red-700",
  };

  return (
    <div className="space-y-5">
      <div>
        {isAdmin && (
          <button
            onClick={() => {
              setSchool("");
              setQuery("");
              setSearch("");
            }}
            className="mb-1 text-sm text-slate-500 hover:text-slate-900"
          >
            ← Бүх сургууль
          </button>
        )}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold">{schoolName(school)}</h1>
            {isAdmin && (
              <select
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm shadow-sm"
                aria-label="Сургууль солих"
              >
                {schools.map((s) => (
                  <option key={s._id} value={s.code}>
                    {s.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <DateFilter range={range} onChange={setRange} />
        </div>
      </div>

      <Stats {...summary} />

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-4 py-2.5 text-sm font-medium">
          Тест тус бүрийн дундаж
        </div>
        <div className="grid divide-y divide-slate-100 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {averages.map(({ test: t, label, urgent, count, avg, max }) => (
            <div key={t._id} className="px-4 py-4">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span className={`h-2.5 w-2.5 rounded-full ${getTheme(t.theme).card}`} />
                {t.testName}
              </div>
              <p className={`mt-1 font-semibold ${urgent ? "text-red-600" : "text-slate-900"}`}>
                {label}
              </p>
              {count > 0 ? (
                <>
                  <div className="mt-2 flex items-baseline justify-between text-xs text-slate-500">
                    <span>Дундаж оноо</span>
                    <span className="tabular-nums">
                      <b className="text-sm font-semibold text-slate-900">{avg}</b> / {max}
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-slate-700"
                      style={{ width: `${Math.min(100, (avg / max) * 100)}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-slate-400">{count} удаа өгсөн</p>
                </>
              ) : (
                <p className="mt-2 text-xs text-slate-400">Энэ хугацаанд өгөөгүй</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setQuery(search);
          }}
          className="flex flex-wrap items-center gap-2 border-b border-slate-200 p-3"
        >
          <input
            type="text"
            name="search"
            value={search}
            placeholder="Нэр, анги, тест, түвшнээр хайх..."
            className="min-w-0 flex-grow rounded-md border border-slate-300 px-3 py-1.5 text-sm shadow-sm focus:border-slate-500 focus:outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700"
          >
            Хайх
          </button>
          <span className="text-sm text-slate-500">{filtered.length} мөр</span>
        </form>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs text-slate-500">
              <tr>
                <th className="px-4 py-2.5 font-medium">№</th>
                <th className="hidden px-4 py-2.5 md:table-cell">
                  <SortButton field="lastname">Овог</SortButton>
                </th>
                <th className="px-4 py-2.5">
                  <SortButton field="firstname">Нэр</SortButton>
                </th>
                <th className="px-4 py-2.5">
                  <SortButton field="class">Анги</SortButton>
                </th>
                <th className="px-4 py-2.5">
                  <SortButton field="category">Тест</SortButton>
                </th>
                <th className="px-4 py-2.5 font-medium">Сонгосон даалгавар</th>
                <th className="px-4 py-2.5">
                  <SortButton field="tuvshin">Түвшин</SortButton>
                </th>
                <th className="px-4 py-2.5">
                  <SortButton field="createdAt">Огноо</SortButton>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((data, index) => {
                const level = levelOf(data);
                return (
                  <tr key={data._id} className="hover:bg-slate-50">
                    <td className="px-4 py-2.5 text-slate-400 tabular-nums">{index + 1}</td>
                    <td className="hidden px-4 py-2.5 md:table-cell">{data.lastname}</td>
                    <td className="px-4 py-2.5">{data.firstname}</td>
                    <td className="px-4 py-2.5">{data.class + data.buleg}</td>
                    <td className="px-4 py-2.5">{categoryOf(data)}</td>
                    <td className="px-4 py-2.5 text-slate-600">
                      {data.challenge?.name || <span className="text-slate-400">—</span>}
                    </td>
                    <td className="px-4 py-2.5">
                      <span
                        className={`inline-block whitespace-nowrap rounded px-2 py-0.5 text-xs font-medium ${
                          level ? badge[level.tone] || badge.sage : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {data.tuvshin}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-slate-500 tabular-nums">
                      {formatDate(data.createdAt)}
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-slate-500">
                    Үр дүн олдсонгүй
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
