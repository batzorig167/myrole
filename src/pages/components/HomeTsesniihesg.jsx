import Link from "next/link";
import { useState } from "react";

export default function HomeTsesniihesg() {
    const [selectItem,setSelectItem] = useState(null);
    function handleBtn(){
        setSelectItem(2);
    }
    function closeHandle(){
        setSelectItem(null)
    }
    return <div className="flex flex-col pb-5 gap-2">
        <div className="flex gap-5">
            <img src="https://thumbs.dreamstime.com/b/friendly-male-doctor-cartoon-character-floral-plant-decoration-346249083.jpg" alt="" className="h-60 pt-8"/>
                <div className="flex flex-col gap-4 pt-5 ">
                    <h2 className=" text-base h-60">Энэхүү сайт нь стресс, сэтгэл гутрал, түгшүүр, өөртөө итгэх итгэл гэсэн дөрвөн цогц дэд сэдвээс бүрдсэн сайт юм.Сайтын үр дагавар нь өөртөө итгэх итгэлийг нэмэгдүүлэх, стресс, түгшүүрээс хол байх, сэтгэл гутралыг эмчлэх, өөрийн буруу зүйлээ ойлгуулахад чиглэнэ.</h2>
                {/* <a href="#" className="rounded-full text-center text-xl h-12 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 text-[#fff] border  py-2 rounded-full bg-[#f9593a] hover:bg-blue-500" onClick={handleBtn}>Test өгөх</a> */}
                </div>
        </div>
        <div className="flex justify-center">
            <button className="rounded-full text-center text-xl h-12 w-100 text-[#fff] border  py-2 rounded-full bg-[#f9593a] hover:bg-blue-700" onClick={handleBtn}>Test өгөх</button>
        </div>
        {
            selectItem && (
                <div className="fixed top-0 left-0 w-[100vw] h-[100vh] ">
                    <div className="w-[100vw] h-[100vh] relative flex justify-center items-center">
                        <button onClick={closeHandle} className="w-[100vw]  h-[100vh] absolute-50 top-0 left-0" >
                            lol
                        </button>
                        <div className="bg-slate-600 p-3 rounded-xl absolute z-[1] flex flex-col w-180 h-110">
                            <div className="flex justify-between text-white">
                                <h1 className="text-3xl text-center pt-3 capitalize pl-40">Test өгөх боломжтой сэдвүүд</h1>
                                <button type="button" onClick={closeHandle} class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <span class="sr-only">Close menu</span>
                                <svg class="h-6 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                </button>
                            </div>
                            <div className="flex flex-col gap-5 justify-center pt-15 text-white">
                                <a href="/taketest" className="border rounded-xl bg-[#D1D5DB] text-black text-center py-2  hover:text-black  hover:bg-stone-50">Сэтгэл гутрал</a>
                                <a href="/Tugshuur" className="border rounded-xl bg-[#D1D5DB] text-black text-center py-2 hover:text-black hover:bg-stone-50">Түгшүүр</a>
                                <a href="/Stress" className="border rounded-xl bg-[#D1D5DB] text-black text-center py-2  hover:text-black hover:bg-stone-50">Стресс</a>
                                <a href="/Itgel" className="border rounded-xl bg-[#D1D5DB] text-black text-center py-2  hover:text-black hover:bg-stone-50">Өөртөө итгэх итгэл</a>
                            </div>
                            <button onClick={closeHandle} className="text-right pt-13 pr-5 text-white">Хаах</button>
                        </div>
                    </div>
                </div>
            )
        }
    </div>
}