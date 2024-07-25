import { Avatar } from "./Avatar"

interface DetailsProps{
    Author : string
}
export const Details = ({Author}:DetailsProps)=>{
    return <>
       <div className="flex items-center gap-3">
            <Avatar name={Author}/>
            <div className="text-1xl font-semibold text-gray-800 ml-2">
                {Author || "Anonymous"}
            </div>
        </div>
        
    </>
}