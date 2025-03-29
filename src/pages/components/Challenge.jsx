export default function Challenge({props})
{
     return <div className="flex flex-col items-center gap-2">

     <div className="flex flex-col gap-5">
         {
             props.map((data,index)=>{
                 return <div key={index}>
                     <p><strong>Чалленжийн нэр: </strong>{data.name}</p>
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
                     <p><strong>Зорилго: </strong>{data.zorilgo}</p>
                 </div>
             })
         }
     </div>
</div>
}