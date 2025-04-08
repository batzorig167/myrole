import Link from "next/link";
import Info from "./Info";

export default function Homepage() {
    return <div className="bg-[white] m-auto">
        <div className="flex flex-col justify-center max-w-[1000px] bg-[#e3f6f5] m-auto">
            <div className="flex justify-between bg-[white] md:rounded-b-2xl overflow-hidden">
                <button><Link href="/"><img src="https://dynamic.design.com/preview/logodraft/e2387455-d3c5-4701-bd2c-8cadb44690e1/image/large.png" alt="" className="h-20 rounded-md px-[20px]"/></Link></button>
                <div className="flex gap-10 px-5 flex-col justify-center">
                        <a href="login" className="rounded-[4px] px-4 py-2 flex text-[#2d334a] bg-[white] border-[2px] border-[#2d334a]">Бүртгүүлэх</a>
                </div>
            </div>
            <div className="flex flex-col bg-[#e3f6f5] py-18 w-full">
                <div className="px-3">
                    <div className="flex justify-center">
                        <div className="items-center flex flex-col justify-center rounded-[18px] bg-[#fffffe] w-[90%] p-[18px]">
                            <p className="flex justify-center text-3xl pb-3 text-[#272343] font-semibold md:text-4xl">Сэтгэл судлалын сайт</p>
                            <p className="flex justify-center text-lg italic text-justify text-[#2d334a] md:text-xl">Энэхүү сэтгэл зүйн сайт нь хүмүүсийн сэтгэл зүйн эрүүл мэндийг дэмжих, зөвлөгөө өгөх, өөрийгөө хөгжүүлэх боломж олгох зорилготой. Энэ нь сэтгэлзүйн боловсрол түгээх, мэргэжлийн зөвлөгөө хүргэх, стресс, түгшүүрийг даван туулахад туслах платформ болно.</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 pt-10 w-full items-center">
                        <h1 className="flex justify-center text-3xl text-[2d334a] font-semibold">Өгч болох тестүүд</h1>
                        <div className="flex md:justify-between flex-wrap md:flex-row font-medium gap-3 w-[90%]">
                            <div className="flex flex-col rounded-[20px] py-5 px-2 bg-white w-[48%] md:w-[20%]">
                                <img src="https://www.jobbank.gc.ca/themes-jb/images/quiz/quiz_preferences.svg" alt="" className="h-40 rounded-full"/>
                                <a href="/SignUp" className="py-2 rounded-xl flex justify-center text-sm text-center bg-[#ffd803]">Сэтгэл гутрал</a>
                            </div>
                            <div className="flex flex-col rounded-[20px] py-5 px-2 bg-white w-[48%] md:w-[20%]">
                                <img src="https://www.jobbank.gc.ca/themes-jb/images/quiz/quiz_abilities.svg" alt="" className="h-40 rounded-full"/>
                                <a href="/SignUp" className=" bg-[#ffd803] py-2 rounded-xl text-sm text-center  bg-[#ffd803]">Стресс</a>
                            </div>
                            <div className="rounded-[20px] flex flex-col py-5 px-2 bg-white w-[48%] md:w-[20%]">
                                <img src="https://www.jobbank.gc.ca/themes-jb/images/quiz/quiz_intelligences.svg" alt=""  className="h-40 rounded-full"/>
                                <a href="/SignUp" className=" py-2 rounded-xl text-center text-sm bg-[#ffd803]">Өөртөө итгэх итгэл</a>
                            </div>
                            <div className="rounded-[20px] bg-white flex flex-col py-5 px-2 w-[48%] md:w-[20%]">
                                <img src="https://www.jobbank.gc.ca/themes-jb/images/quiz/quiz_workvalues.svg" alt="" className="h-40 rounded-full"/>
                                <a href="/SignUp" className=" py-2 rounded-xl text-center text-sm bg-[#ffd803]">Түгшүүр</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Info/>
    </div>
}