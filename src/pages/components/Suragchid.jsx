export default function Suragchid() {
    return <div>
        <div className="flex flex-col bg-[#fff]  h-300">
                <div className="flex  justify-between gap-20 pt-8 px-6">
                    <h1>Сайн байна уу? Хүний нэр</h1>
                    <div className=" flex border rounded-md px-2">
                        <img className="h-7 w-7" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/1024px-Search_Icon.svg.png" alt="" />
                        <input type="text" placeholder="Search" className="rounded-md pl-1"/>
                    </div>
                </div>
                <div className="flex gap-50 pt-8 bg-emerald-50 px-6">
                    <h1>Nickname</h1>
                    <h1>Овог</h1>
                    <h1>Нэр</h1>
                    <h1>Утасны Дугаар</h1>
                    <h1>Анги</h1>
                    <h1>Дэлгэрэнгүй</h1>
                </div>
            </div>
    </div>
}