import { useEffect, useState } from "react";
import userMedeelel from "../utils/userData";

export default function StudentResult(){
    const [userData,setUserData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('/api/test-result');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log(result);
            setUserData(result)
          } catch (error) {
            setError(error.message); // Handle any error that occurs
          }
        };
    
        fetchData(); // Call the fetch function
      }, []);
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
                            <td className="flex items-center hidden md:block">{data.lastname}</td>
                            <td>{data.firstname}</td>
                            <td>{data.class + data.buleg}</td>
                            <td>{data.challenge.name}</td>
                            <td>{data.score}</td>
                            <td>{data.createdAt}</td>
                        </tr>
                        })
                    }
                
                </tbody>
            </table>
            </div>
    </div>
}