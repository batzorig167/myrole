import { useState } from "react";
import Menu from "./Menu";

export default function TakeTest()
{
    let com = [
        <Menu/>,
    ]
    let a = [
        {
            quest: "Сүүлийн үед надад амьсгал аваад гаргахад хүндрэлтэй санагддаг болсон.",
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
            quest: "Миний аливаа нөхцөл байдалд үзүүлж байгаа хариу үйлдэл маань хэтэрхий их болсон.",
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
            quest: "Би аливаа зүйлийг маш их энерги зарцуулж хийдэг.",
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
            quest: "Нэлээд амархан цухалдаж уурладаг болсон.",
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
            quest: "Хааяа тайвшрахад хэцүү байдаг.",
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
            quest: "Би ямар нэгэн зүйл хийж байхад саад болсон зүйлд тэвчилгүй уцаарлах байсан.",
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
            quest: "Би түргэн ууртай болсон.",
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
            <h1 className="text-3xl italic">Стрессийн 7 асуулт</h1>
        </div>
        <div className="flex flex-col justify-center items-center gap-20 pt-30">
            <div className="flex flex-col justify-center items-center  rounded-xl px-30 py-20 w-250 h-140 bg-gray-200">
                <div>
                    <h1 className="text-2xl">{"Асуулт" + (count + 1)}</h1>
                </div>
                    <h1 className="text-3xl italic subpixel-antialiased pt-10">{a[count].quest}</h1>
                <div className=" flex flex-col gap-4 justify-items-start pt-6 text-xl">
                    <button className="border rounded-xl px-10 py-2 flex  transition delay-150 duration-300ease-in-out hover:-translate-y-1 hover:scale-110 hover:#404040" onClick={()=>answer(0)}>{a[count].ans[0].result}</button> 
                    <button className="border rounded-xl px-10 py-2 flex  transition delay-150 duration-300ease-in-out hover:-translate-y-1 hover:scale-110 hover:#fff" onClick={()=>answer(1)}>{a[count].ans[1].result}</button> 
                    <button className="border rounded-xl px-10 py-2 flex  transition delay-150 duration-300ease-in-out hover:-translate-y-1 hover:scale-110 hover:#fff" onClick={()=>answer(2)}>{a[count].ans[2].result}</button> 
                    <button className="border rounded-xl px-10 py-2 flex  transition delay-150 duration-300ease-in-out hover:-translate-y-1 hover:scale-110 hover:#fff" onClick={()=>answer(3)}>{a[count].ans[3].result}</button> 
                </div>
            </div>
        </div>
        <div className="flex justify-center pt-10 text-xl">
            {
                count==6 ? <h1>{"Үр дүн:"+result}</h1>:<div></div>
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