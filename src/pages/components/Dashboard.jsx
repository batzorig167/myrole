import Link from "next/link";
import Menu from "./Menu";
import Task from "./Task";
import Test from "./HomeTsesniihesg";
import Info from "./Info";
import { useState } from "react";
import Div from "./HomeTsesniihesg";
import HomeTsesniihesg from "./HomeTsesniihesg";

export default function Dashboard() {
    const [selectItem,setSelectItem] = useState(null);
    function handleBtn(){
        setSelectItem(2);
    }
    function closeHandle(){
        setSelectItem(null)
    }
    return <div className="bg-gray-100 max-auto-screen text-black">
        <div className="flex justify-between ">
            <div className="w-[16%]">
                <Menu/>
            </div>
            <div className="flex flex-col bg-[#fff] w-[82%] pr-[2%]">
                <div className="flex justify-evenly gap-220 px-5 py-1">
                    <button><Link href=""><img src="https://bcassetcdn.com/social/tqtwz2wdy6/preview.png" alt="" className="h-20 rounded-md"/></Link></button>
                    <div className="flex gap-10 px-5 flex-col justify-center">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXqcFovc4Hi6OPmb0s6MyRS_xXzT7BECHsd-uYXAFi1mxnEHgeTv8W8L9k1RAoMb9X3bk&usqp=CAU" />
                                </div>
                            </div>
                            <ul className="menu menu-sm dropdown-content bg-white text-black rounded-box z-1 mt-3 w-52 p-2 shadow text-base">
                                <li>
                                    <a className="justify-between">Profile</a>
                                </li>
                                    <li><a>Settings</a></li>
                                    <li><a href="/homepage">Гарах</a></li>
                                </ul>
                         </div>
                    </div>
                </div>
                <div className="py-18 bg-[#e3f6f5]">
                    <div className="items-center px-8 pt-8">
                        <div className="bg-white  rounded-[18px] px-1 py-2">
                            <p className="flex justify-center text-3xl pb-3 text-blue-700">Сэтгэл судлалын сайт</p>
                            <p className="flex justify-center text-xl italic text-center"> Энэхүү сэтгэл зүйн сайт нь хүмүүсийн сэтгэл зүйн эрүүл мэндийг дэмжих, зөвлөгөө өгөх, өөрийгөө хөгжүүлэх боломж олгох зорилготой. Энэ нь сэтгэлзүйн боловсрол түгээх, мэргэжлийн зөвлөгөө хүргэх, стресс, түгшүүрийг даван туулахад туслах платформ болно.</p>
                        </div>
                    </div>
                    <div className="flex justify-center px-5 pt-8">
                    <button onClick={handleBtn} className="border px-6 py-2 rounded-full text-xl rounded-full text-xl h-12 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 text-[#fff] bg-[#f9593a] hover:bg-blue-500">Test өгөх</button>
                        {/* <a href="#" onClick={handleBtn} className="border px-6 py-2 rounded-full text-xl rounded-full text-xl h-12 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 text-[#fff] bg-[#f9593a] hover:bg-blue-500">Test өгөх</a> */}
                        {
            selectItem && (
                <div className="fixed top-0 left-0 w-[100vw] h-[100vh] ">
                    <div className="w-[100vw] h-[100vh] relative flex justify-center items-center">
                        <button onClick={closeHandle} className="w-[100vw]  h-[100vh] absolute-50 top-0 left-0" >
                            lol
                        </button>
                        <div className="bg-slate-600 p-3 rounded-xl absolute z-[1] flex flex-col w-180 h-110">
                            <div className="flex justify-between text-white">
                                <h1 className="text-3xl text-center capitalize pl-40">Test өгөх боломжтой сэдвүүд</h1>
                                <button type="button" onClick={closeHandle} class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <span class="sr-only">Close menu</span>
                                <svg class="h-6 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                </button>
                            </div>
                            <div className="flex flex-col gap-5 justify-center pt-15 text-white">
                                <a href="/taketest" className="border rounded-xl bg-[#D1D5DB] text-black text-center py-2 hover:text-black  hover:bg-stone-50">Сэтгэл гутрал</a>
                                <a href="/taketest" className="border rounded-xl bg-[#D1D5DB] text-black text-center py-2 hover:text-black hover:bg-stone-50">Түгшүүр</a>
                                <a href="/taketest" className="border rounded-xl bg-[#D1D5DB] text-black text-center py-2 hover:text-black hover:bg-stone-50">Стресс</a>
                                <a href="/taketest" className="border rounded-xl bg-[#D1D5DB] text-black text-center py-2 hover:text-black hover:bg-stone-50">Өөртөө итгэх итгэл</a>
                            </div>
                            <button onClick={closeHandle} className="text-right pt-13 pr-5 text-white">Хаах</button>
                        </div>
                    </div>
                </div>
            )
        }
                    </div>
                    <div className="pt-10">
                        <Task/>
                    </div>
                </div>
                <HomeTsesniihesg/>
                <Info/>
            </div>
        </div>
    </div>
}