import { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";
import { useRouter } from "next/router";
import Header from "./Header";
import Link from "next/link";

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
    "w-full rounded-2xl border-2 border-line bg-cream px-4 py-3.5 font-semibold text-ink placeholder:font-medium placeholder:text-muted/70 focus:border-sage focus:outline-none";

  return (
    <div className="min-h-screen bg-cream text-ink">
      <Header>
        <Link
          href="/homepage"
          className="pop rounded-full bg-white px-5 py-2 text-sm font-bold ring-2 ring-line"
        >
          🏠 Нүүр
        </Link>
      </Header>
      <main className="flex justify-center px-4 pb-16 pt-6 md:pt-12">
        <div className="w-full max-w-md">
          <div className="rounded-[2.5rem] bg-white p-8 ring-2 ring-line">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-mint-soft text-3xl">
              🔐
            </span>
            <h1 className="mt-4 text-3xl font-black">Нэвтрэх</h1>
            <p className="mt-1 font-medium text-muted">
              Сургууль, сэтгэл зүйч болон админд зориулсан хэсэг
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-black">Нэвтрэх нэр</span>
                <input
                  type="text"
                  name="username"
                  autoComplete="username"
                  className={inputClass}
                  onChange={handleChange}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-black">Нууц үг</span>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  className={inputClass}
                  onChange={handleChange}
                />
              </label>
              {error && (
                <p className="rounded-2xl bg-rose-soft px-4 py-3 text-sm font-bold text-rose">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="pop w-full rounded-2xl bg-sage py-4 text-lg font-black text-white [--edge:#12704f] disabled:cursor-not-allowed disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Түр хүлээнэ үү..." : "Нэвтрэх"}
              </button>
            </form>
          </div>
          <p className="mt-6 text-center text-sm font-semibold text-muted">
            Сурагч бол нэвтрэх шаардлагагүй —{" "}
            <Link href="/homepage#tests" className="font-black text-coral underline">
              шууд тест өгөөрэй
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
