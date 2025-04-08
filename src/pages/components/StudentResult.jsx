import { useEffect, useState } from "react";
import userMedeelel from "../utils/userData";

export default function StudentResult(){
    const [userData,setUserData] = useState([]);
    const [allUser, setAlluser] = useState([])
    const [search,setSearch] = useState()
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('/api/test-result');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setUserData(result);
            setAlluser(result);
          } catch (error) {
            setError(error.message); // Handle any error that occurs
          }
        };
    
        fetchData(); // Call the fetch function
      }, []);
      const  handleSubmit = (e)=>{
        e.preventDefault();
        console.log("val",e.target.search.value);
        const filteredData = allUser.filter(item =>
            Object.values(item).some(value =>
              value?.toString().toLowerCase().includes(search.toLowerCase())
            ) || item.challenge?.name.toString().toLowerCase().includes(search.toLowerCase())
          );
          console.log(filteredData)
          setUserData(filteredData)
        }
      function sortOvog(){
        let sortedData = [...userData].sort((a, b) => {
            if (a.lastname > b.lastname) return 1;
            if (a.lastname < b.lastname) return -1;
            return 0;
          });
        
          console.log(sortedData);
          setUserData(sortedData);
      }
      function sortFirstname(){
        let sortedData = [...userData].sort((a, b) => {
            if (a.firstname > b.firstname) return 1;
            if (a.firstname < b.firstname) return -1;
            return 0;
          });
        
          console.log(sortedData);
          setUserData(sortedData);
      }
      
    return <div className="h-[100vh] flex justify-center">
        <div className="max-w-lg flex flex-col justify-start items-center">
            <div className="">
                <h1 className="text-[22px] text-center font-normal">Тест бөглөсөн сурагчдын мэдээлэл</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="search"  className="border"     onChange={(e) => setSearch(e.target.value)}
                    />
                    <input type="submit" value="search" />
                </form>
            </div>
            <table className=" flex table text-center  border-[#f4f6f6] ">
                <thead>
                <tr className="flex items-center">
                    <th className="w-[10px]  flex items-center justify-center">№</th>
                    <th className="flex items-center w-[120px]  hidden md:block">
                        <button onClick={sortOvog}>
                        Овог
                        </button>
                        </th>
                    <th className="flex items-center w-[120px] "><button onClick={sortFirstname}>
                        Нэр
                        </button></th>
                    <th className="w-[40px]  flex items-center justify-center">Анги</th>
                    <th className="w-[280px]  flex items-center justify-center">Тест</th>
                    <th className="w-[50px]  flex items-center justify-center">Оноо</th>
                    <th className="w-[120px]  flex items-center justify-center">Түвшин</th>
                    <th className="w-[150px]  flex items-center justify-center">Огноо/сар,өдөр/</th>
                </tr>
                </thead>
                <tbody>
                    {
                        userData.map((data,index)=>{
                            return <tr key={index} className="flex flex-wrap items-center odd:bg-[#f4f6f6]">
                            <th className="w-[10px]  flex items-center justify-center">{index + 1}</th>
                            <td className="flex items-center w-[120px]  hidden md:block">{data.lastname}</td>
                            <td className="flex items-center w-[120px] ">{data.firstname}</td>
                            <td className="w-[40px]  flex items-center justify-center">{data.class + data.buleg}</td>
                            <td className="w-[280px]  flex items-center justify-center">{data.challenge == null ? "Чалленж сонгоогүй":data.challenge.name}</td>
                            <td className="w-[50px]  flex items-center justify-center">{data.score}</td>
                            <td className="w-[120px]  flex items-center justify-center">{data.tuvshin}</td>
                            <td className="w-[150px]  flex items-center justify-center">{data.createdAt}</td>
                        </tr>
                        })
                    }
                
                </tbody>
            </table>
            </div>
    </div>
}