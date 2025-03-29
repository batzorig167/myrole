import Link from "next/link";

export default function Task() {
    return <div>
    <div className="flex justify-center justify-evenly">
        <div className="flex flex-col gap-1">
            <button><Link href="/"><img src="https://insightfultraits.com/wp-content/uploads/2024/12/blue-personality-min-png.avif" alt="" className="h-55"/></Link></button>
            <h1 className="flex justify-center text-xl">7хоногийн даалгавар</h1>
            <button className="px-4 py-1 text-white rounded-full bg-blue-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"><Link href="/" className="">Авах</Link></button>
        </div>
        <div className="flex flex-col gap-1">
            <button><Link href="/"><img src="https://insightfultraits.com/wp-content/uploads/2024/12/purple-personality-min-768x768-png.avif" alt="" className="h-55"/></Link></button>
            <h1 className="flex justify-center text-xl">30хоногийн даалгавар</h1>
            <button className="px-4 py-1 text-white rounded-full bg-blue-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"><Link href="/">Авах</Link></button>
        </div>
        <div className="flex flex-col gap-1">
            <button><Link href="/"><img src="https://insightfultraits.com/wp-content/uploads/2024/12/red-personality-min-768x768-png.avif" alt="" className="h-55"/></Link></button>
            <h1 className="flex justify-center text-xl">3сарын даалгавар</h1>
            <button className="px-4 py-1 text-white rounded-full bg-blue-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"><Link href="/">Авах</Link></button>
        </div>
    </div>
</div>
}