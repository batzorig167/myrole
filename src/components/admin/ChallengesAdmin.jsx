import { useState } from "react";
import { useData } from "@/pages/Context/DataContext";
import { api, Button, Card, Field, inputClass, ListEditor, Notice } from "./ui";

const emptyChallenge = (rank = 1) => ({
  name: "",
  rank,
  daalgavar: "",
  example: [],
  zorilgo: "",
});

export default function ChallengesAdmin() {
  const { test, reload } = useData();
  const [testIndex, setTestIndex] = useState(0);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const current = test[testIndex];
  if (!current) {
    return <p className="text-slate-500">Эхлээд тест нэмнэ үү.</p>;
  }

  // Түвшин бүрийн зэргээр бүлэглэнэ
  const ranks = [
    ...new Set([
      ...current.levels.map((l) => Number(l.rank)),
      ...current.challenges.map((c) => c.rank),
    ]),
  ].sort((a, b) => a - b);
  const levelNames = (rank) =>
    current.levels
      .filter((l) => Number(l.rank) === rank)
      .map((l) => l.name)
      .join(", ") || "Ямар ч түвшинд холбогдоогүй";

  const set = (key, value) => setEditing({ ...editing, [key]: value });

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const { _id, testId, ...body } = editing;
      if (_id) await api("PUT", `/api/admin/challenges?id=${_id}`, body);
      else await api("POST", "/api/admin/challenges", { ...body, testId: current._id });
      await reload();
      setEditing(null);
      setSuccess("Даалгавар хадгалагдлаа");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (c) => {
    if (!confirm(`"${c.name}" даалгаврыг устгах уу?`)) return;
    try {
      await api("DELETE", `/api/admin/challenges?id=${c._id}`);
      await reload();
      setSuccess("Даалгавар устгагдлаа");
    } catch (err) {
      setError(err.message);
    }
  };

  if (editing) {
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {editing._id ? "Даалгавар засах" : "Шинэ даалгавар"} · {current.testName}
          </h2>
          <Button variant="ghost" onClick={() => setEditing(null)}>
            ← Буцах
          </Button>
        </div>
        <Card className="grid gap-4 md:grid-cols-4">
          <Field label="Нэр" className="md:col-span-3">
            <input
              className={inputClass}
              value={editing.name}
              onChange={(e) => set("name", e.target.value)}
            />
          </Field>
          <Field label="Зэрэг">
            <input
              type="number"
              min="1"
              className={inputClass}
              value={editing.rank}
              onChange={(e) => set("rank", e.target.value)}
            />
          </Field>
          <Field label="Даалгавар" className="md:col-span-4">
            <textarea
              rows={3}
              className={inputClass}
              value={editing.daalgavar}
              onChange={(e) => set("daalgavar", e.target.value)}
            />
          </Field>
          <Field label="Зорилго" className="md:col-span-4">
            <textarea
              rows={2}
              className={inputClass}
              value={editing.zorilgo}
              onChange={(e) => set("zorilgo", e.target.value)}
            />
          </Field>
          <div className="md:col-span-4">
            <p className="mb-2 text-sm font-semibold">Жишээнүүд</p>
            <ListEditor
              items={editing.example}
              onChange={(v) => set("example", v)}
              newItem={() => ""}
              addLabel="Жишээ нэмэх"
              renderItem={(ex, update) => (
                <input
                  className={inputClass}
                  value={ex}
                  onChange={(e) => update(e.target.value)}
                />
              )}
            />
          </div>
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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Даалгаврууд</h2>
        <select
          className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2"
          value={testIndex}
          onChange={(e) => {
            setTestIndex(Number(e.target.value));
            setSuccess("");
          }}
        >
          {test.map((t, i) => (
            <option key={t._id} value={i}>
              {t.testName}
            </option>
          ))}
        </select>
      </div>
      <Notice error={error} success={success} />
      {ranks.map((rank) => {
        const items = current.challenges.filter((c) => c.rank === rank);
        return (
          <Card key={rank}>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold">Зэрэг {rank}</p>
                <p className="text-sm text-slate-500">{levelNames(rank)}</p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setError("");
                  setEditing(emptyChallenge(rank));
                }}
              >
                + Нэмэх
              </Button>
            </div>
            {items.length === 0 && (
              <p className="text-sm text-slate-500">Даалгавар алга</p>
            )}
            <ul className="divide-y divide-slate-100">
              {items.map((c) => (
                <li key={c._id} className="flex items-center gap-2 py-2">
                  <span className="min-w-0 flex-1">{c.name}</span>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setError("");
                      setEditing(structuredClone(c));
                    }}
                  >
                    Засах
                  </Button>
                  <Button variant="danger" onClick={() => remove(c)}>
                    Устгах
                  </Button>
                </li>
              ))}
            </ul>
          </Card>
        );
      })}
    </div>
  );
}
