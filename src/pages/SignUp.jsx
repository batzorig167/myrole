import { useState } from "react"
import { useUser } from "./Context/UserContext"
import { useRouter } from "next/router";

export default function Home(){
    const {setUser} = useUser();
    const handleChange = (e)=>{
        // console.log(e.target.name)
        // console.log(e.target.value)
    }
    const router = useRouter();
    const submitHandle = (e)=>{
        e.preventDefault();
        // console.log(e.target.class.value)
        // console.log(e.target.buleg.value)
        // console.log(e.target.lastname.value)
        // console.log(e.target.firstname.value);

        let a = {
            class:e.target.class.value,
            buleg:e.target.lastname.value,
            lastName:e.target.lastname.value,
            firstName:  e.target.firstname.value,
        }
        setUser(a);
        router.push("/taketest")
        // console.log("ilgeesen data",a);
    }
    return <div className="h-[100vh] flex justify-center items-center">
            <div className="flex justify-center">
                <form action="" onSubmit={submitHandle} className="flex flex-col gap-2 border rounded-2xl px-40 h-120">
                    <div>
                        <h1 className="text-center text-3xl pb-8">Анги нэрээ крилл үсгээр бөглөнө үү</h1>
                        <div className="flex gap-2">
                            <div className="flex gap-1">
                                <label className="text-base" htmlFor="class">Анги:</label>
                                <input className="border rounded-md px-2" type="text" name="class" id="class" onChange={handleChange}/>
                            </div>
                            <div className="flex gap-1">
                                <label htmlFor="buleg">Бүлэг:</label>
                                <input className="border rounded-md px-2" type="text" name="buleg" id="buleg" onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="lastname">Овог:</label>
                            <input className="border rounded-md px-2" type="text" name="lastname" id="lastname" onChange={handleChange}/>
                        </div>
                        <div className="flex gap-5.5">
                            <label htmlFor="firstname">Нэр:</label>
                            <input className="border rounded-md px-2" type="text" name="firstname" id="firstname"onChange={handleChange} />
                        </div>
                    </div>
                    <div>
                        <input type="submit" value="Нэвтрэх" />
                    </div>
                </form>
            </div>
    </div>
}