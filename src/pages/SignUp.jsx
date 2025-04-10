import { useEffect, useState } from "react";
import { useUser } from "./Context/UserContext";
import { useRouter } from "next/router";

export default function Home() {
  const { setUser } = useUser();
  const { testUser, setTestUser } = useUser();
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
      setUser(a);
      //   console.log(a);
      setTestUser({ ...testUser, ...a });
      router.push("/taketest");
      //   console.log("ilgeesen data", a);
    }
  };
  return (
    <div className="h-[100vh] flex justify-center items-center bg-[#232946] text-black">
      <div className="flex justify-center max-w-[700px]">
        <form
          action=""
          onSubmit={submitHandle}
          className="flex flex-col justify-evenly w-[90%] h-100 md:w-120 md:h-110 border rounded-2xl px-5 md:px-10 bg-white"
        >
          <div className="flex flex-col gap-2 text-black">
            <h1 className="text-center text-xl md:text-3xl pb-3 md:pb-8">
              Анги нэрээ крилл үсгээр бөглөнө үү
            </h1>
            <div className="flex gap-1 my-4">
              <label className=" text-lg md:text-xl" htmlFor="class">
                Сургууль:
              </label>
              <select
                name="school"
                id="school"
                onChange={handleChange}
                className="border border-[#333] rounded-md px-1 md:px-2 md:py-1 bg-white text-black"
              >
                <option value="">-</option>
                <option value="olympiad">Олимпиад</option>
                <option value="aviyas">Авьяас сургууль</option>
                <option value="dmts">Дэлгэрмөрөн сургууль</option>
                <option value="galtschool">Галт сум ЕБС</option>
                <option value="ireedui">Ирээдүй сургууль</option>
                <option value="edts">Эрдмийн далай сургууль</option>
              </select>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-1">
                <label className=" text-lg md:text-xl" htmlFor="class">
                  Анги:
                </label>
                <select
                  name="class"
                  id="class"
                  onChange={handleChange}
                  className="border border-[#333] rounded-md px-1 md:px-2 md:py-1 bg-white text-black"
                >
                  <option value="">-</option>
                  <option value="12">12</option>
                  <option value="11">11</option>
                  <option value="10">10</option>
                  <option value="9">9</option>
                  <option value="8">8</option>
                  <option value="7">7</option>
                  <option value="6">6</option>
                  <option value="5">5</option>
                  <option value="4">4</option>
                  <option value="3">3</option>
                  <option value="2">2</option>
                  <option value="1">1</option>
                </select>
              </div>
              <div className="flex gap-1">
                <label htmlFor="buleg" className="text-lg md:text-xl">
                  Бүлэг:
                </label>
                <select
                  name="buleg"
                  id="buleg"
                  onChange={handleChange}
                  className="border border-[#333] rounded-md px-2 py-1 bg-white text-black"
                >
                  <option value="">-</option>
                  <option value="а">А</option>
                  <option value="б">Б</option>
                  <option value="в">В</option>
                  <option value="г">Г</option>
                  <option value="д">Д</option>
                  <option value="е">Е</option>
                  <option value="ж">Ж</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="lastname" className="text-xl">
                Овог:
              </label>
              <input
                className="border border-[#333] rounded-md px-2 py-1"
                type="text"
                name="lastname"
                id="lastname"
                onChange={handleChange}
                placeholder="Овогоо бичнэ үү"
              />
            </div>
            <div className="flex border-[#333] flex-col gap-1">
              <label htmlFor="firstname" className="text-xl">
                Нэр:
              </label>
              <input
                className="border rounded-md px-2 py-1"
                type="text"
                name="firstname"
                id="firstname"
                onChange={handleChange}
                placeholder="Нэрээ бичнэ үү"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <input
              type="submit"
              value="Цааш"
              className="border border-[#333] rounded-md px-6 py-2 text-xl text-black bg-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
