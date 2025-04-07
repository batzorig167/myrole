import { useState } from "react";
import { challenge, test } from "./utils/data";
import Challenge from "./components/Challenge";
import { useUser } from "./Context/UserContext";
import { useRouter } from "next/router";
import { useScore } from "./Context/ScoreContext";
import { useCategory } from "./Context/CategoryContext";

export default function Home(){
    const {urdun,setUrdun} = useState();
    const {user} = useUser();
    const taketestData = test;
    // context ees tuvshin ni tuvshin props oor damjuln
    const {tuvshin,setTuvshin} = useScore();
    // testShow ni door challengee gargaj irj bsn odo nehh herggu
    const [testShow,setTestShow]= useState(null);
    // testIndex ni test iin idex
    const {category,catIndex} = useCategory()
    const [testIndex, setTestIndex] =useState(catIndex);
    // ene ni asuultin index
    const [qIndex, setQindex] = useState(0);
    // context ees onoo tuvshin 2 orulj irn
    const {score, setScore} = useScore()
    const [challIndex,setChallIndex] = useState(0);
    const [result , setResult] = useState([]);
    const router = useRouter();
    // alert(category)
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

    return <div className="flex justify-center items-center h-[100vh] ">
        <div className="flex justify-center items-center m-auto overflow-hidden bg-[#E6F2FE] max-w-3xl">
            <div className="flex flex-col items-center text-[black]">
                <h1 className="overflow-hidden  w-full flex justify-center items-center p-[15px] text-2xl ">{"Сэдэв: "+test[testIndex].testName}</h1>
                    <div className="flex flex-col">
                        <h1 className="bg-[#7FBBFA] w-full text-3xl px-[25px] font-medium text-center p-[40px]">
                            {                            
                                test[testIndex].question[qIndex]
                            }
                        </h1>
                        <div className="flex flex-col p-[25px] bg-[#E6F2FE] gap-[15px]">
                            {
                                test[testIndex].result.map((data,index)=>{
                                    return <button key={index} onClick={()=>handleSubmit(data)} className="bg-[#D3DFEA] p-[10px] rounded-[10px] text-[22px] flex hover:bg-[#CAD5E0] text-start px-[30px]">{data.result}</button>
                                })
                            }
                        </div>
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