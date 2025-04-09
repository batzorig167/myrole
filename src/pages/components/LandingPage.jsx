import Link from "next/link";
import Menu from "./Menu";
import Task from "./Task";
import Test from "./HomeTsesniihesg";
import Info from "./Info";
import { useState } from "react";
import Div from "./HomeTsesniihesg";
import { useRouter } from "next/router";
import { useCategory } from "../Context/CategoryContext";

export default function LandingPage() {
  const [selectItem, setSelectItem] = useState(null);
  const { setCatindex, setCategory } = useCategory();
  function handleBtn() {
    setSelectItem(2);
  }
  const router = useRouter();
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
    <div className="bg-[white] m-auto text-black">
      <div className="flex flex-col max-w-[600px] m-auto md:max-w-[1000px]">
        <div className="flex justify-between w-[100%] md:rounded-b-2xl bg-[#fff] pl-[30px]">
          <button>
            <Link href="#">
              <img
                src="https://dynamic.design.com/preview/logodraft/e2387455-d3c5-4701-bd2c-8cadb44690e1/image/large.png"
                alt=""
                className="h-20 rounded-md"
              />
            </Link>
          </button>
          <div className="flex gap-10 px-5 flex-col justify-center">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-12 rounded-full">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXqcFovc4Hi6OPmb0s6MyRS_xXzT7BECHsd-uYXAFi1mxnEHgeTv8W8L9k1RAoMb9X3bk&usqp=CAU" />
                </div>
              </div>

              <ul className="menu menu-sm dropdown-content bg-white text-black rounded-box z-1 mt-3 w-52 p-2 text-base">
                <li>
                  <a className="justify-between text-black">Profile</a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a href="/homepage">Гарах</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="py-18 bg-[#e3f6f5] w-100%">
          <div className="flex justify-center">
            <div className="items-center flex flex-col justify-center rounded-[18px] bg-[#fffffe] w-[90%] p-[18px]">
              <p className="flex justify-center text-3xl pb-3 text-[#272343] font-semibold md:text-4xl">
                Сэтгэл судлалын сайт
              </p>
              <p className="flex justify-center text-lg italic text-justify text-[#2d334a] md:text-xl">
                Энэхүү сэтгэл зүйн сайт нь хүмүүсийн сэтгэл зүйн эрүүл мэндийг
                дэмжих, зөвлөгөө өгөх, өөрийгөө хөгжүүлэх боломж олгох
                зорилготой. Энэ нь сэтгэлзүйн боловсрол түгээх, мэргэжлийн
                зөвлөгөө хүргэх, стресс, түгшүүрийг даван туулахад туслах
                платформ болно.
              </p>
            </div>
          </div>
          <div className="flex justify-center px-5 pt-8">
            <button
              onClick={handleBtn}
              className="px-20 py-2 rounded-full text-xl text-[#272343] bg-[#ffd803] font-semibold"
            >
              Тест өгөх
            </button>
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
                    <div className="flex justify-between">
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
          <div className="pt-10">
            <Task />
          </div>
        </div>
        <Div />
        <Info />
      </div>
    </div>
  );
}
