import { BlogEditor } from "../components/BlogEditor"
import { AppBar } from "../components/AppBar"

export const CreateBlog = ()=>{
    return <>
        <AppBar></AppBar>
        <div className="flex flex-col items-center justify-center p-12">
            <div className="text-3xl font-bold py-2">
                Create New Blog
            </div>
            <div className="text-1xl font-serif text-gray-600 px-10 py-2">
                Share your thoughts and ideas with the world.
            </div>
            <div className="py-16">
                <BlogEditor></BlogEditor>
            </div>
        </div>
        
    </>
}