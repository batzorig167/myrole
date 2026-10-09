import { useEffect, useState } from "react";
import { useUser } from "./Context/UserContext";
import { useRouter } from "next/router";
import { useData } from "./Context/DataContext";
import Header from "./components/Header";
import { Mascot } from "@/components/Mascot";

const CLASSES = ["12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1"];
const BULEG = ["а", "б", "в", "г", "д", "е", "ж"];

export default function Home() {
  const { testUser, setTestUser } = useUser();
  const { schools } = useData();
  const [formData, setFormData] = useState({
    school: "",
    class: "",
    buleg: "",
    lastname: "",
    firstname: "",
  });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const router = useRouter();
  useEffect(() => {
    if (testUser != null) {
      router.push("/taketest");
    }
  }, [testUser, router]);

  const submitHandle = (e) => {
    e.preventDefault();
    if (
      !formData.school ||
      !formData.class ||
      !formData.buleg ||
      !formData.lastname ||
      !formData.firstname
    ) {
      setError("Бүх талбарыг бөглөөрэй 🙂");
      return;
    }
    setTestUser({
      ...testUser,
      school: formData.school,
      class: formData.class,
      buleg: formData.buleg,
      lastName: formData.lastname,
      firstName: formData.firstname,
    });
    router.push("/taketest");
  };

  const fieldClass =
    "w-full rounded-2xl border-2 border-line bg-cream px-4 py-3 font-semibold text-ink placeholder:font-medium placeholder:text-muted/70 focus:border-coral focus:outline-none";

  // Сонгосон утгыг чип хэлбэрээр харуулах товчнууд
  const Chips = ({ name, options, label = (v) => v }) => (
    <div className="flex flex-wrap gap-2">
      {options.map((value) => {
        const active = formData[name] === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, [name]: value }))}
            className={`h-11 min-w-11 rounded-xl px-3 font-black transition ${
              active
                ? "pop bg-coral text-white [--edge:#e05a38]"
                : "bg-cream text-ink ring-2 ring-line hover:ring-coral"
            }`}
          >
            {label(value)}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-cream text-ink">
      <Header />
      <main className="mx-auto grid max-w-5xl items-center gap-8 px-4 pb-16 pt-4 md:grid-cols-[1fr_1.3fr]">
        <div className="hidden text-center md:block">
          <div className="animate-float mx-auto h-64 w-64">
            <Mascot />
          </div>
          <p className="mt-4 text-2xl font-black">Танилцъя!</p>
          <p className="mt-1 font-medium text-muted">
            Хариултыг чинь зөвхөн эрх бүхий сэтгэл зүйч харна.
          </p>
        </div>

        <form
          onSubmit={submitHandle}
          className="rounded-[2.5rem] bg-white p-6 ring-2 ring-line md:p-9"
        >
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-sun px-3 py-1 text-xs font-black">
              Алхам 1 / 2
            </span>
            <span className="h-2 flex-1 rounded-full bg-sand">
              <span className="block h-full w-1/2 rounded-full bg-sun" />
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-black">Чи хэн бэ? 👋</h1>
          <p className="mt-1 font-medium text-muted">
            Нэрээ кирилл үсгээр бичээрэй.
          </p>

          <div className="mt-6 space-y-5">
            <label className="block">
              <span className="mb-1.5 block font-black">🏫 Сургууль</span>
              <select
                name="school"
                value={formData.school}
                onChange={handleChange}
                className={fieldClass}
              >
                <option value="">Сургуулиа сонгоорой</option>
                {schools.map((school) => (
                  <option key={school._id} value={school.code}>
                    {school.name}
                  </option>
                ))}
              </select>
            </label>

            <div>
              <span className="mb-1.5 block font-black">📚 Анги</span>
              <Chips name="class" options={CLASSES} />
            </div>

            <div>
              <span className="mb-1.5 block font-black">🔤 Бүлэг</span>
              <Chips name="buleg" options={BULEG} label={(v) => v.toUpperCase()} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block font-black">Овог</span>
                <input
                  className={fieldClass}
                  type="text"
                  name="lastname"
                  id="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  placeholder="Овгоо бичнэ үү"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block font-black">Нэр</span>
                <input
                  className={fieldClass}
                  type="text"
                  name="firstname"
                  id="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  placeholder="Нэрээ бичнэ үү"
                />
              </label>
            </div>
          </div>

          {error && (
            <p className="mt-5 rounded-2xl bg-coral-soft px-4 py-3 font-bold text-peach">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="pop mt-7 w-full rounded-2xl bg-coral py-4 text-lg font-black text-white [--edge:#e05a38]"
          >
            Тест эхлэх 🚀
          </button>
        </form>
      </main>
    </div>
  );
}
