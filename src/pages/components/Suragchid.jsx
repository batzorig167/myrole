import { useState } from "react";
import userMedeelel from "../utils/userData";

export default function Suragchid() {
    const [userData,setUserData] = useState(userMedeelel);
    function sortScore(){
        // alert("ok")
        let sort = userData.sort((a,b)=>{
            if(a.score > b.score) {
                return 1;
            } 
            else {
                return -1;
            }
        });
        console.log(sort)
        setUserData(sort)
    }
    function sortClass(){
        let sort = userData.sort((a,b)=>{
            if(a.class > b.class){
                return 1;
            }
            else{
                return - 1;
            }
        });
        setUserData(sort)
        console.log(sort)
    }
    const [too, setToo] = useState(0)
    function hasah(){
        let a = too - 1
        setToo(a)
    }
    function nemeh(){
        let a = too + 1
        setToo(a)
    }
    return <div>
        <div className="flex flex-col bg-[#fff]  h-300 text-black">
                <div className="flex  justify-between gap-20 py-2 px-6">
                    <h1>Сайн байна уу?</h1>
                    <div className=" flex border rounded-md px-2">
                        <img className="h-7 w-7" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/1024px-Search_Icon.svg.png" alt="" />
                        <input type="text" placeholder="Search" className="rounded-md pl-1"/>
                    </div>
                </div>
                {/* <div className="flex gap-50 pt-8 bg-emerald-50 px-6 bg-[#e3f6f5]">
                    <h1>Nickname</h1>
                    <h1>Овог</h1>
                    <h1>Нэр</h1>
                    <h1>Утасны Дугаар</h1>
                    <h1>Анги</h1>
                    <h1>Дэлгэрэнгүй</h1>
                </div> */}
                 <table className=" flex table text-center border border-[#f4f6f6] ">
                <thead>
                <tr className="">
                    <th></th>
                    <th className="hidden md:block">Овог</th>
                    <th>Нэр</th>
                    <th>Анги</th>
                    <th >Тест</th>
                    <th>Оноо</th>
                    <th>Огноо/сар,өдөр/</th>
                </tr>
                </thead>
                <tbody>
                    {
                        userData.map((data,index)=>{
                            return <tr key={index} className="odd:bg-[#f4f6f6]">
                            <th>{index + 1}</th>
                            <td className="flex items-center hidden md:block">{data.lastName}</td>
                            <td>{data.firstName}</td>
                            <td>{data.class + data.buleg}</td>
                            <td>{data.category}</td>
                            <td>{data.score}</td>
                            <td>{data.date}</td>
                        </tr>
                        })
                    }
                
                </tbody>
            </table>
            </div>
    </div>
}