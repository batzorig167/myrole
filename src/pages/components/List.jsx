import Link from "next/link";
import Menu from "./Menu";
import Student from "./Suragchid";

export default function List()
{
    return <div className=" bg-gray-100 m-auto-screen">
        <div className="flex gap-18">
            <Menu/>
            <Student/>
        </div>
    </div>
}