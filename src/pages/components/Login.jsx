import Link from "next/link";
import { userAgent } from "next/server";
import { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";
import { useRouter } from "next/router";

export default function Login() {
  const { user, setUser } = useUser();
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();
  // console.log(login);

  // Check if user is already logged in
  useEffect(() => {
    if (user) {
      // If the user exists, redirect to dashboard
      router.push("/dashboard");
    }
  }, [user, router]); // Dependencies: user, router
  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    });

    const data = await response.json();
    if (response.ok) {
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/dashboard";
    } else {
      alert("Error: " + data.message);
    }
  };
  return (
    <div className="h-[100vh] w-full m-auto-screen bg-center bg-cover flex justify-center items-center bg-[#333] text-black">
      <form
        onSubmit={handleSubmit}
        className=" rounded-xl flex flex-col border gap-5 px-12 py-12 w-100 bg-white"
      >
        <h1 className="flex justify-center text-4xl font-semibold">Нэвтрэх</h1>
        <input
          type="text"
          name="username"
          id=""
          placeholder="Нэвтрэх нэрээ оруулна уу"
          className="border border-gray-500 py-2 rounded-[5px] text-center delay-150 duration-300 ease-in-out hover:scale-102 hover:border hover:border-[black]"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id=""
          placeholder="Нууц үгээ оруулна уу"
          className="border border-gray-500 py-2 rounded-[5px] text-center delay-150 duration-300 ease-in-out hover:scale-102 hover:border hover:border-[black]"
          onChange={handleChange}
        />
        <input
          type="submit"
          value="Нэвтрэх"
          className="border rounded-md py-1"
        />
      </form>
    </div>
  );
}
