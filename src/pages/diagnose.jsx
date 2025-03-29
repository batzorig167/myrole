import { useState } from "react";
import { test } from "./utils/data";
export default function Home(){
    const diagnoseData = test;
    const [testIndex, setTestIndex] =useState(0);
    const [qIndex, setQindex] = useState(0);
    const [score, setScore] = useState(0)
    let [result , setResult] = useState([]);
    console.log("оноо",score);
    console.log("үр дүн=",result);
    function handleSubmit(props){
        setScore(score + props.score)
        if(qIndex<test[testIndex].question.length-1){
            setQindex(qIndex +1);
        }
        else {
            if (qIndex<test[testIndex].length-1){
                let a = {
                    score: score,
                    category: test[testIndex].testName
                }
                result.push(a);
                setScore(0);
                setQindex(0);
                setResult(result);
                setTestIndex(testIndex+1);
            }
        }
    }
    return <div >
        <div>
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
    </div>
}