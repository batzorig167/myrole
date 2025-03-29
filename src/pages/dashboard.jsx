import Dashboard from "./components/Dashboard";
import Test from "./components/Div";
import { useUser } from "./Context/UserContext";

export default function Home(){
    const {user,setUser} = useUser()
    console.log("dashboard=",user)
    return <div>
        <Dashboard/>
    </div>
}