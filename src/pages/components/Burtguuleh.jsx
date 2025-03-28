import Link from "next/link";

export default function Burtguuleh(){
    return <div className="h-[100vh] w-full m-auto-screen bg-center bg-cover flex justify-center items-center bg-[#333]"> 
        <form onSubmit = {handleSubmit} className="bg-[#fff] rounded-xl flex flex-col border gap-5 px-12 py-12 w-100 bg-white text-[black]">
            <h1 className="flex justify-center text-4xl font-semibold">Бүртгүүлэх</h1>
            <input type="text" name="email"id="" placeholder="Email хаягаа оруулнө уу" className="border border-gray-500 py-2 rounded-[5px] text-center delay-150 duration-300 ease-in-out hover:scale-104 hover:border hover:border-[black]" onChange={handleChange}/>
            <input type="text" name="username" id="" placeholder="Нэвтрэх нэрээ оруулна уу" className="border border-gray-500 py-2 rounded-[5px] text-center delay-150 duration-300 ease-in-out hover:scale-104 hover:border hover:border-[black]"onChange={handleChange} />
            <input type="password" name="password" id="" placeholder="Нууц үгээ оруулна уу" className="border border-gray-500 py-2 rounded-[5px] text-center delay-150 duration-300 ease-in-out hover:scale-104 hover:border hover:border-[black]" onChange={handleChange}/>
            <button className="border rounded-[5px] bg-gray-600 text-[white] py-1 hover duration-300 ease-in-out hover:scale-107 "><Link href="/"><input type="submit" value="Бүртгүүлэх"/></Link></button>
            <button className="text-center text-gray-600"><Link href="/" className="hover:underline underline-offset-3 hover:text-[black] delay-100">I already have an account</Link></button>
        </form>
</div>
}