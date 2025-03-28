import { useState } from "react";
export default function Home(){
        let a = [
            {
                quest: "Би ерөнхийдөө амьдралаас эерэг мэдрэмж авч чаддаггүй юм шиг санагддаг.",
                ans: [
                    {
                        result: "Надад тохиолдоогүй",
                        score:0
                    },
                    {
                        result: "Надад заримдаа тохиолдсон",
                        score:1
                    },
                    {
                        result: "Надад тодорхой хугацаанд тохиолдож байсан",
                        score:2
                    },
                    {
                        result: "Надад маш олон тохиолдсон",
                        score:3
                    }
    
                ]
            },
            {
                quest: "Би аливаа зүйлсэд санаачлагагүй хандаж, ямар нэгэн зүйл хийх сонирхолгүй болсон.",
                ans: [
                    {
                        result:"Надад тохиолдоогүй",
                        score:0
                    }, 
                    {
                        result:"Надад заримдаа тохиолдсон", 
                        score: 1
                    },
                    {
                        result:"Надад тодорхой хугацаанд тохиолдож байсан",
                        score: 2
                    },
                    {
                        result: "Надад маш олон тохиолдсон",
                        score:3
                    }
                ],
            },
            {
                quest: "Надад хүсэл тэмүүлэл юу ч байхгүй болсон мэт мэдрэгдэж байсан.",
                ans: [
                    {
                        result:"Надад тохиолдоогүй",
                        score:1
                    }, 
                    {
                        result:"Надад заримдаа тохиолдсон", 
                        score: 2
                    },
                    {
                        result:"Надад тодорхой хугацаанд тохиолдож байсан",
                        score: 2
                    },
                    {
                        result: "Надад маш олон тохиолдсон",
                        score:3
                    }
                ],  
            },{
                quest: "Надад гунигтай, сэтгэлээр унасан мэдрэмжүүд төрж байсан.",
                ans: [
                    {
                        result:"Надад тохиолдоогүй",
                        score:0
                    }, 
                    {
                        result:"Надад заримдаа тохиолдсон", 
                        score: 1
                    },
                    {
                        result:"Надад тодорхой хугацаанд тохиолдож байсан",
                        score: 2
                    },
                    {
                        result: "Надад маш олон тохиолдсон",
                        score:3
                    }
                ],  
            },{
                quest: "Би ямар нэгэн зүйлээс урам зориг авахаа больсон.",
                ans: [
                    {
                        result:"Надад тохиолдоогүй",
                        score:0
                    }, 
                    {
                        result:"Надад заримдаа тохиолдсон", 
                        score: 1
                    },
                    {
                        result:"Надад тодорхой хугацаанд тохиолдож байсан",
                        score: 2
                    },
                    {
                        result: "Надад маш олон тохиолдсон",
                        score:3
                    }
                ],  
            },
            {
                quest: "Би тийм ч үнэ цэнтэй хүн биш юм шиг санагдах болсон.",
                ans: [
                    {
                        result:"Надад тохиолдоогүй",
                        score:0
                    }, 
                    {
                        result:"Надад заримдаа тохиолдсон", 
                        score:1
                    },
                    {
                        result:"Надад тодорхой хугацаанд тохиолдож байсан",
                        score:2
                    },
                    {
                        result: "Надад маш олон тохиолдсон",
                        score:3
                    }
                ],  
            },
            {
                quest: "Амьдрал утгагүй мэт санагдаж байсан.",
                ans: [
                    {
                        result:"Надад тохиолдоогүй",
                        score:0
                    }, 
                    {
                        result:"Надад заримдаа тохиолдсон", 
                        score:1
                    },
                    {
                        result:"Надад тодорхой хугацаанд тохиолдож байсан",
                        score:2
                    },
                    {
                        result: "Надад маш олон тохиолдсон",
                        score:3
                    }
                ],  
            }
        ];
        const[count,setCount] = useState(0);
        const [score,setScore] = useState(0);
        let result = 0; 
            if(score >=0 && score <5){
                result = "Хэвийн" }
            if(score>=5 && score<=6){
                result = "Хөнгөн"}
            if(score>=7 && score<=10){
                result = "Дунд зэрэг"
            }
            if(score>=11 && score<=13){
                result = "Хүчтэй"
            }
            if(score>14){
                result = "Маш хүчтэй"
            }
    // function Butsah() {
    //     if (count>0) {
    //         setCount(count-1);
    //     }
    // }
    // function Daraah() {
    //     if (count<a.length-1) {
    //         setCount(count+1);
    //     }
    //     else {
    //          setCompleted(true);   
    //     }
    // }
    function answer(onoo) {
        // let onoo = a[count].ans[0].score;
        if (count<a.length-1) {
            setScore(score+onoo);
            setCount(count+1);
        }
    }

    return <div className="bg-emerald-50 max-auto-screen h-[100vh]">
        <div className="flex justify-center pt-10">
            <h1 className="text-3xl italic">Айдас түгшүүрийн 7 асуулт</h1>
        </div>
        <div className="flex flex-col justify-center items-center gap-20 pt-10">
            <div className="flex flex-col justify-center items-center  rounded-xl px-5 py-15 bg-gray-200">
                <div>
                    <h1 className="text-2xl">{"Асуулт" + (count + 1)}</h1>
                </div>
                    <h1 className="flex items-center text-xl italic subpixel-antialiased pt-10">{a[count].quest}</h1>
                <div className=" flex flex-col gap-4 justify-items-start pt-6 text-xl ">
                    <button className="border rounded-xl px-10 py-2 flex  transition delay-130 duration-200 ease-in-out hover:-translate-x-1 hover:scale-105 hover:#404040" onClick={()=>answer(0)}>{a[count].ans[0].result}</button> 
                    <button className="border rounded-xl px-10 py-2 flex  transition delay-130 duration-200 ease-in-out hover:-translate-y-1 hover:scale-105 hover:#fff" onClick={()=>answer(1)}>{a[count].ans[1].result}</button> 
                    <button className="border rounded-xl px-10 py-2 flex  transition delay-150 duration-300ease-in-out hover:-translate-y-1 hover:scale-110 hover:#fff" onClick={()=>answer(2)}>{a[count].ans[2].result}</button> 
                    <button className="border rounded-xl px-10 py-2 flex  transition delay-150 duration-300ease-in-out hover:-translate-y-1 hover:scale-110 hover:#fff" onClick={()=>answer(3)}>{a[count].ans[3].result}</button> 
                </div>
            </div>
        </div>
        <div className="flex justify-center pt-10 text-xl">
            {
                count==6? <h1>{"Үр дүн:"+result}</h1>: <div></div>
            }
        </div>
            {/* <div className="flex justify-around pt-20">
                {
                    count > 0 ?   <button className="border px-6 rounded-xl hover:blue" onClick={Butsah}>Буцах</button>:  <div></div>
                }
                {

                   count < 6? <button className="border px-4 rounded-xl" onClick={Daraah}>Дараах</button>: <div></div>
                }
            </div> */}
            <div className="flex justify-center text-xl">
                {
                    count==6? <h1 className="text-xl">{"оноо:"+score}</h1>:<div></div>
                }
            </div>
    </div>
}