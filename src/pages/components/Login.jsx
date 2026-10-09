import { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";
import { useRouter } from "next/router";
import { HeartIcon } from "./Header";
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
    "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 font-ui text-slate-900">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-6 flex items-center justify-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-amber-100">
            <HeartIcon className="h-5 w-5" />
          </span>
          <span className="font-semibold">Сэтгэлийн найз</span>
        </Link>
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-lg font-semibold">Удирдлагын самбарт нэвтрэх</h1>
          <p className="mt-1 text-sm text-slate-500">Сургууль, сэтгэл зүйч болон админ</p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Нэвтрэх нэр</span>
              <input
                type="text"
                name="username"
                autoComplete="username"
                className={inputClass}
                onChange={handleChange}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Нууц үг</span>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                className={inputClass}
                onChange={handleChange}
              />
            </label>
            {error && (
              <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="w-full rounded-md bg-slate-900 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Түр хүлээнэ үү..." : "Нэвтрэх"}
            </button>
          </form>
        </div>
        <p className="mt-6 text-center text-sm text-slate-500">
          Сурагч бол нэвтрэх шаардлагагүй.{" "}
          <Link href="/homepage#tests" className="font-medium text-slate-900 underline">
            Тест өгөх
          </Link>
        </p>
      </div>
    </div>
  );
}
