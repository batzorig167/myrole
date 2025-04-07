import { useState } from "react";
import { useScore } from "../Context/ScoreContext";
import { useRouter } from "next/router";
export default function Challenge({props})
{
    const [result , setResult] = useState([]);
    const {score,tuvshin,tuvshinRank} =useScore()
    const [selectItem,setSelectItem] = useState(null);
    const router = useRouter();
    function handleBtn(item){
        setSelectItem(item);
    }
    function closeHandle(){
        setSelectItem(null)
    }
    function Btn(){
        router.push("/landingPage")
    }
     return <div className="h-[100vh] flex flex-col justify-center items-center gap-2 bg-[#e3f6f5]">
        <h1 className="md:text-xl flex justify-center text-[#272343]">{"Таны сэтгэл зүйн түвшин:"+tuvshinRank}</h1>
        <h1 className="md:text-xl flex justify-center text-[#272343]">Танд санал болгох чалленж даалгаврууд</h1>
        {/* <h1 className="text-xl">{"оноо:"+score}</h1> */}

     <div className="flex flex-col gap-5 items-center">
         {
             props.map((data,index)=>{
                 return <div key={index}>
                    
                    <button className="text-center border border-[#272343] text-base px-[60px] py-[10px] w-80 md:w-130 md:text-xl rounded-full text-[#272343] bg-[#fffffe] max-w-[700px]" onClick={()=>handleBtn(data)}>{data.name}</button>

                     {/* <p><strong>Чалленжийн нэр: </strong>{data.name}</p>
                     <p><strong>Даалгавар: </strong>{data.daalgavar}</p>
                         {
                             data.example.length >0 && (
                                 <>
                                 <p><strong>Жишээ:</strong></p>
                                 <ul>
                                     {
                                         data.example.map((ex, exIndex)=>
                                         (
                                             <li key={exIndex}>- {ex}</li>
                                         ))
                                     }
                                 </ul>
                                 </>
                             )
                         }
                     <p><strong>Зорилго: </strong>{data.zorilgo}</p> */}
            {/* {selectItem == data && (
                <div className="fixed top-0 left-0 w-full h-full z-50">
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50">
                        <button onClick={closeHandle} className="w-[100vw]  h-[100vh] absolute-50 bg-black opacity-50 top-0 left-0" >
                            Дэлгэрэнгүй
                        </button>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-xl bg-white rounded-2xl shadow-2xl p-6 z-50 transition-all duration-300 animate-fade-in-down">
                            <div className="flex justify-between items-center mb-4 border-b pb-2">
                                <div className="flex justify-between">
                                <p className="text-xl"><strong>Чалленжийн нэр: </strong>{data.name}</p>
                                    <button type="button" onClick={closeHandle} class="bg-[#272343] rounded-md inline-flex items-center justify-center text-[#fffffe] focus:outline-none focus:ring-1 focus:ring-inset focus:ring-indigo-500">

                                    <span class="sr-only">Close</span>
                                    <svg class="h-6 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    </button>
                                </div>
                                <p><strong>Даалгавар: </strong>{data.daalgavar}</p>
                                {
                                    data.example.length >0 && (
                                    <>
                                        <p><strong>Жишээ: </strong></p>
                                        <ul>
                                        {
                                            data.example.map((ex, exIndex)=>
                                            (
                                                <li key={exIndex}>- {ex}</li>
                                            ))
                                        }
                                    </ul>
                                    </>
                                )
                                }
                                <p className="text-xl"><strong>Зорилго:</strong>{data.zorilgo}</p>
                            </div>
                            <button onClick={closeHandle} className="text-right pt-13 pr-5 text-[#bae8e8]">Хаах</button>
                        </div>
                    </div>
                </div>
                )
            } */}
            {selectItem === data && (
  <div className="fixed top-0 left-0 w-full h-full z-50">
    {/* Overlay dark blur */}
    <div
      className="absolute top-0 left-0 w-full h-full bg-black opacity-60"
      onClick={closeHandle}
    />

    {/* Modal */}
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-xl bg-white rounded-2xl shadow-2xl p-6 z-50 transition-all duration-300 animate-fade-in-down">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <h2 className="text-2xl font-semibold text-[#272343]">
          {data.name}
        </h2>
        <button
          onClick={closeHandle}
          className="text-[#272343] hover:text-red-500 transition"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="text-[#272343] space-y-3">
        <p><strong>Даалгавар:</strong> {data.daalgavar}</p>

        {data.example.length > 0 && (
          <>
            <p><strong>Жишээ:</strong></p>
            <ul className="list-disc list-inside pl-2 text-sm">
              {data.example.map((ex, idx) => (
                <li key={idx}>- {ex}</li>
              ))}
            </ul>
          </>
        )}

        <p><strong>Зорилго:</strong> {data.zorilgo}</p>
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={closeHandle}
          className="px-4 py-2 bg-[#bae8e8] text-[#272343] rounded-lg hover:bg-[#a0d2d2] transition"
        >
          Хаах
        </button>
      </div>
    </div>
  </div>
)}

                 </div>
             })
         }
     </div>
     <div className="pt-3">
        <button className="md:text-xl md:px-5 rounded-lg py-1 px-10  bg-[#ffd803]" onClick={Btn}>Нүүр хэсэг лүү буцах</button>
     </div>
</div>
}