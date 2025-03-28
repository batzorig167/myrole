import Link from "next/link";
import { userAgent } from "next/server"
import { useState } from "react"

export default function Login(){
    const [data,setdata] = useState({
        username:"",
        email:"",
        password:""
    })
    console.log(data);
    const handleChange = (e)=>{
        setdata({...data, [e.target.name]:e.target.value});
    }
    const handleSubmit = (e)=>{
        // e.preventDefualt();
        alert(data.username, data.email , data.password);
        console.log("Ilgeesen utga",data);
    }
    return <div className="h-[100vh] w-full m-auto-screen bg-center bg-cover flex justify-center items-center bg-[black]]"> 
            <form onSubmit = {handleSubmit} className=" rounded-xl flex flex-col border gap-5 px-12 py-12 w-100 bg-[white] text-[black]">
                <h1 className="flex justify-center text-4xl font-semibold">Нэвтрэх</h1>
                <input type="text" name="username" id="" placeholder="Нэвтрэх нэрээ оруулна уу" className="border border-gray-500 py-2 rounded-[5px] text-center delay-150 duration-300 ease-in-out hover:scale-102 hover:border hover:border-[black]"onChange={handleChange} />
                <input type="password" name="password" id="" placeholder="Нууц үгээ оруулна уу" className="border border-gray-500 py-2 rounded-[5px] text-center delay-150 duration-300 ease-in-out hover:scale-102 hover:border hover:border-[black]" onChange={handleChange}/>
                <button className="text-left text-gray-600"><Link href="/" className="hover:underline underline-offset-3 hover:text-[black] delay-100">Нууц үгээ мартсан уу?</Link></button>
                <button className="border rounded-[5px] bg-gray-600 text-[white] py-1 hover duration-300 ease-in-out hover:scale-106 "><Link href="/"><input type="submit" value="Бүртгүүлэх"/></Link></button>
            </form>
    </div>
}