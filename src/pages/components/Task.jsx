import Link from "next/link";
import { useState } from "react";

export default function Task() {
    const [selectItem,setSelectItem] = useState(null);
    function handleBtn(){
        setSelectItem(1);
    }
    function closeHandle(){
        setSelectItem(null)
    }
    return <div>
    <div className="flex w-122 flex-col gap-10">
        <div className="flex justify-evenly">
            <div className="flex flex-col gap-1">
                <a href="#"><img src="https://insightfultraits.com/wp-content/uploads/2024/12/blue-personality-min-png.avif" alt="" className="h-55"/></a>
                <h1 className="flex justify-center text-xl">Сэтгэл гутрал</h1>
                <button className="px-4 py-1 text-white rounded-full bg-[#366F90] hover:bg-[#f9593a]" onClick={handleBtn}>Авах</button>
            </div>
            {
                selectItem && (
                    <div className="fixed top-0 left-0 w-[100vw] h-[100vh] ">
                        <div className="w-[100vw] h-[100vh] relative flex justify-center items-center">
                            <button onClick={closeHandle} className="w-[100vw]  h-[100vh] absolute-50 top-0 left-0" >
                                lol
                            </button>
                            <div className="bg-slate-600 p-3 rounded-xl absolute z-[1] flex flex-col px-10 py-10">
                                <div className="flex justify-between text-white">
                                    <h1 className="text-3xl text-center pt-3 ">Та түвшинг сонгоно уу</h1>
                                    <button type="button" onClick={closeHandle} class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <span class="sr-only">Close menu</span>
                                    <svg class="h-6 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    </button>
                                </div>
                                <div className="flex flex-col gap-5 justify-center pt-15 text-white">
                                    <a href="" className="border rounded-xl bg-[#D1D5DB] text-black text-center py-2 hover:text-black  hover:bg-stone-50">Хэвийн</a>
                                    <a href="" className="border rounded-xl bg-[#D1D5DB] text-black text-center py-2 hover:text-black hover:bg-stone-50">Хөнгөн</a>
                                    <a href="" className="border rounded-xl bg-[#D1D5DB] text-black text-center py-2 hover:text-black hover:bg-stone-50">Дунд зэрэг</a>
                                    <a href="" className="border rounded-xl bg-[#D1D5DB] text-black text-center py-2 hover:text-black hover:bg-stone-50">Хүчтэй</a>
                                    <a href="" className="border rounded-xl bg-[#D1D5DB] text-black text-center py-2 hover:text-black hover:bg-stone-50">Маш хүчтэй</a>
                                </div>
                                <button onClick={closeHandle} className="text-right pt-13 pr-5 text-white">Хаах</button>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className="flex flex-col gap-1">
                <a href="#"><img src="https://insightfultraits.com/wp-content/uploads/2024/12/purple-personality-min-768x768-png.avif" alt="" className="h-55"/>
                    </a>
                <h1 className="flex justify-center text-xl">Түгшүүр</h1>
                <button className="px-4 py-1 text-white rounded-full bg-blue-500 hover:bg-[#f9593a]" onClick={handleBtn}>Авах</button>
            </div>
            {
                selectItem && (
                    <div className="fixed top-0 left-0 w-[100vw] h-[100vh] ">
                        <div className="w-[100vw] h-[100vh] relative flex justify-center items-center">
                            <button onClick={closeHandle} className="w-[100vw]  h-[100vh] absolute-50 top-0 left-0" >
                                lol
                            </button>
                            <div className="bg-slate-600 p-3 rounded-xl absolute z-[1] flex flex-col px-10 py-10">
                                <div className="flex justify-between text-white">
                                    <h1 className="text-3xl text-center pt-3 pl-20">Та түвшинг сонгоно уу</h1>
                                    <button type="button" onClick={closeHandle} class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <span class="sr-only">Close menu</span>
                                    <svg class="h-6 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    </button>
                                </div>
                                <div className="flex flex-col gap-5 justify-center pt-15 text-white">
                                    <a href="" className="border rounded-xl bg-[#D1D5DB] text-black text-center py-2 hover:text-black  hover:bg-stone-50">Хэвийн</a>
                                    <a href="" className="border rounded-xl bg-[#D1D5DB] text-black text-center py-2 hover:text-black hover:bg-stone-50">Хөнгөн</a>
                                    <a href="" className="border rounded-xl bg-[#D1D5DB] text-black text-center py-2 hover:text-black hover:bg-stone-50">Дунд зэрэг</a>
                                    <a href="" className="border rounded-xl bg-[#D1D5DB] text-black text-center py-2 hover:text-black hover:bg-stone-50">Хүчтэй</a>
                                    <a href="" className="border rounded-xl bg-[#D1D5DB] text-black text-center py-2 hover:text-black hover:bg-stone-50">Маш хүчтэй</a>
                                </div>
                                <button onClick={closeHandle} className="text-right pt-13 pr-5 text-white">Хаах</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
        <div className="flex justify-evenly">
            <div className="flex flex-col gap-1">
                <a href="#"><img src="https://insightfultraits.com/wp-content/uploads/2024/12/red-personality-min-768x768-png.avif" alt="" className="h-55"/></a>
                <h1 className="flex justify-center text-xl">Стресс</h1>
                <button className="px-4 py-1 text-white hover:text-white rounded-full bg-[#7f5af0] hover:bg-[#f9593a]" onClick={handleBtn}>Авах</button>
            </div>
        {
            selectItem && (
                <div className="fixed top-0 left-0 w-[100vw] h-[100vh] ">
                    <div className="w-[100vw] h-[100vh] relative flex justify-center items-center">
                        <button onClick={closeHandle} className="w-[100vw]  h-[100vh] absolute-50 top-0 left-0" >
                            lol
                        </button>
                        <div className="bg-slate-600 p-3 rounded-xl absolute z-[1] flex flex-col px-10 py-10">
                            <div className="flex justify-between text-white">
                                <h1 className="text-3xl text-center pt-3 pl-20">Та түвшинг сонгоно уу</h1>
                                <button type="button" onClick={closeHandle} class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <span class="sr-only">Close menu</span>
                                <svg class="h-6 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                </button>
                            </div>
                            <div className="flex flex-col gap-5 justify-center pt-15 text-white">
                                <a href="" className="border rounded-xl bg-[#D1D5DB] text-black text-center py-2 hover:text-black  hover:bg-stone-50">Хэвийн</a>
                                <a href="" className="border rounded-xl bg-[#D1D5DB] text-black text-center py-2 hover:text-black hover:bg-stone-50">Хөнгөн</a>
                                <a href="" className="border rounded-xl bg-[#D1D5DB] text-black text-center py-2 hover:text-black hover:bg-stone-50">Дунд зэрэг</a>
                                <a href="" className="border rounded-xl bg-[#D1D5DB] text-black text-center py-2 hover:text-black hover:bg-stone-50">Хүчтэй</a>
                                <a href="" className="border rounded-xl bg-[#D1D5DB] text-black text-center py-2 hover:text-black hover:bg-stone-50">Маш хүчтэй</a>
                            </div>
                            <button onClick={closeHandle} className="text-right pt-13 pr-5 text-white">Хаах</button>
                        </div>
                    </div>
                </div>
            )
        }
            <div className="flex flex-col gap-1">
                <a href="#"><img src="https://insightfultraits.com/wp-content/uploads/2024/12/green-personality-min-png.avif" alt="" className="h-55"/></a>
                <h1 className="flex justify-center text-xl">Өөртөө итгэх итгэл</h1>
                <button className="px-4 py-1 text-white rounded-full bg-[#078080] hover:bg-[#f9593a]" onClick={handleBtn}>Авах</button>
            </div>
            {
                selectItem && (
                    <div className="fixed top-0 left-0 w-[100vw] h-[100vh] ">
                        <div className="w-[100vw] h-[100vh] relative flex justify-center items-center">
                            <button onClick={closeHandle} className="w-[100vw]  h-[100vh] absolute-50 top-0 left-0" >
                                lol
                            </button>
                            <div className="bg-slate-600 p-3 rounded-xl absolute z-[1] flex flex-col px-10 py-10">
                                <div className="flex justify-between text-white">
                                    <h1 className="text-3xl text-center pt-3 pl-20">Та түвшинг сонгоно уу</h1>
                                    <button type="button" onClick={closeHandle} class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <span class="sr-only">Close menu</span>
                                    <svg class="h-6 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    </button>
                                </div>
                                <div className="flex flex-col gap-5 justify-center pt-15 text-white">
                                    <a href="" className="border rounded-xl bg-[#D1D5DB] text-black text-center py-2 hover:text-black  hover:bg-stone-50">Хэвийн</a>
                                    <a href="" className="border rounded-xl bg-[#D1D5DB] text-black text-center py-2 hover:text-black hover:bg-stone-50">Хөнгөн</a>
                                    <a href="" className="border rounded-xl bg-[#D1D5DB] text-black text-center py-2 hover:text-black hover:bg-stone-50">Дунд зэрэг</a>
                                    <a href="" className="border rounded-xl bg-[#D1D5DB] text-black text-center py-2 hover:text-black hover:bg-stone-50">Хүчтэй</a>
                                    <a href="" className="border rounded-xl bg-[#D1D5DB] text-black text-center py-2 hover:text-black hover:bg-stone-50">Маш хүчтэй</a>
                                </div>
                                <button onClick={closeHandle} className="text-right pt-13 pr-5 text-white">Хаах</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    </div>
</div>
}