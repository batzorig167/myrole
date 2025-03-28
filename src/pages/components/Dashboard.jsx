import Link from "next/link";
import Menu from "./Menu";
import Student from "./Suragchid";

export default function Dashboard()
{
    return <div className=" bg-gray-100 m-auto-screen container">
        <div className="flex gap-18">
            <Menu/>
            <Student/>
        </div>
    </div>
}