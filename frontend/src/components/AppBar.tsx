import { useNavigate } from "react-router-dom"
import { Avatar } from "./Avatar"

export const AppBar = ()=>{
    const name = localStorage.getItem("name");
    const navigate = useNavigate();
    return <>
        <div className="text-2xl font-bold py-2 flex justify-between px-10 py-4">
            <button onClick={()=>{navigate("/blogs")}}>
                Notion
            </button>
            
            <div className="flex justify-end gap-6 items-center">
                <button className="bg-gray-500 hover:bg-black text-white text-sm h-8 px-4 rounded-lg" onClick={()=>{
                    navigate("/create");
                }}>New Post</button>                    
                <Avatar type="big" name={name||'A'} />
            </div>
        </div>
        <div className="w-full h-1 bg-gray-200"></div>

        
    </>
}