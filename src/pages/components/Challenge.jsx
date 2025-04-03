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
     return <div className="h-[100vh] flex flex-col justify-center items-center gap-2">
        <h1 className="text-xl flex justify-center">{"Таний сэтгэл зүйн түвшин:"+result}</h1>
        <h1 className="text-xl flex justify-center">Танд санал болгох чалленж даалгаврууд</h1>

     <div className="flex flex-col gap-5">
         {
             props.map((data,index)=>{
                 return <div key={index}>
                    
                    <button className="rounded-full text-center text-xl w-150 py-2 h-16 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-[#fff] border text-black rounded-full hover:bg-[#f9593a] bg-blue-400" onClick={handleBtn}>{data.name}</button>
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
                        <div className="bg-gray-400 py-2 px-5 rounded-xl absolute z-[1] flex flex-col w-180 ">
                            <div className="flex flex-col justify-evenly gap-3">
                                <div className="flex justify-between">
                                <p className="text-xl"><strong>Чалленжийн нэр: </strong>{data.name}</p>
                                    <button type="button" onClick={closeHandle} class="bg-gray-400 rounded-md inline-flex items-center justify-center text-black hover:text-gray-500 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-indigo-500">
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
                                <p><strong>Зорилго: </strong>{data.zorilgo}</p>
                            </div>
                            <button onClick={closeHandle} className="text-right pt-13 pr-5 text-black">Хаах</button>
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
}