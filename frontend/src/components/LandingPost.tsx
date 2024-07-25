import { useEffect, useState } from "react";
import axios from "axios";
import { BlogCard } from "./BlogCard";
import { CardSkeleton } from "./CardSkeleton";

export const LandingPost = ()=> {

    const [loading,setLoading] = useState(true);
    const [blogs,setBlogs] = useState([]);

    useEffect(() => {
        const base_url = import.meta.env.VITE_API_BASE_URL;
        axios.get(`${base_url}/blog/bulk`,{
            headers : {
                'Authorization' : localStorage.getItem("token")
            }
        }).then((response) => {
            setBlogs(response.data);
            setLoading(false);
        });

        
    }, []);

    useEffect(()=>{
        console.log(blogs);
        console.log("blog size is "+blogs.length);
    },[blogs])

    if (loading) {
        return <>
            <div className="flex items-center justify-center min-h-screen">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-12">
                    <CardSkeleton></CardSkeleton>
                    <CardSkeleton></CardSkeleton> 
                    <CardSkeleton></CardSkeleton> 
                    <CardSkeleton></CardSkeleton> 
                    <CardSkeleton></CardSkeleton> 
                    <CardSkeleton></CardSkeleton>                     
                </div>

            </div>
       
        </>
    }


    return <>
        <div className="flex items-center justify-center min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-12">
                {blogs.map((blog,index) => <BlogCard  key={index} author={blog.author.name} title={blog.title} content={blog.content} imgsrc={`https://picsum.photos/200/140?random=${index}`} id={blog.id}></BlogCard>)}
                
            </div>

        </div>
       
    </>
}
