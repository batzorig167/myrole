import { useState } from "react";
export default function Challenge({props})
{
    const [result , setResult] = useState([]);
    const [selectItem,setSelectItem] = useState(null);
    function handleBtn(){
        setSelectItem(2);
    }
    function closeHandle(){
        setSelectItem(null)
    }
     return <div className="h-[100vh] flex flex-col justify-center items-center gap-2 bg-[#e3f6f5]">
        <h1 className="text-xl flex justify-center text-[#272343]">{"Таний сэтгэл зүйн түвшин:"+result}</h1>
        <h1 className="text-xl flex justify-center text-[#272343]">Танд санал болгох чалленж даалгаврууд</h1>

     <div className="flex flex-col gap-5 items-center">
         {
             props.map((data,index)=>{
                 return <div key={index}>
                    
                    <button className="text-center border border-[#272343] text-xl px-[60px] py-[10px] transition delay-150 duration-300 ease-in-out rounded-full text-[#272343] bg-[#fffffe] max-w-[700px]" onClick={handleBtn}>{data.name}</button>

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
            {selectItem && (
                <div className="fixed top-0 left-0 w-[100vw] h-[100vh] ">
                    <div className="w-[100vw] h-[100vh] relative flex justify-center items-center">
                        <button onClick={closeHandle} className="w-[100vw]  h-[100vh] absolute-50 top-0 left-0" >
                            Дэлгэрэнгүй
                        </button>
                        <div className="bg-[#272343] py-2 px-5 rounded-xl absolute z-[1] flex flex-col  text-[#fffffe]">
                            <div className="flex flex-col justify-evenly gap-3">
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
            }
                 </div>
             })
         }
     </div>
</div>
</div>
}