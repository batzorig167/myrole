import Link from "next/link";
import Info from "./Info";
import HomeTsesniihesg from "./HomeTsesniihesg";
import { useRouter } from "next/router";
import { useCategory } from "../Context/CategoryContext";

export default function Homepage() {
  const { setCatindex, setCategory } = useCategory();

  const router = useRouter();
  let changeTest = (props) => {
    // alert(props)
    console.log(props);
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
    <div className="bg-[white] min-h-[100vh]   m-auto">
      <div className=" max-w-[1000px] min-h-[85vh] bg-[#e3f6f5]  m-auto">
        <div className="flex justify-between bg-[white]  overflow-hidden">
          <button>
            <Link href="/">
              <img
                src="https://dynamic.design.com/preview/logodraft/e2387455-d3c5-4701-bd2c-8cadb44690e1/image/large.png"
                alt=""
                className="h-20 rounded-md px-[20px]"
              />
            </Link>
          </button>
          <div className="flex gap-10 px-5 flex-col justify-center">
            <a
              href="login"
              className="rounded-[4px] px-4 py-2 flex text-[#2d334a] bg-[white] border-[2px] border-[#2d334a]"
            >
              Нэвтрэх
            </a>
          </div>
        </div>
        <div className="flex flex-col bg-[#e3f6f5] py-18 w-full">
          <div className="px-3">
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
            <div className="flex flex-col gap-3 pt-10 w-full items-center">
              <h1 className="flex justify-center text-3xl text-[2d334a] font-semibold">
                Өгч болох тестүүд
              </h1>
              <div className="flex md:justify-between flex-wrap md:flex-row font-medium gap-3 w-[90%]">
                <div className="flex flex-col rounded-[20px] py-5 px-2 bg-white w-[48%] md:w-[20%]">
                  <img
                    src="https://www.jobbank.gc.ca/themes-jb/images/quiz/quiz_preferences.svg"
                    alt=""
                    className="h-40 rounded-full"
                  />
                  <button
                    onClick={() => changeTest("Сэтгэл гутрал")}
                    href=""
                    className="rounded-xl bg-[#bae8e8] text-[#2d334a] text-center py-2"
                  >
                    Сэтгэл гутрал
                  </button>
                </div>
                <div className="flex flex-col rounded-[20px] py-5 px-2 bg-white w-[48%] md:w-[20%]">
                  <img
                    src="https://www.jobbank.gc.ca/themes-jb/images/quiz/quiz_abilities.svg"
                    alt=""
                    className="h-40 rounded-full"
                  />
                  <button
                    onClick={() => changeTest("Стресс")}
                    href=""
                    className="rounded-xl bg-[#bae8e8] text-[#2d334a] text-center py-2"
                  >
                    Стресс
                  </button>
                </div>
                <div className="rounded-[20px] flex flex-col py-5 px-2 bg-white w-[48%] md:w-[20%]">
                  <img
                    src="https://www.jobbank.gc.ca/themes-jb/images/quiz/quiz_intelligences.svg"
                    alt=""
                    className="h-40 rounded-full"
                  />
                  <button
                    onClick={() => changeTest("Өөртөө итгэх итгэл")}
                    href=""
                    className="rounded-xl bg-[#bae8e8] text-[#2d334a] text-center py-2"
                  >
                    Өөртөө итгэх итгэл
                  </button>
                </div>
                <div className="rounded-[20px] bg-white flex flex-col py-5 px-2 w-[48%] md:w-[20%]">
                  <img
                    src="https://www.jobbank.gc.ca/themes-jb/images/quiz/quiz_workvalues.svg"
                    alt=""
                    className="h-40 rounded-full"
                  />
                  <button
                    onClick={() => changeTest("Түгшүүр")}
                    href=""
                    className="rounded-xl bg-[#bae8e8] text-[#2d334a] text-center py-2"
                  >
                    Түгшүүр
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <HomeTsesniihesg />
        </div>
      </div>
      <Info />
    </div>
  );
}
