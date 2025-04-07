import Challenge from "./components/Challenge";
import { useScore } from "./Context/ScoreContext";
import { useUser } from "./Context/UserContext";
import { challenge, test } from "./utils/data";


export default function Home() {
    const {score,tuvshin} = useScore();
    const {testUser,setTestUser} = useUser();
        console.log("challenge=",testUser);
    return <div>
        {/* ene ni onoog harulj bsn  */}
        {/* <h1>{"ONoo:"+score}</h1>
        <h1>{"Tuvshin:"+tuvshinRank}</h1> */}
        <Challenge props={tuvshin}/>
    </div>
}