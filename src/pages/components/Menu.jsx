import Link from "next/link";
// import Dashboard from ".Dashboard";

export default function Menu() {
    return <div>
        <div className="flex flex-col pl-10 pr-10 gap-3 rounded-xl bg-[#fff] h-200 pt-8 text-black">
                <div>
                    <button ><img src="https://bcassetcdn.com/social/tqtwz2wdy6/preview.png" alt="" className="rounded-md h-35" /></button>
                </div>
                <div className="flex flex-col gap-3">
                    <p className="text-sm">Main Menu</p>
                    <a href="/dashboard" className="flex pl-5 text-[#9197B3] hover:bg-[#5932EA] rounded-md hover:text-[#fff]">Home</a>
                    <a href="/list" className="flex pl-5 text-[#9197B3] hover:bg-[#5932EA] rounded-md hover:text-[#fff]">Dashboard</a>
                    <a href="/message" className="flex pl-5 text-[#9197B3] hover:bg-[#5932EA] rounded-md hover:text-[#fff]">Message</a>
                </div>
                <div className="flex flex-col gap-3">
                    <h1 className="text-sm">General</h1>
                    <a href="#" className="flex pl-5 text-[#9197B3] hover:bg-[#5932EA] rounded-md hover:text-[#fff]">Report</a>
                    <a href="#" className="flex pl-5 text-[#9197B3] hover:bg-[#5932EA] rounded-md hover:text-[#fff]">Support</a>
                    <a href="#" className="flex pl-5 text-[#9197B3] hover:bg-[#5932EA] rounded-md hover:text-[#fff]">My Account</a>
                </div>
                
        </div>
    </div>
}