import Link from "next/link";

export default function Info(){
    return <div className="flex justify-evenly py-10 bg-[#dfdee3]">
        <div className="flex flex-col items-start gap-2 text-base">
            <h1 className="text-[#5e17eb]">Нүүр хуудас</h1>
            <a href="#"><span className ="link link-underline link-underline-black text-black no-underline">Үйлчилгээний нөхцөл</span></a>
            <a href="#"><span className="link link-underline link-underline-black text-black no-underline">Үйлчилгээ</span></a>
            <a href="#"><span className="link link-underline link-underline-black text-black no-underline">Бидний тухай</span></a>
        </div>
        <div className="flex flex-col items-start gap-2 text-base">
            <h1 className="text-[#5e17eb]">Туслалцаа</h1>
            <a href="#"><span className="link link-underline link-underline-black text-black no-underline">Дэмжлэг</span></a>
            <a href="#"><span className="link link-underline link-underline-black text-black no-underline">Мэдээллэx</span></a>
        </div>
        <div className="flex flex-col items-start gap-2 text-base">
            <h1 className="text-[#5e17eb]">Холбогдох</h1>
            <a href="#"><span className="link link-underline link-underline-black text-black no-underline">+976-902345553</span></a>
            <div className="flex gap-2">
                <img src="https://cdn-icons-png.flaticon.com/128/15047/15047435.png" alt="" className="h-6" />
                <a href="#"><span className="link link-underline link-underline-black text-black no-underline">BR-Coding</span></a>
            </div>
        </div>
    </div>
}