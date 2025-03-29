export default function Challenge({props})
{
     let a ={
        challengeName:"UII",
        challenge: "t4"
     }
    let result =  challenge.sort((data)=>data.category == challengeName)
    return <div>
        {
            result.challenge.map()
        }
    </div>
}