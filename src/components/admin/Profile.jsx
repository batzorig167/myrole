import { useState } from "react";
import { useUser } from "@/pages/Context/UserContext";
import { useData } from "@/pages/Context/DataContext";
import { ROLES } from "@/lib/roles";
import { api, Button, Card, Field, inputClass, Notice } from "./ui";

export default function Profile() {
  const { user, setUser } = useUser();
  const { schools } = useData();
  const [name, setName] = useState(user.name || "");
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });
  const [nameState, setNameState] = useState({});
  const [pwState, setPwState] = useState({});
  const [saving, setSaving] = useState(false);

  const schoolName =
    schools.find((s) => s.code === user.school)?.name ||
    (user.role === "admin" ? "Бүх сургууль" : user.school);

  const saveName = async (e) => {
    e.preventDefault();
    setNameState({});
    try {
      const data = await api("PUT", "/api/auth/profile", { name });
      setUser(data.user);
      setNameState({ success: "Нэр хадгалагдлаа" });
    } catch (err) {
      setNameState({ error: err.message });
    }
  };

  const savePassword = async (e) => {
    e.preventDefault();
    setPwState({});
    if (passwords.next !== passwords.confirm) {
      setPwState({ error: "Шинэ нууц үг давтсантайгаа таарахгүй байна" });
      return;
    }
    setSaving(true);
    try {
      await api("PUT", "/api/auth/profile", {
        currentPassword: passwords.current,
        newPassword: passwords.next,
      });
      setPasswords({ current: "", next: "", confirm: "" });
      setPwState({ success: "Нууц үг амжилттай солигдлоо" });
    } catch (err) {
      setPwState({ error: err.message });
    } finally {
      setSaving(false);
    }
  };

  const initials = (user.name || user.username).slice(0, 1).toUpperCase();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-black">Профайл</h2>

      <Card className="flex flex-wrap items-center gap-5">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage text-2xl text-white">
          {initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xl font-black">{user.name || user.username}</p>
          <p className="text-sm text-muted">
            @{user.username} · {ROLES[user.role]} · {schoolName}
          </p>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <form onSubmit={saveName} className="space-y-4">
            <h3 className="font-semibold">Хувийн мэдээлэл</h3>
            <Field label="Нэвтрэх нэр">
              <input className={`${inputClass} opacity-70`} value={user.username} disabled />
            </Field>
            <Field label="Нэр">
              <input
                className={inputClass}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>
            <Notice {...nameState} />
            <div className="flex justify-end">
              <Button type="submit">Хадгалах</Button>
            </div>
          </form>
        </Card>

        <Card>
          <form onSubmit={savePassword} className="space-y-4">
            <h3 className="font-semibold">Нууц үг солих</h3>
            <Field label="Одоогийн нууц үг">
              <input
                type="password"
                autoComplete="current-password"
                className={inputClass}
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
              />
            </Field>
            <Field label="Шинэ нууц үг (8+ тэмдэгт)">
              <input
                type="password"
                autoComplete="new-password"
                className={inputClass}
                value={passwords.next}
                onChange={(e) => setPasswords({ ...passwords, next: e.target.value })}
              />
            </Field>
            <Field label="Шинэ нууц үгээ давтах">
              <input
                type="password"
                autoComplete="new-password"
                className={inputClass}
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              />
            </Field>
            <Notice {...pwState} />
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={saving || !passwords.current || !passwords.next}
              >
                {saving ? "Хадгалж байна..." : "Нууц үг солих"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
