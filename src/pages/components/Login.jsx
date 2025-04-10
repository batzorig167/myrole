import { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";
import { useRouter } from "next/router";

export default function Login() {
  const { user, setUser } = useUser();
  const [login, setLogin] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
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

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/dashboard");
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      // console.error("Login error:", error);
      alert("Системийн алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100vh] w-full flex justify-center items-center bg-[#f0f4f8]">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
        <h1 className="text-3xl font-semibold text-center text-[#333] mb-6">
          Нэвтрэх
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="username"
              placeholder="Нэвтрэх нэрээ оруулна уу"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none transition duration-300 ease-in-out"
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Нууц үгээ оруулна уу"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none transition duration-300 ease-in-out"
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className={`w-full bg-[#4CAF50] text-white py-3 rounded-lg text-lg transition duration-300 ease-in-out ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#45a049]"
              }`}
              disabled={loading}
            >
              {loading ? "Түр хүлээнэ үү..." : "Нэвтрэх"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
