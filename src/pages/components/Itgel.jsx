import { useState } from "react";
import Menu from "./components/Menu";

export default function TakeTest()
{
    let com = [
        <Menu/>,
    ]
    let a = [
        {
            quest: "Миний гадаад төрх надад таалагддаг",
            ans: [
                {
                    result: "Санал бүрэн нийлж байна.",
                    score:5
                },
                {
                    result: "Санал ерөнхийдөө нийлж байна",
                    score:4
                },
                {
                    result: "Эргэлзэж байна",
                    score:3
                },
                {
                    result: "Санал ерөнхийдөө нийлэхгүй байна",
                    score:2
                },{
                    result: "Санал огт нийлэхгүй байна",
                    score:1
                }

            ]
        },
        {
            quest: "Би аливаа зүйлийг хийхээсээ өмнө сайн боддог",
            ans: [
                {
                    result: "Санал бүрэн нийлж байна.",
                    score:5
                },
                {
                    result: "Санал ерөнхийдөө нийлж байна",
                    score:4
                },
                {
                    result: "Эргэлзэж байна",
                    score:3
                },
                {
                    result: "Санал ерөнхийдөө нийлэхгүй байна",
                    score:2
                },{
                    result: "Санал огт нийлэхгүй байна",
                    score:1
                }

            ]
        },
        {
            quest: "Би үе тэнгийнхний дарамт шахалтыг ихэвчлэн эсэргүйцдэг",
            ans: [
                {
                    result: "Санал бүрэн нийлж байна.",
                    score:5
                },
                {
                    result: "Санал ерөнхийдөө нийлж байна",
                    score:4
                },
                {
                    result: "Эргэлзэж байна",
                    score:3
                },
                {
                    result: "Санал ерөнхийдөө нийлэхгүй байна",
                    score:2
                },{
                    result: "Санал огт нийлэхгүй байна",
                    score:1
                }

            ]
        },
        {
            quest: "Би өөртөө итгэлтэй байдаг",
            ans: [
                {
                    result: "Санал бүрэн нийлж байна.",
                    score:5
                },
                {
                    result: "Санал ерөнхийдөө нийлж байна",
                    score:4
                },
                {
                    result: "Эргэлзэж байна",
                    score:3
                },
                {
                    result: "Санал ерөнхийдөө нийлэхгүй байна",
                    score:2
                },{
                    result: "Санал огт нийлэхгүй байна",
                    score:1
                }

            ]
        },
        {
            quest: "Би бусад хүмүүст таалагдахын тулд хуурамч дүр хэзээ ч эсгэдэггүй",
            ans: [
                {
                    result: "Санал бүрэн нийлж байна.",
                    score:5
                },
                {
                    result: "Санал ерөнхийдөө нийлж байна",
                    score:4
                },
                {
                    result: "Эргэлзэж байна",
                    score:3
                },
                {
                    result: "Санал ерөнхийдөө нийлэхгүй байна",
                    score:2
                },{
                    result: "Санал огт нийлэхгүй байна",
                    score:1
                }

            ]
        },
        {
            quest: "Би зөв зүйлийг л хийхийг хичээдэг",
            ans: [
                {
                    result: "Санал бүрэн нийлж байна.",
                    score:5
                },
                {
                    result: "Санал ерөнхийдөө нийлж байна",
                    score:4
                },
                {
                    result: "Эргэлзэж байна",
                    score:3
                },
                {
                    result: "Санал ерөнхийдөө нийлэхгүй байна",
                    score:2
                },{
                    result: "Санал огт нийлэхгүй байна",
                    score:1
                }

            ]
        },
        {
            quest: "Би шийдвэр гаргаад түүнийгээ тууштай баримталж чаддаг",
            ans: [
                {
                    result: "Санал бүрэн нийлж байна.",
                    score:5
                },
                {
                    result: "Санал ерөнхийдөө нийлж байна",
                    score:4
                },
                {
                    result: "Эргэлзэж байна",
                    score:3
                },
                {
                    result: "Санал ерөнхийдөө нийлэхгүй байна",
                    score:2
                },{
                    result: "Санал огт нийлэхгүй байна",
                    score:1
                }

            ]
        },
        {
            quest: "Би тийм ч амар бууж өгдөггүй",
            ans: [
                {
                    result: "Санал бүрэн нийлж байна.",
                    score:5
                },
                {
                    result: "Санал ерөнхийдөө нийлж байна",
                    score:4
                },
                {
                    result: "Эргэлзэж байна",
                    score:3
                },
                {
                    result: "Санал ерөнхийдөө нийлэхгүй байна",
                    score:2
                },{
                    result: "Санал огт нийлэхгүй байна",
                    score:1
                }

            ]
        },
        {
            quest: "Би зөв гэж бодсон зүйлээ хамгаалан босдог",
            ans: [
                {
                    result: "Санал бүрэн нийлж байна.",
                    score:5
                },
                {
                    result: "Санал ерөнхийдөө нийлж байна",
                    score:4
                },
                {
                    result: "Эргэлзэж байна",
                    score:3
                },
                {
                    result: "Санал ерөнхийдөө нийлэхгүй байна",
                    score:2
                },{
                    result: "Санал огт нийлэхгүй байна",
                    score:1
                }

            ]
        },
        {
            quest: "Биеийнхээ гадаад үзэмжээрээ би бахархдаг",
            ans: [
                {
                    result: "Санал бүрэн нийлж байна.",
                    score:5
                },
                {
                    result: "Санал ерөнхийдөө нийлж байна",
                    score:4
                },
                {
                    result: "Эргэлзэж байна",
                    score:3
                },
                {
                    result: "Санал ерөнхийдөө нийлэхгүй байна",
                    score:2
                },{
                    result: "Санал огт нийлэхгүй байна",
                    score:1
                }

            ]
        },
        {
            quest: "Би өөрөө өөртөө таалагддаг",
            ans: [
                {
                    result: "Санал бүрэн нийлж байна.",
                    score:5
                },
                {
                    result: "Санал ерөнхийдөө нийлж байна",
                    score:4
                },
                {
                    result: "Эргэлзэж байна",
                    score:3
                },
                {
                    result: "Санал ерөнхийдөө нийлэхгүй байна",
                    score:2
                },{
                    result: "Санал огт нийлэхгүй байна",
                    score:1
                }

            ]
        },
        {
            quest: "Бусадтай хэл амаа ололцоход надад хялбар байдаг",
            ans: [
                {
                    result: "Санал бүрэн нийлж байна.",
                    score:5
                },
                {
                    result: "Санал ерөнхийдөө нийлж байна",
                    score:4
                },
                {
                    result: "Эргэлзэж байна",
                    score:3
                },
                {
                    result: "Санал ерөнхийдөө нийлэхгүй байна",
                    score:2
                },{
                    result: "Санал огт нийлэхгүй байна",
                    score:1
                }

            ]
        },
        {
            quest: "Эсрэг хүйсний хүмүүстэй найз нөхөд болоход надад хүндрэл гардаггүй",
            ans: [
                {
                    result: "Санал бүрэн нийлж байна.",
                    score:5
                },
                {
                    result: "Санал ерөнхийдөө нийлж байна",
                    score:4
                },
                {
                    result: "Эргэлзэж байна",
                    score:3
                },
                {
                    result: "Санал ерөнхийдөө нийлэхгүй байна",
                    score:2
                },{
                    result: "Санал огт нийлэхгүй байна",
                    score:1
                }

            ]
        },

    ];
    const[count,setCount] = useState(0);
    const [score,setScore] = useState(0);
    let result = 0; 
        if(score >0 && score <30){
            result = "30-аас доош оноо: Та өөрийгөө үнэлдэггүй хүн бололтой. Би хэн бэ гэсэн асуултыг хэзээ чтавьж байгаагүй л болов уу? Өөрийгөө илүү бодитой үнэлж олж харах оролдлого хийх шаардлагатай байна. Хүн болгонд эерэг ба сөрөг талууд байдаг. Өөрийн сайн зан чанаруудыг олж тогтоогоод түүнийгээ үнэлж сур. Өөрийгөө голж шилэлгүй уужуу сайхан сэтгэлээрээ хандаарай." }
        if(score>=30 && score<40){
            result = "30-аас дээш оноо: Та өөртөө эргэлздэг юм байна. Гэхдээ өөртөө өгсөн үнэлгээгээ эргэж харах хэрэгтэй болов уу?. Өөрийнхөө эерэг сайн талыг эрж хай, олж хар.Өөрт чинь тааламжгүй санагддаг зүйлсийг эргэцүүлэн бодож өөрчлөх боломжтойг нь өмнөө тулгарсан нэгэн төрлийн шалгалт сорилт гэж бодоорой."
        }
        if(score>=40 && score<=50){
            result = "40-өөс дээш оноо: Таны адил залуус олон байдаг. Та өөрийгөө сайнаар төсөөлдөг хэдий ч заримдаа би ер нь ямархуу хүн бэ? Хэмээн эргэлзэх тохиолдол гардаг юм байна. Заримдаа та өөригөө голох явдал ч гардаг ч болов уу? тэгвэл та өөрийнхөө сайн талаа ямагт санаж яваарай. Өөртө хатуурхан тунирхах хэрэггүй."
        }
        if(score>50){
            result = "50-иас дээш оноо: та өөрийнхөө талаар маш сайхан сэтгэгдэлтэй байдаг юм байна. Та бусдын нөлөөнд амархан автдаггүй сорилт шалгалт адал явдал шинэ зүйлд дуртай зорьсон зүйл тань ямагт бүтэж байдаг өөртөө итгэлтэй нэгэн."
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
            <h1 className="text-3xl italic">Өөртөө итгэх итгэлийн 13 асуулт</h1>
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
                    <button className="border rounded-xl px-10 py-2 flex  transition delay-150 duration-300ease-in-out hover:-translate-y-1 hover:scale-110 hover:#fff" onClick={()=>answer(4)}>{a[count].ans[4].result}</button> 
                </div>
            </div>
        </div>
        <div className="flex justify-center pt-10 text-xl">
            {
                count==12? <h1>{"Үр дүн:"+result}</h1>: <div></div>
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
                    count==12? <h1 className="text-xl">{"оноо:"+score}</h1>:<div></div>
                }
            </div>
    </div>
}