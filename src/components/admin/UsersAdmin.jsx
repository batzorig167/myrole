import { useEffect, useState } from "react";
import { useData } from "@/pages/Context/DataContext";
import { useUser } from "@/pages/Context/UserContext";
import { ROLES } from "@/lib/roles";
import { api, Button, Card, Field, inputClass, Notice } from "./ui";

const emptyUser = () => ({
  username: "",
  password: "",
  name: "",
  school: "",
  role: "psychologist",
  active: true,
});

export default function UsersAdmin() {
  const { schools } = useData();
  const { user: me } = useUser();
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const load = () =>
    api("GET", "/api/admin/users")
      .then(setUsers)
      .catch((err) => setError(err.message));

  useEffect(() => {
    load();
  }, []);

  const schoolName = (code) =>
    schools.find((s) => s.code === code)?.name || code || "—";
  const set = (key, value) => setEditing({ ...editing, [key]: value });

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const { _id, ...body } = editing;
      if (_id) await api("PUT", `/api/admin/users?id=${_id}`, body);
      else await api("POST", "/api/admin/users", body);
      await load();
      setEditing(null);
      setSuccess("Хэрэглэгч хадгалагдлаа");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Нэг товшилтоор эрхийг идэвхжүүлэх/хаах
  const toggleActive = async (u) => {
    setError("");
    try {
      await api("PUT", `/api/admin/users?id=${u._id}`, { ...u, active: !u.active });
      await load();
      setSuccess(
        `${u.username} — ${u.active ? "эрхийг хаалаа" : "эрхийг нээлээ"}`
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const remove = async (u) => {
    if (!confirm(`"${u.username}" хэрэглэгчийг бүр мөсөн устгах уу?`)) return;
    try {
      await api("DELETE", `/api/admin/users?id=${u._id}`);
      await load();
      setSuccess("Хэрэглэгч устгагдлаа");
    } catch (err) {
      setError(err.message);
    }
  };

  if (editing) {
    const isSelf = editing._id === me?._id;
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-semibold">
            {editing._id ? `${editing.username} засах` : "Шинэ хэрэглэгч"}
          </h2>
          <Button variant="ghost" onClick={() => setEditing(null)}>
            ← Буцах
          </Button>
        </div>
        <Card className="grid gap-4 md:grid-cols-2">
          {!editing._id && (
            <Field label="Нэвтрэх нэр">
              <input
                className={inputClass}
                autoComplete="off"
                value={editing.username}
                onChange={(e) => set("username", e.target.value)}
              />
            </Field>
          )}
          <Field
            label={
              editing._id ? "Шинэ нууц үг (солихгүй бол хоосон)" : "Нууц үг (8+ тэмдэгт)"
            }
          >
            <input
              type="password"
              autoComplete="new-password"
              className={inputClass}
              value={editing.password || ""}
              onChange={(e) => set("password", e.target.value)}
            />
          </Field>
          <Field label="Нэр">
            <input
              className={inputClass}
              value={editing.name}
              onChange={(e) => set("name", e.target.value)}
            />
          </Field>
          <Field label="Эрх">
            <select
              className={inputClass}
              value={editing.role}
              disabled={isSelf}
              onChange={(e) => set("role", e.target.value)}
            >
              {Object.entries(ROLES).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Сургууль">
            <select
              className={inputClass}
              value={editing.school}
              onChange={(e) => set("school", e.target.value)}
            >
              <option value="">
                {editing.role === "admin" ? "Бүх сургууль" : "Сонгоно уу"}
              </option>
              {schools.map((s) => (
                <option key={s._id} value={s.code}>
                  {s.name}
                </option>
              ))}
            </select>
          </Field>
          <label className="flex items-center gap-2 pt-6 text-sm">
            <input
              type="checkbox"
              checked={editing.active}
              disabled={isSelf}
              onChange={(e) => set("active", e.target.checked)}
            />
            Нэвтрэх эрх идэвхтэй
          </label>
          <p className="text-sm text-muted md:col-span-2">
            <b>Админ</b> — тест, даалгавар, сургууль, хэрэглэгчийг удирдаж, бүх
            сургуулийн үр дүнг харна. <b>Сэтгэл зүйч</b> — зөвхөн өөрийн
            сургуулийн үр дүнг харна.
          </p>
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
        <h2 className="font-serif text-2xl font-semibold">Хэрэглэгч ба эрх</h2>
        <Button
          onClick={() => {
            setError("");
            setEditing(emptyUser());
          }}
        >
          + Шинэ хэрэглэгч
        </Button>
      </div>
      <Notice error={error} success={success} />
      <Card className="overflow-x-auto p-0">
        <table className="min-w-full text-sm">
          <thead className="bg-sage-soft text-left text-xs uppercase text-sage-dark">
            <tr>
              <th className="p-3">Нэвтрэх нэр</th>
              <th className="p-3">Нэр</th>
              <th className="p-3">Эрх</th>
              <th className="p-3">Сургууль</th>
              <th className="p-3">Төлөв</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const isSelf = u._id === me?._id;
              return (
                <tr key={u._id} className="border-t border-line">
                  <td className="p-3 font-semibold">
                    {u.username}
                    {isSelf && <span className="ml-1 text-xs text-muted">(та)</span>}
                  </td>
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        u.role === "admin"
                          ? "bg-lavender-soft text-lavender"
                          : "bg-sky-soft text-sky"
                      }`}
                    >
                      {ROLES[u.role]}
                    </span>
                  </td>
                  <td className="p-3">
                    {u.role === "admin" && !u.school ? "Бүх сургууль" : schoolName(u.school)}
                  </td>
                  <td className="p-3">
                    <button
                      disabled={isSelf}
                      onClick={() => toggleActive(u)}
                      title={isSelf ? "" : "Дарж төлөв солих"}
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold disabled:cursor-default ${
                        u.active ? "bg-sage-soft text-sage-dark" : "bg-rose-soft text-rose"
                      }`}
                    >
                      {u.active ? "Идэвхтэй" : "Хаалттай"}
                    </button>
                  </td>
                  <td className="whitespace-nowrap p-3 text-right">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setError("");
                        setEditing({ ...u, password: "" });
                      }}
                    >
                      Засах
                    </Button>
                    {!isSelf && (
                      <Button variant="danger" onClick={() => remove(u)}>
                        Устгах
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
