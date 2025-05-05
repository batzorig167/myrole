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
          <h2 className="text-justify text-xl text-[#333]">
            Энэхүү сайт нь стресс, сэтгэл гутрал, түгшүүр, өөртөө итгэх итгэл
            гэсэн дөрвөн цогц дэд сэдвээс бүрдсэн сайт юм. Сайтын үр дагавар нь
            өөртөө итгэх итгэлийг нэмэгдүүлэх, стресс, түгшүүрээс хол байх,
            сэтгэл гутралыг эмчлэх, өөрийн буруу зүйлээ ойлгуулахад чиглэнэ.
          </h2>
        </div>
        <div className="text-center text-white text-xl">
          <a href="/dasgal" className="border rounded-[18px] bg-[#6246ea] px-10 py-2">Тайвшруулах дасгал</a>
        </div>
      </div>
    </div>
  );
}
