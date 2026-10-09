import { useState } from "react";
import { useData } from "@/pages/Context/DataContext";
import { getTheme, themes } from "@/lib/themes";
import { api, Button, Card, Field, inputClass, ListEditor, Notice } from "./ui";

const emptyTest = () => ({
  testName: "",
  description: "",
  theme: "sage",
  order: 0,
  question: [""],
  result: [
    { result: "", score: 0 },
    { result: "", score: 1 },
  ],
  levels: [
    { name: "Хэвийн", min: 0, rank: 1, tone: "sage", urgent: false, note: "" },
  ],
});

export default function TestsAdmin() {
  const { test, reload } = useData();
  const [editing, setEditing] = useState(null); // засаж буй тест (хуулбар)
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const startEdit = (t) => {
    setError("");
    setSuccess("");
    setEditing(t ? structuredClone(t) : { ...emptyTest(), order: test.length });
  };
  const set = (key, value) => setEditing({ ...editing, [key]: value });

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const { _id, challenges, ...body } = editing;
      if (_id) await api("PUT", `/api/admin/tests?id=${_id}`, body);
      else await api("POST", "/api/admin/tests", body);
      await reload();
      setEditing(null);
      setSuccess("Тест хадгалагдлаа");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (t) => {
    if (
      !confirm(
        `"${t.testName}" тест болон түүний ${t.challenges.length} даалгаврыг устгах уу? Сурагчдын өмнөх үр дүн хадгалагдана.`
      )
    )
      return;
    try {
      await api("DELETE", `/api/admin/tests?id=${t._id}`);
      await reload();
      setSuccess("Тест устгагдлаа");
    } catch (err) {
      setError(err.message);
    }
  };

  if (editing) {
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-semibold">
            {editing._id ? "Тест засах" : "Шинэ тест"}
          </h2>
          <Button variant="ghost" onClick={() => setEditing(null)}>
            ← Буцах
          </Button>
        </div>

        <Card className="grid gap-4 md:grid-cols-2">
          <Field label="Тестийн нэр">
            <input
              className={inputClass}
              value={editing.testName}
              onChange={(e) => set("testName", e.target.value)}
            />
          </Field>
          <Field label="Өнгө, дүрс">
            <select
              className={inputClass}
              value={editing.theme}
              onChange={(e) => set("theme", e.target.value)}
            >
              {Object.entries(themes).map(([key, t]) => (
                <option key={key} value={key}>
                  {t.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Богино тайлбар (нүүр хуудсанд)" className="md:col-span-2">
            <input
              className={inputClass}
              value={editing.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </Field>
          <Field label="Дараалал (бага нь эхэнд)">
            <input
              type="number"
              className={inputClass}
              value={editing.order}
              onChange={(e) => set("order", e.target.value)}
            />
          </Field>
        </Card>

        <Card>
          <h3 className="mb-3 font-semibold">Асуултууд ({editing.question.length})</h3>
          <ListEditor
            items={editing.question}
            onChange={(v) => set("question", v)}
            newItem={() => ""}
            addLabel="Асуулт нэмэх"
            renderItem={(q, update) => (
              <textarea
                rows={2}
                className={inputClass}
                value={q}
                onChange={(e) => update(e.target.value)}
              />
            )}
          />
        </Card>

        <Card>
          <h3 className="font-semibold">Хариултын сонголтууд</h3>
          <p className="mb-3 text-sm text-muted">
            Асуулт бүрт ижил сонголтууд гарна. Оноо нь нийлбэр оноонд нэмэгдэнэ.
          </p>
          <ListEditor
            items={editing.result}
            onChange={(v) => set("result", v)}
            newItem={() => ({ result: "", score: 0 })}
            addLabel="Сонголт нэмэх"
            renderItem={(r, update) => (
              <div className="flex gap-2">
                <input
                  className={inputClass}
                  placeholder="Хариулт"
                  value={r.result}
                  onChange={(e) => update({ ...r, result: e.target.value })}
                />
                <input
                  type="number"
                  className={inputClass.replace("w-full", "w-24 shrink-0")}
                  title="Оноо"
                  value={r.score}
                  onChange={(e) => update({ ...r, score: e.target.value })}
                />
              </div>
            )}
          />
        </Card>

        <Card>
          <h3 className="font-semibold">Түвшний босго</h3>
          <p className="mb-3 text-sm text-muted">
            Нийт оноо «Доод оноо»-с их буюу тэнцүү бол тухайн түвшин. «Даалгаврын
            зэрэг» нь тухайн түвшинд санал болгох даалгаврын зэрэг. Боломжит оноо:{" "}
            {minMax(editing)}.
          </p>
          <ListEditor
            items={editing.levels}
            onChange={(v) => set("levels", v)}
            newItem={() => ({
              name: "",
              min: 0,
              rank: editing.levels.length + 1,
              tone: "sage",
              urgent: false,
              note: "",
            })}
            addLabel="Түвшин нэмэх"
            renderItem={(l, update) => (
              <div className="grid gap-2 rounded-2xl bg-cream p-3 md:grid-cols-4">
                <Field label="Нэр" className="md:col-span-2">
                  <input
                    className={inputClass}
                    value={l.name}
                    onChange={(e) => update({ ...l, name: e.target.value })}
                  />
                </Field>
                <Field label="Доод оноо">
                  <input
                    type="number"
                    className={inputClass}
                    value={l.min}
                    onChange={(e) => update({ ...l, min: e.target.value })}
                  />
                </Field>
                <Field label="Даалгаврын зэрэг">
                  <input
                    type="number"
                    min="1"
                    className={inputClass}
                    value={l.rank}
                    onChange={(e) => update({ ...l, rank: e.target.value })}
                  />
                </Field>
                <Field label="Сурагчид харагдах зөвлөгөө" className="md:col-span-2">
                  <input
                    className={inputClass}
                    value={l.note}
                    onChange={(e) => update({ ...l, note: e.target.value })}
                  />
                </Field>
                <Field label="Өнгө">
                  <select
                    className={inputClass}
                    value={l.tone}
                    onChange={(e) => update({ ...l, tone: e.target.value })}
                  >
                    {Object.entries(themes).map(([key, t]) => (
                      <option key={key} value={key}>
                        {t.label.split(" · ")[0]}
                      </option>
                    ))}
                  </select>
                </Field>
                <label className="flex items-center gap-2 pt-6 text-sm">
                  <input
                    type="checkbox"
                    checked={l.urgent}
                    onChange={(e) => update({ ...l, urgent: e.target.checked })}
                  />
                  Тусламжийн утас харуулах
                </label>
              </div>
            )}
          />
        </Card>

        <Notice error={error} />
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setEditing(null)}>
            Болих
          </Button>
          <Button onClick={save} disabled={saving}>
            {saving ? "Хадгалж байна..." : "Хадгалах"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl font-semibold">Тестүүд</h2>
        <Button onClick={() => startEdit(null)}>+ Шинэ тест</Button>
      </div>
      <Notice error={error} success={success} />
      {test.map((t) => {
        const meta = getTheme(t.theme);
        return (
          <Card key={t._id} className="flex flex-wrap items-center gap-4">
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${meta.soft} ${meta.text}`}
            >
              <meta.Icon className="h-6 w-6" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-serif text-lg font-semibold">{t.testName}</p>
              <p className="text-sm text-muted">
                {t.question.length} асуулт · {t.result.length} сонголт ·{" "}
                {t.levels.length} түвшин · {t.challenges.length} даалгавар
              </p>
            </div>
            <Button variant="outline" onClick={() => startEdit(t)}>
              Засах
            </Button>
            <Button variant="danger" onClick={() => remove(t)}>
              Устгах
            </Button>
          </Card>
        );
      })}
    </div>
  );
}

// Тухайн тестийн авч болох хамгийн бага, их оноо — босго тохируулахад тусална.
function minMax(t) {
  const scores = t.result.map((r) => Number(r.score)).filter(Number.isFinite);
  if (scores.length === 0) return "—";
  const n = t.question.length;
  return `${Math.min(...scores) * n}–${Math.max(...scores) * n}`;
}
