import Link from "next/link";
import { userAgent } from "next/server"
import { useState } from "react"
import { useUser } from "../Context/UserContext";
import { useRouter } from "next/router";

export default function Login(){
    const {user, setUser} = useUser();
    const [data,setdata] = useState({
        username:"",
        password:""
    })
    const router = useRouter();
    console.log(data);
    const handleChange = (e)=>{
        setdata({...data, [e.target.name]:e.target.value});
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        // alert(data.username, data.email , data.password);
        if(data.username == "bat" && data.password == '123'){
            setUser(data);
            router.push('/dashboard')
        }
        else {
            setUser(data);
            router.push('/landingPage')
        }
        console.log("Ilgeesen utga",data);
    }
    return <div className="h-[100vh] w-full m-auto-screen bg-center bg-cover flex justify-center items-center bg-[#333] text-black"> 
            <form onSubmit = {handleSubmit} className=" rounded-xl flex flex-col border gap-5 px-12 py-12 w-100 bg-white">
                <h1 className="flex justify-center text-4xl font-semibold">Нэвтрэх</h1>
                <input type="text" name="username" id="" placeholder="Нэвтрэх нэрээ оруулна уу" className="border border-gray-500 py-2 rounded-[5px] text-center delay-150 duration-300 ease-in-out hover:scale-102 hover:border hover:border-[black]"onChange={handleChange} />
                <input type="password" name="password" id="" placeholder="Нууц үгээ оруулна уу" className="border border-gray-500 py-2 rounded-[5px] text-center delay-150 duration-300 ease-in-out hover:scale-102 hover:border hover:border-[black]" onChange={handleChange}/>
                <input type="submit" value="Нэвтрэх" className="border rounded-md py-1"/>
            </form>
    </div>
}