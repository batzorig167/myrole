import Link from "next/link";
import { useState } from "react";
import { useCategory } from "../Context/CategoryContext";
import { useRouter } from "next/router";

export default function HomeTsesniihesg() {
  const [selectItem, setSelectItem] = useState(null);
  const { setCatindex, setCategory } = useCategory();
  const router = useRouter();
  function handleBtn() {
    setSelectItem(2);
  }
  function closeHandle() {
    setSelectItem(null);
  }
  let changeTest = (props) => {
    // alert(props)
    if (props == "Өөртөө итгэх итгэл") {
      setCatindex(3);
    }
    if (props == "Стресс") {
      setCatindex(2);
    }
    if (props == "Түгшүүр") {
      setCatindex(1);
    }
    if (props == "Сэтгэл гутрал") {
      setCatindex(0);
    }
    router.push("/taketest");
  };
  return (
    <div className="flex flex-col pb-5 gap-2 rounded-[18px] md:flex-row md:items-center">
      <div className="flex md:flex-row flex-col items-center gap-5 p-5">
        <img
          src="https://thumbs.dreamstime.com/b/friendly-male-doctor-cartoon-character-floral-plant-decoration-346249083.jpg"
          alt=""
          className="h-60 flex md:h-auto pt-4"
        />
      </div>
      <div className="flex flex-col pt-4 px-[20px] gap-4">
        <div className=" flex items-center">
          <h2 className="text-justify text-xl">
            Энэхүү сайт нь стресс, сэтгэл гутрал, түгшүүр, өөртөө итгэх итгэл
            гэсэн дөрвөн цогц дэд сэдвээс бүрдсэн сайт юм. Сайтын үр дагавар нь
            өөртөө итгэх итгэлийг нэмэгдүүлэх, стресс, түгшүүрээс хол байх,
            сэтгэл гутралыг эмчлэх, өөрийн буруу зүйлээ ойлгуулахад чиглэнэ.
          </h2>
        </div>
      </div>
      {selectItem && (
        <div className="fixed top-0 left-0 justify-center items-center w-[100vw] h-[100vh]">
          <div className="relative flex justify-center items-center w-[100vw] h-[100vh]">
            <button
              onClick={closeHandle}
              className="w-[100vw] h-[100vh] absolute-50 bg-[black] opacity-50 top-0 left-0"
            >
              1
            </button>
            <div className="bg-[white] p-3 rounded-xl absolute z-[1] flex flex-col">
              <div className="flex justify-between text-white gap-3">
                <h1 className="text-2xl text-center pt-3 pl-10 text-[#272343]">
                  Тест өгөх боломжтой сэдвүүд
                </h1>
                <button
                  type="button"
                  onClick={closeHandle}
                  className="text-[#272343] pt-[20px] "
                >
                  <span class="sr-only">Close menu</span>
                  <svg
                    class="h-6 w-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col gap-5 justify-center pt-[25px]">
                <button
                  onClick={() => changeTest("Сэтгэл гутрал")}
                  href=""
                  className="rounded-xl bg-[#bae8e8] text-[#2d334a] text-center py-2"
                >
                  Сэтгэл гутрал
                </button>
                <button
                  onClick={() => changeTest("Түгшүүр")}
                  href=""
                  className="rounded-xl bg-[#bae8e8] text-[#2d334a] text-center py-2"
                >
                  Түгшүүр
                </button>
                <button
                  onClick={() => changeTest("Стресс")}
                  href=""
                  className="rounded-xl bg-[#bae8e8] text-[#2d334a] text-center py-2"
                >
                  Стресс
                </button>
                <button
                  onClick={() => changeTest("Өөртөө итгэх итгэл")}
                  href=""
                  className="rounded-xl bg-[#bae8e8] text-[#2d334a] text-center py-2"
                >
                  Өөртөө итгэх итгэл
                </button>
              </div>
              <button
                onClick={closeHandle}
                className="text-right pt-[25px] px-[10px] text-[#2d334a]"
              >
                Хаах
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
