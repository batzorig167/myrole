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
    return <div className="h-[100vh] w-full m-auto-screen bg-center bg-cover flex justify-center items-center bg-[#333]"> 
            <form onSubmit = {handleSubmit} className="bg-[#fff] rounded-xl flex flex-col border gap-4 px-12 py-12 w-100 bg-white">
                <h1 className="flex justify-center text-2xl">Нэвтрэх</h1>
                <input type="text" name="username" id="" placeholder="Нэвтрэх нэрийг бичнэ үү" className="border py-2 rounded-[10px] text-center transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"onChange={handleChange} />
                <input type="text" name="email" id="" placeholder="Имэйл хаягаа оруулна уу" className="border py-2 rounded-[10px] text-center transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" onChange={handleChange}/>
                <input type="password" name="password" id="" placeholder="Нууц үгээ оруулна уу" className="border py-2 rounded-[10px] text-center transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" onChange={handleChange}/>
                <button className="text-left"><Link href="/" className="hover:underline underline-offset-4">Нууц үгээ мартсан уу?</Link></button>
                <button className="border rounded-full py-1 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-blue-500 hover:text-white"><Link href="/Home"><input type="submit" value="Нэвтрэх"/></Link></button>
            </form>
    </div>
}