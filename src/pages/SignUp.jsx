import { useState } from "react"
import { useUser } from "./Context/UserContext"
import { useRouter } from "next/router";

export default function Home(){
    const {setUser} = useUser();
    const handleChange = (e)=>{
        console.log(e.target.name)
        console.log(e.target.value)
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
        console.log("ilgeesen data",a);
    }
    return <div className="h-[100vh] flex justify-center items-center bg-[#264ECA]">
            <div className="flex justify-center">
                <form action="" onSubmit={submitHandle} className="flex flex-col justify-evenly  border rounded-2xl px-40 h-120  bg-white">
                    <div>
                        <h1 className="text-center text-3xl pb-8">Анги нэрээ крилл үсгээр бөглөнө үү</h1>
                        <div className="flex justify-between">
                            <div className="flex gap-1">
                                <label className="text-xl" htmlFor="class">Анги:</label>
                                {/* <input className="border rounded-md px-2 py-1" type="number" name="class" 
                                id="class" placeholder="Ангиа сонгоно уу" onChange={handleChange}/> */}
                                <select name="class" 
                                id="class" onChange={handleChange} className="border rounded-md px-2 py-1 bg-white text-black">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                            </div>
                            <div className="flex gap-1">
                                <label htmlFor="buleg" className="text-xl">Бүлэг:</label>
                                {/* <input className="border rounded-md px-2 py-1" type="text" name="buleg" id="buleg" placeholder="Бүлэгээ сонгоно уу" onChange={handleChange}/> */}
                                <select name="buleg" id="buleg" onChange={handleChange} className="border rounded-md px-2 py-1 bg-white text-black">
                                    <option value="1">А</option>
                                    <option value="2">Б</option>
                                    <option value="3">В</option>
                                    <option value="4">Г</option>
                                    <option value="5">Д</option>
                                    <option value="6">Е</option>
                                    <option value="7">Ж</option>
                                    <option value="8">1</option>
                                    <option value="9">2</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="lastname" className="text-xl">Овог:</label>
                            <input className="border rounded-md px-2 py-1" type="text" name="lastname" id="lastname" onChange={handleChange} placeholder="Овогоо бичнэ үү"/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="firstname" className="text-xl">Нэр:</label>
                            <input className="border rounded-md px-2 py-1" type="text" name="firstname" id="firstname"onChange={handleChange} placeholder="Нэрээ бичнэ үү" />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <input type="submit" value="Цааш" className="border rounded-md px-6 py-2 text-xl text-black bg-white"/>
                    </div>
                </form>
            </div>
    </div>
}