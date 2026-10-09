import { useEffect, useState } from "react";
import { useUser } from "./Context/UserContext";
import { useRouter } from "next/router";
import { useData } from "./Context/DataContext";

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
  const handleChange = (e) => {
    // console.log(e.target.name)
    // console.log(e.target.value)
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
      alert("Та эхлээд бүртгүүлэх шаардлагатай!");
    } else {
      let a = {
        school: formData.school,
        class: formData.class,
        buleg: formData.buleg,
        lastName: formData.lastname,
        firstName: formData.firstname,
      };
      //   console.log(a);
      setTestUser({ ...testUser, ...a });
      router.push("/taketest");
      //   console.log("ilgeesen data", a);
    }
  };
  const selectClass =
    "w-full rounded-xl border border-line bg-cream px-3 py-2.5 text-ink focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/30";
  const inputClass =
    "w-full rounded-xl border border-line bg-cream px-3 py-2.5 text-ink placeholder:text-muted/70 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/30";
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4 py-10 text-ink">
      <form
        onSubmit={submitHandle}
        className="w-full max-w-md rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-line md:p-10"
      >
        <p className="text-sm font-semibold text-sage">Алхам 1 / 2</p>
        <h1 className="mt-1 font-serif text-2xl font-semibold md:text-3xl">
          Өөрийн мэдээллээ бөглөнө үү
        </h1>
        <p className="mt-2 text-sm text-muted">
          Анги, нэрээ кирилл үсгээр бичээрэй. Таны хариулт нууцлагдана.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold" htmlFor="school">
              Сургууль
            </label>
            <select
              name="school"
              id="school"
              onChange={handleChange}
              className={selectClass}
            >
              <option value="">Сонгоно уу</option>
              {schools.map((school) => (
                <option key={school._id} value={school.code}>
                  {school.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-semibold" htmlFor="class">
                Анги
              </label>
              <select
                name="class"
                id="class"
                onChange={handleChange}
                className={selectClass}
              >
                <option value="">-</option>
                {["12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1"].map(
                  (value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  )
                )}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold" htmlFor="buleg">
                Бүлэг
              </label>
              <select
                name="buleg"
                id="buleg"
                onChange={handleChange}
                className={selectClass}
              >
                <option value="">-</option>
                {["а", "б", "в", "г", "д", "е", "ж"].map((value) => (
                  <option key={value} value={value}>
                    {value.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold" htmlFor="lastname">
              Овог
            </label>
            <input
              className={inputClass}
              type="text"
              name="lastname"
              id="lastname"
              onChange={handleChange}
              placeholder="Овгоо бичнэ үү"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold" htmlFor="firstname">
              Нэр
            </label>
            <input
              className={inputClass}
              type="text"
              name="firstname"
              id="firstname"
              onChange={handleChange}
              placeholder="Нэрээ бичнэ үү"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 w-full rounded-full bg-sage py-3 font-semibold text-white transition hover:bg-sage-dark"
        >
          Тест эхлэх
        </button>
      </form>
    </div>
  );
}
