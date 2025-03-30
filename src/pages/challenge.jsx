import Challenge from "./components/Challenge";
import { useScore } from "./Context/ScoreContext";
import { challenge, test } from "./utils/data";


export default function Home() {
    const {score,tuvshin} = useScore();
    return <div>
        {/* ene ni onoog harulj bsn  */}
        {/* <h1>{"ONoo:"+score}</h1> */}
        <Challenge props={tuvshin}/>
    </div>
}