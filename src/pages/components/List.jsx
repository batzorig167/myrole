import Link from "next/link";
import Menu from "./Menu";
import Student from "./Suragchid";

export default function List()
{
    return <div className="bg-gray-100 max-auto-screen">
        <div className="flex justify-between">
            <div className="w-[16%]">
                <Menu/>
            </div>
            <div className="w-[82%] pr-[2%]">
                <Student/>
            </div>
        </div>
    </div>
}