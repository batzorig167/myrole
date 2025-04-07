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
    <div className="flex w-[100%] justify-around flex-wrap">
            <div className="flex flex-col gap-1 w-[45%] items-center md:w-[20%]">
                <button className="flex justify-center"><img src="https://insightfultraits.com/wp-content/uploads/2024/12/blue-personality-min-png.avif" alt="" className="w-[80%]"/></button>
                <h1 className="flex justify-center text-lg md:text-xl md:h-[50px] items-center">Сэтгэл гутрал</h1>
                <button className="px-4 py-1 text-[#fff] rounded-full bg-[#272343] w-[80%] mb-[15px] border" onClick={handleBtn}>Авах</button>
            </div>
           
            <div className="flex flex-col gap-1 w-[45%] items-center md:w-[20%]">
                <button className="flex justify-center"><img src="https://insightfultraits.com/wp-content/uploads/2024/12/purple-personality-min-768x768-png.avif" alt="" className="w-[80%]"/>
                    </button>
                <h1 className="flex justify-center text-lg md:text-xl md:h-[50px] items-center">Түгшүүр</h1>
                <button className="px-4 py-1 text-[#fff] rounded-full bg-[#272343] w-[80%] mb-[15px] border" onClick={handleBtn}>Авах</button>
            </div>
           
            <div className="flex flex-col gap-1 w-[45%] items-center md:w-[20%]">
                <button className="flex justify-center"><img src="https://insightfultraits.com/wp-content/uploads/2024/12/red-personality-min-768x768-png.avif" alt="" className="w-[80%]"/></button>
                <h1 className="flex justify-center text-lg md:text-xl md:h-[50px] items-center">Стресс</h1>
                <button className="px-4 py-1 text-[#fff] rounded-full bg-[#272343] w-[80%] mb-[15px] border" onClick={handleBtn}>Авах</button>
            </div>
        
            <div className="flex flex-col gap-1 w-[45%] items-center md:w-[20%]">
                <button className="flex justify-center"><img src="https://insightfultraits.com/wp-content/uploads/2024/12/green-personality-min-png.avif" alt="" className="w-[80%]"/></button>
                <h1 className="flex justify-center text-lg text-center md:text-xl md:h-[50px] items-center">Өөртөө итгэх итгэл</h1>
                <button className="px-4 py-1 text-[#fff] rounded-full bg-[#272343] w-[80%] mb-[15px] border" onClick={handleBtn}>Авах</button>
            </div>
            {
                selectItem && (
                    <div className="fixed top-0 left-0 w-[100vw] h-[100vh] ">
                        <div className="w-[100vw] h-[100vh] relative flex justify-center items-center">
                            <button onClick={closeHandle} className="w-[100vw] bg-[black] opacity-50  h-[100vh] absolute-50 top-0 left-0" >
                                lol
                            </button>
                            <div className="bg-[#bae8e8] rounded-xl absolute z-[1] flex flex-col p-3">
                                <div className="flex justify-between text-[#272343]">
                                    <h1 className="text-2xl text-center pt-3 pl-10 ">Та түвшинг сонгоно уу</h1>
                                    <button type="button" onClick={closeHandle} class="rounded-md inline-flex items-center justify-center text-[#272343] pl-[15px] pr-[5px] pt-5">
                                    <span class="sr-only">Close menu</span>
                                    <svg class="h-6 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    </button>
                                </div>
                                <div className="flex flex-col gap-5 justify-center pt-10 px-[20px]">
                                    <a href="" className=" rounded-xl bg-[white] text-[#2d334a] text-center py-2">Хэвийн</a>
                                    <a href="" className=" rounded-xl bg-[white] text-[#2d334a] text-center py-2">Хөнгөн</a>
                                    <a href="" className=" rounded-xl bg-[white] text-[#2d334a] text-center py-2">Дунд зэрэг</a>
                                    <a href="" className=" rounded-xl bg-[white] text-[#2d334a] text-center py-2">Хүчтэй</a>
                                    <a href="" className=" rounded-xl bg-[white] text-[#2d334a] text-center py-2">Маш хүчтэй</a>
                                </div>
                                <button onClick={closeHandle} className="text-right pt-10 pr-5 text-[#2d334a]">Хаах</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
</div>
}