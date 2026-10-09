import { useEffect, useMemo, useState } from "react";
import { useUser } from "../Context/UserContext";
import { useData } from "../Context/DataContext";
import { getTheme } from "@/lib/themes";
import { findLevel } from "@/lib/levels";

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
  const [school, setSchool] = useState(isAdmin ? "" : user?.school);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState({ key: "createdAt", dir: -1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const params = isAdmin && school ? `?school=${encodeURIComponent(school)}` : "";
    fetch(`/api/test-result${params}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setRows(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [isAdmin, school]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    const list = rows.filter(
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
    return list.sort((a, b) => value(a).localeCompare(value(b)) * sort.dir);
  }, [rows, query, sort]);

  // Тест бүрийн дундаж оноо ба түүнд харгалзах түвшин
  const averages = test.map((t) => {
    const scores = filtered
      .filter((row) => categoryOf(row) === t.testName)
      .map((row) => row.score);
    if (scores.length === 0) {
      return { test: t, label: "Тест бөглөөгүй", count: 0 };
    }
    const avg = scores.reduce((sum, s) => sum + s, 0) / scores.length;
    return { test: t, label: findLevel(t.levels, avg)?.name, count: scores.length };
  });

  const sortBy = (key) =>
    setSort((prev) => ({ key, dir: prev.key === key ? -prev.dir : 1 }));

  const schoolName = (code) => schools.find((s) => s.code === code)?.name || code;

  const SortButton = ({ field, children }) => (
    <button onClick={() => sortBy(field)} className="hover:underline">
      {children}
      {sort.key === field ? (sort.dir === 1 ? " ↑" : " ↓") : ""}
    </button>
  );

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted">Сургуулийн сэтгэл зүйн тойм</p>
          <h2 className="font-serif text-2xl font-semibold">
            {isAdmin
              ? school
                ? schoolName(school)
                : "Бүх сургууль"
              : schoolName(user?.school)}
          </h2>
        </div>
        {isAdmin && (
          <select
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className="rounded-full border border-line bg-cream px-4 py-2.5"
          >
            <option value="">Бүх сургууль</option>
            {schools.map((s) => (
              <option key={s._id} value={s.code}>
                {s.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {averages.map(({ test: t, label, count }) => {
          const meta = getTheme(t.theme);
          return (
            <div key={t._id} className={`rounded-3xl ${meta.soft} p-5`}>
              <div className="flex items-center gap-2">
                <meta.Icon className={`h-5 w-5 ${meta.text}`} />
                <h3 className="text-sm font-semibold text-ink/80">
                  {t.testName} · дундаж
                </h3>
              </div>
              <p className={`mt-3 font-serif text-xl font-semibold ${meta.text}`}>
                {label}
              </p>
              <p className="mt-1 text-xs text-muted">{count} сурагч</p>
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
          placeholder="Нэр, анги, тест, түвшнээр хайх..."
          className="min-w-0 flex-grow rounded-full border border-line bg-cream px-5 py-2.5 text-ink focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/30"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-full bg-sage px-6 py-2.5 font-semibold text-white transition hover:bg-sage-dark"
        >
          Хайх
        </button>
      </form>

      {loading ? (
        <div className="flex justify-center py-16">
          <span className="loading loading-spinner text-sage"></span>
        </div>
      ) : error ? (
        <p className="rounded-2xl bg-rose-soft p-4 text-rose">{error}</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl ring-1 ring-line">
          <table className="min-w-full text-sm text-ink">
            <thead className="bg-sage-soft text-xs uppercase text-sage-dark">
              <tr>
                <th className="p-2">№</th>
                <th className="hidden p-2 md:table-cell">
                  <SortButton field="lastname">Овог</SortButton>
                </th>
                <th className="p-2">
                  <SortButton field="firstname">Нэр</SortButton>
                </th>
                {isAdmin && !school && <th className="p-2">Сургууль</th>}
                <th className="p-2">
                  <SortButton field="class">Анги</SortButton>
                </th>
                <th className="p-2">
                  <SortButton field="category">Тест</SortButton>
                </th>
                <th className="p-2">Тест даалгавар</th>
                <th className="p-2">
                  <SortButton field="tuvshin">Түвшин</SortButton>
                </th>
                <th className="p-2">
                  <SortButton field="createdAt">Огноо</SortButton>
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((data, index) => (
                <tr
                  key={data._id}
                  className="border-t border-line text-center odd:bg-white even:bg-cream"
                >
                  <td className="p-2">{index + 1}</td>
                  <td className="hidden p-2 md:table-cell">{data.lastname}</td>
                  <td className="p-2">{data.firstname}</td>
                  {isAdmin && !school && (
                    <td className="p-2">{schoolName(data.school)}</td>
                  )}
                  <td className="p-2">{data.class + data.buleg}</td>
                  <td className="p-2">{categoryOf(data)}</td>
                  <td className="p-2">
                    {data.challenge?.name || "Чалленж сонгоогүй"}
                  </td>
                  <td className="p-2">{data.tuvshin}</td>
                  <td className="p-2">{formatDate(data.createdAt)}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-muted">
                    Үр дүн олдсонгүй
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
