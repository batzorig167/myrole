import Link from "next/link";
import Info from "./Info";

export default function Homepage() {
    return <div className="max-auto-screen bg-white">
        <div className="flex flex-col justify-center">
            <div className="flex justify-evenly gap-220 px-5 py-1">
                    <button><Link href="/"><img src="https://bcassetcdn.com/social/tqtwz2wdy6/preview.png" alt="" className="h-20 rounded-md"/></Link></button>
                    <div className="flex gap-10 px-5 flex-col justify-center">
                        <a href="Login" className="border rounded-md px-4 h-10 flex items-center">Бүртгүүлэх</a>
                </div>
            </div>
            <div className=" flex flex-col gap-8 px-15 bg-emerald-50 h-full py-20">
                <div className="items-center px-5 ">
                        <p className="flex justify-center text-4xl pb-3 text-blue-700 capitalize">Сэтгэл судлалын сайт</p>
                        <p className="flex justify-center text-2xl italic text-center px-20"> Энэхүү сэтгэл зүйн сайт нь хүмүүсийн сэтгэл зүйн эрүүл мэндийг дэмжих, зөвлөгөө өгөх, өөрийгөө хөгжүүлэх боломж олгох зорилготой. Энэ нь сэтгэлзүйн боловсрол түгээх, мэргэжлийн зөвлөгөө хүргэх, стресс, түгшүүрийг даван туулахад туслах платформ болно.</p>
                </div>
                <div className="flex flex-col gap-10">
                    <h1 className="flex justify-center text-3xl">Өгч болох тестүүд</h1>
                    <div className="flex justify-center justify-evenly">
                        <a href="/taketest" className="border w-100 py-2 rounded-xl text-xl text-center rounded-full text-xl h-12 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 text-[#fff] bg-[#f9593a] hover:bg-blue-500">Сэтгэл гутрал</a>
                        <a href="/taketest" className="border w-100 py-2 rounded-xl text-xl text-center rounded-full text-xl h-12 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 text-[#fff] bg-[#f9593a] hover:bg-blue-500">Стресс</a>
                    </div>
                    <div className="flex justify-center justify-evenly">
                        <a href="/taketest" className="border w-100 py-2 rounded-xl text-xl text-center rounded-full text-xl h-12 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 text-[#fff] bg-[#f9593a] hover:bg-blue-500">Өөртөө итгэх итгэл</a>
                        <a href="/taketest" className="border w-100 py-2 rounded-xl text-xl text-center rounded-full text-xl h-12 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 text-[#fff] bg-[#f9593a] hover:bg-blue-500">Түгшүүр</a>
                    </div>
                </div>
            </div>
        </div>
        <Info/>
    </div>
}