import { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";
import { useRouter } from "next/router";
import { Logo } from "./Header";

export default function Login() {
  const { user, setUser } = useUser();
  const [login, setLogin] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        router.push("/dashboard");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Системийн алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-line bg-cream p-3 text-ink placeholder:text-muted/70 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/30";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-cream px-4 text-ink">
      <Logo />
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-line">
        <h1 className="font-serif text-3xl font-semibold">Нэвтрэх</h1>
        <p className="mt-1 text-sm text-muted">
          Сэтгэл зүйч, багш нарт зориулсан хэсэг
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Нэвтрэх нэр"
            className={inputClass}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Нууц үг"
            className={inputClass}
            onChange={handleChange}
          />
          {error && (
            <p className="rounded-xl bg-rose-soft px-4 py-3 text-sm text-rose">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full rounded-full bg-sage py-3 text-lg font-semibold text-white transition hover:bg-sage-dark disabled:cursor-not-allowed disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Түр хүлээнэ үү..." : "Нэвтрэх"}
          </button>
        </form>
      </div>
    </div>
  );
}
