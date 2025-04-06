import Link from "next/link";
import Info from "./Info";

export default function Homepage() {
    return <div className="max-auto-screen bg-white">
        <div className="flex flex-col justify-center">
            <div className="flex justify-between px-5 py-1">
                    <button><Link href="/"><img src="https://bcassetcdn.com/social/tqtwz2wdy6/preview.png" alt="" className="h-20 rounded-md"/></Link></button>
                    <div className="flex gap-10 px-5 flex-col justify-center">
                        <a href="login" className="border rounded-md px-4 h-10 flex text-black items-center">Бүртгүүлэх</a>
                </div>
            </div>
            <div className=" flex flex-col gap-10 bg-[#e3f6f5] h-full py-10">
                <div className="px-3">
                    <div className="items-center px-2 py-1 rounded-[18px] bg-white">
                            <p className="flex justify-center text-3xl pb-3 text-blue-700">Сэтгэл судлалын сайт</p>
                            <p className="flex justify-center text-xl italic text-center px-2 text-black"> Энэхүү сэтгэл зүйн сайт нь хүмүүсийн сэтгэл зүйн эрүүл мэндийг дэмжих, зөвлөгөө өгөх, өөрийгөө хөгжүүлэх боломж олгох зорилготой. Энэ нь сэтгэлзүйн боловсрол түгээх, мэргэжлийн зөвлөгөө хүргэх, стресс, түгшүүрийг даван туулахад туслах платформ болно.</p>
                    </div>
                    <div className="flex flex-col gap-3 pt-10 px-5">
                        <h1 className="flex justify-center text-3xl text-black">Өгч болох тестүүд</h1>
                            <div className="flex flex-col gap-3 items-center">
                                <div className="flex gap-6">
                                    <div className="flex flex-col rounded-[20px] py-5 px-2 bg-white w-45">
                                        <img src="https://www.jobbank.gc.ca/themes-jb/images/quiz/quiz_preferences.svg" alt="" className="h-40 rounded-full"/>
                                    <a href="/SignUp" className="border py-2 rounded-xl flex justify-center text-sm text-center rounded-full text-xl h-12 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 text-[#fff] bg-[#f9593a] hover:bg-blue-500">Сэтгэл гутрал</a>
                                    </div>
                                    <div className="flex flex-col rounded-[20px] py-5 px-2 bg-white w-45">
                                        <img src="https://www.jobbank.gc.ca/themes-jb/images/quiz/quiz_abilities.svg" alt="" className="h-40 rounded-full"/>
                                        <a href="/SignUp" className="border py-2 rounded-xl text-sm text-center rounded-full text-xl h-12 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 text-[#fff] bg-[#f9593a] hover:bg-blue-500">Стресс</a>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="rounded-[20px] flex flex-col py-5 px-2 bg-white w-45">
                                        <img src="https://www.jobbank.gc.ca/themes-jb/images/quiz/quiz_intelligences.svg" alt=""  className="h-40 rounded-full"/>
                                        <a href="/SignUp" className="border py-2 px-2 rounded-xl text-sm text-center rounded-full text-xl h-12 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 text-[#fff] bg-[#f9593a] hover:bg-blue-500">Өөртөө итгэх итгэл</a>
                                    </div>
                                    <div className="rounded-[20px] bg-white flex flex-col py-5 px-2 w-45">
                                        <img src="https://www.jobbank.gc.ca/themes-jb/images/quiz/quiz_workvalues.svg" alt="" className="h-40 rounded-full"/>
                                        <a href="/SignUp" className="border py-2 rounded-xl text-sm text-center rounded-full text-xl h-12 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 text-[#fff] bg-[#f9593a] hover:bg-blue-500">Түгшүүр</a>
                                    </div>

                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        <Info/>
    </div>
}