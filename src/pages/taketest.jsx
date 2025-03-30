import { useState } from "react";
import { challenge, test } from "./utils/data";
import Challenge from "./components/Challenge";
import { useUser } from "./Context/UserContext";
import { useRouter } from "next/router";
import { useScore } from "./Context/ScoreContext";

export default function Home(){
    const {urdun,setUrdun} = useState();
    const {user} = useUser();
    const taketestData = test;
    // context ees tuvshin ni tuvshin props oor damjuln
    const {tuvshin,setTuvshin} = useScore();
    // testShow ni door challengee gargaj irj bsn odo nehh herggu
    const [testShow,setTestShow]= useState(null);
    // testIndex ni test iin idex
    const [testIndex, setTestIndex] =useState(0);
    // ene ni asuultin index
    const [qIndex, setQindex] = useState(0);
    // context ees onoo tuvshin 2 orulj irn
    const {score, setScore} = useScore()
    const [challIndex,setChallIndex] = useState(0);
    const [result , setResult] = useState([]);
    const router = useRouter();
    console.log("tuvshin",challenge[0].tuvshin, tuvshin, challenge[0], "lol");
    console.log("үр дүн=",result);
    function handleSubmit(props){
        setScore(score + props.score)
        // console.log(score)
        if(qIndex<test[testIndex].question.length-1){
            setQindex(qIndex +1);
        }
        else {
            setTestShow(7)
            show()
            checkTuvshin()
            setTestShow(2)
            router.push("/challenge")
        }

    }
    function show(){
        setTestShow(1);
    }
    function checkTuvshin(){
        console.log("check")
        if(score >=0 && score <5){
            let filterRank =challenge[0].challenge.filter((data)=>data.rank ==1);
            console.log("rank",filterRank)
            setResult("Хэвийн") 
            setTuvshin(filterRank);
        }else
        if(score>=5 && score<=6){
            let filterRank =challenge[0].challenge.filter((data)=>data.rank ==2);
            console.log("rank",filterRank)
            setTuvshin(filterRank);
            setResult("Хөнгөн") 
        }else    
        if(score>=7 && score<=10){
            let filterRank =challenge[0].challenge.filter((data)=>data.rank ==3);
            setTuvshin(filterRank);
            setResult("Дунд зэрэг") 
        }else
        if(score>=11 && score<=13){
            let filterRank =challenge[0].challenge.filter((data)=>data.rank ==4);
            setTuvshin(filterRank);
            setResult("Хүчтэй") 
        }else
        if(score>=14){
            let filterRank =challenge[0].challenge.filter((data)=>data.rank ==4);
            setTuvshin(filterRank);
            setResult("Маш хүчтэй") 
        }
    }
    return <div>
        <div>
            <h1>{"Onoo:"+score}</h1>
             <h1>{"Анги:"+user.class}</h1>
             <h1>{"Бүлэг:"+user.buleg}</h1>
             <h1>{"Анги:"+user.firstName}</h1>
        </div>
        <div className="h-[70vh] flex justify-center items-center">
            <div className="flex flex-col items-center gap-5">
                <h1>{"Сэдэв: "+test[testIndex].testName}</h1>
                <h1>
                    {                            
                        test[testIndex].question[qIndex]
                    }
                </h1>
                <div className="flex flex-col gap-4">
                    {
                        test[testIndex].result.map((data,index)=>{
                            return <button key={index} onClick={()=>handleSubmit(data)}>{data.result}</button>
                        })
                    }
                </div>
                </div>
            </div>
            {/* <button onClick={show}>show</button> */}
        {/* {
            testShow && (
                <h1 className="text-xl">{"оноо:"+score}</h1>
            )
        } */}
        {/* < div className="flex justify-center gap-5">
            <div className="px-80 py-5 flex flex-col gap-3">
            {
                testShow && (
                    <h1 className="text-xl flex justify-center">{"Таний сэтгэл зүйн түвшин:"+result}</h1>
                )
            }
            {
                testShow && 
                (
                    <h1 className="text-xl flex justify-center">Танд санал болгох чалленж даалгаврууд</h1>
                )
            }
                {
                    testShow && 
                    (
                        router.push("/challenge")
                        // <Challenge props={tuvshin} />
                    )
                }
            </div>
        </div> */}
        </div>
}