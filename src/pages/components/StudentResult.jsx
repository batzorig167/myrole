import { useState } from "react";
import userMedeelel from "../utils/userData";

export default function StudentResult(){
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
    return <div className="h-[100vh] flex justify-center">
        <div className="max-w-lg flex flex-col justify-start items-center">
            <div className="">
                <h1 className="text-[22px] text-center font-normal">Тест бөглөсөн сурагчдын мэдээлэл</h1>
            </div>
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