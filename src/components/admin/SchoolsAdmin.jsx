import { useEffect, useState } from "react";
import { useData } from "@/pages/Context/DataContext";
import { api, Button, Card, Field, inputClass, Notice } from "./ui";

// Сургууль бүр өөрийн нэвтрэх эрхтэй (сэтгэл зүйч эрх) бөгөөд
// зөвхөн өөрийн сурагчдын үр дүнг харна.
export default function SchoolsAdmin() {
  const { schools, reload } = useData();
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ code: "", name: "", username: "", password: "" });
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [loginFor, setLoginFor] = useState(null); // нэвтрэх эрх засаж буй сургуулийн код
  const [login, setLogin] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadUsers = () =>
    api("GET", "/api/admin/users")
      .then(setUsers)
      .catch((err) => setError(err.message));

  useEffect(() => {
    loadUsers();
  }, []);

  const accountOf = (code) =>
    users.find((u) => u.role === "psychologist" && u.school === code);

  const run = async (action, message) => {
    setError("");
    setSuccess("");
    try {
      await action();
      await Promise.all([reload(), loadUsers()]);
      setSuccess(message);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const add = async (e) => {
    e.preventDefault();
    const withLogin = form.username || form.password;
    if (withLogin && (!form.username || form.password.length < 8)) {
      setError("Нэвтрэх нэр болон 8+ тэмдэгттэй нууц үгийг хоёуланг нь оруулна уу");
      return;
    }
    const ok = await run(async () => {
      await api("POST", "/api/admin/schools", { code: form.code, name: form.name });
      if (withLogin) {
        await api("POST", "/api/admin/users", {
          username: form.username,
          password: form.password,
          name: form.name,
          school: form.code.trim().toLowerCase(),
          role: "psychologist",
        });
      }
    }, withLogin ? "Сургууль болон нэвтрэх эрх үүслээ" : "Сургууль нэмэгдлээ");
    if (ok) setForm({ code: "", name: "", username: "", password: "" });
  };

  const saveName = async (id) => {
    const ok = await run(
      () => api("PUT", `/api/admin/schools?id=${id}`, { name: editName }),
      "Нэр шинэчлэгдлээ"
    );
    if (ok) setEditingId(null);
  };

  const openLogin = (school) => {
    setError("");
    setSuccess("");
    setLoginFor(school.code);
    setLogin({ username: accountOf(school.code)?.username || "", password: "" });
  };

  const saveLogin = async (school) => {
    const account = accountOf(school.code);
    const ok = await run(
      () =>
        account
          ? api("PUT", `/api/admin/users?id=${account._id}`, {
              ...account,
              username: login.username,
              password: login.password,
            })
          : api("POST", "/api/admin/users", {
              username: login.username,
              password: login.password,
              name: school.name,
              school: school.code,
              role: "psychologist",
            }),
      `${school.name} — нэвтрэх эрх хадгалагдлаа`
    );
    if (ok) setLoginFor(null);
  };

  const toggleActive = (school) => {
    const account = accountOf(school.code);
    run(
      () =>
        api("PUT", `/api/admin/users?id=${account._id}`, {
          ...account,
          active: !account.active,
        }),
      `${school.name} — эрхийг ${account.active ? "хаалаа" : "нээлээ"}`
    );
  };

  const remove = (s) => {
    if (!confirm(`"${s.name}" сургуулийг устгах уу?`)) return;
    run(() => api("DELETE", `/api/admin/schools?id=${s._id}`), "Сургууль устгагдлаа");
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-black">Сургуулиуд</h2>
        <p className="mt-1 text-sm text-muted">
          Сургууль бүр өөрийн нэвтрэх нэр, нууц үгээр орж зөвхөн өөрийн сурагчдын
          үр дүнг харна.
        </p>
      </div>

      <Card>
        <form onSubmit={add} className="grid gap-3 md:grid-cols-[2fr_1fr]">
          <Field label="Нэр">
            <input
              className={inputClass}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Жишээ: Мөрөн 1-р сургууль"
            />
          </Field>
          <Field label="Код (латинаар)">
            <input
              className={inputClass}
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
              placeholder="murun1"
            />
          </Field>
          <Field label="Нэвтрэх нэр (заавал биш)">
            <input
              className={inputClass}
              autoComplete="off"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="murun1"
            />
          </Field>
          <Field label="Нууц үг (8+ тэмдэгт)">
            <input
              type="password"
              autoComplete="new-password"
              className={inputClass}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </Field>
          <div className="flex items-center justify-between gap-3 md:col-span-2">
            <p className="text-xs text-muted">
              Код нь үр дүнтэй холбогддог тул дараа нь өөрчлөх боломжгүй.
            </p>
            <Button type="submit">+ Сургууль нэмэх</Button>
          </div>
        </form>
      </Card>

      <Notice error={error} success={success} />

      <Card className="p-0">
        <ul className="divide-y divide-line">
          {schools.map((s) => {
            const account = accountOf(s.code);
            return (
              <li key={s._id} className="px-5 py-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="min-w-0 flex-1">
                    {editingId === s._id ? (
                      <input
                        className={inputClass}
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        autoFocus
                      />
                    ) : (
                      <p className="font-semibold">{s.name}</p>
                    )}
                    <p className="mt-0.5 text-sm text-muted">
                      <code>{s.code}</code> ·{" "}
                      {account ? (
                        <>
                          Нэвтрэх нэр:{" "}
                          <span className="font-semibold text-ink">
                            {account.username}
                          </span>
                        </>
                      ) : (
                        <span className="text-peach">Нэвтрэх эрх үүсгээгүй</span>
                      )}
                    </p>
                  </div>

                  {account && (
                    <button
                      onClick={() => toggleActive(s)}
                      title="Дарж төлөв солих"
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        account.active
                          ? "bg-sage-soft text-sage-dark"
                          : "bg-rose-soft text-rose"
                      }`}
                    >
                      {account.active ? "Идэвхтэй" : "Хаалттай"}
                    </button>
                  )}

                  {editingId === s._id ? (
                    <>
                      <Button onClick={() => saveName(s._id)}>Хадгалах</Button>
                      <Button variant="ghost" onClick={() => setEditingId(null)}>
                        Болих
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" onClick={() => openLogin(s)}>
                        {account ? "Нэвтрэх эрх засах" : "Нэвтрэх эрх үүсгэх"}
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setEditingId(s._id);
                          setEditName(s.name);
                        }}
                      >
                        Нэр засах
                      </Button>
                      <Button variant="danger" onClick={() => remove(s)}>
                        Устгах
                      </Button>
                    </>
                  )}
                </div>

                {loginFor === s.code && (
                  <div className="mt-4 grid gap-3 rounded-2xl bg-cream p-4 md:grid-cols-[1fr_1fr_auto]">
                    <Field label="Нэвтрэх нэр">
                      <input
                        className={inputClass}
                        autoComplete="off"
                        value={login.username}
                        onChange={(e) => setLogin({ ...login, username: e.target.value })}
                      />
                    </Field>
                    <Field
                      label={account ? "Шинэ нууц үг (солихгүй бол хоосон)" : "Нууц үг (8+ тэмдэгт)"}
                    >
                      <input
                        type="password"
                        autoComplete="new-password"
                        className={inputClass}
                        value={login.password}
                        onChange={(e) => setLogin({ ...login, password: e.target.value })}
                      />
                    </Field>
                    <div className="flex items-end gap-2">
                      <Button onClick={() => saveLogin(s)}>Хадгалах</Button>
                      <Button variant="ghost" onClick={() => setLoginFor(null)}>
                        Болих
                      </Button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}
