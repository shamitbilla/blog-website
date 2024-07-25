import { useRecoilState } from "recoil";
import { AppBar } from "../components/AppBar"
import { Avatar } from "../components/Avatar"
import { blogsAtom, nameAtom } from "../store";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import parse from "html-react-parser"
import { DetailsSkeleton } from "../components/DetailsSkeleton";
import { BlogSkeleton } from "../components/BlogSkeleton";

export const Blog = ()=>{

    const [loading,setLoading] = useState(true);
    const [blog,setBlog] = useRecoilState(blogsAtom);
    const {id} = useParams();

    useEffect(() => {
        
        const base_url = import.meta.env.VITE_API_BASE_URL;
        axios.get(`${base_url}/blog/${id}`,{
            headers : {
                'Authorization' : localStorage.getItem("token")
            }
        }).then((response) => {
            setBlog(response.data);
            setLoading(false);
        });

        
    }, []);

    useEffect(()=>{
        console.log(blog);
    },[blog]);

    if (loading) {
        return <>
            <AppBar></AppBar>
            <div className="grid grid-cols-12 px-10 p-12">
                <div className="col-span-12 lg:col-span-8">
                    <BlogSkeleton></BlogSkeleton>
                    <BlogSkeleton></BlogSkeleton>
                    <BlogSkeleton></BlogSkeleton>
                    <BlogSkeleton></BlogSkeleton>
                    <BlogSkeleton></BlogSkeleton>
                </div>
                <div className="hidden lg:block lg:col-span-4 p-12">
                    <DetailsSkeleton></DetailsSkeleton>
                    
                </div>

            </div>

        
        </>
    }



    return <>
        <AppBar></AppBar>
        <div className="grid grid-cols-12 px-10">
            <div className="col-span-12 lg:col-span-8">
                <div className="text-4xl text-3xl font-bold p-12">
                    {blog.title}
                </div>
                <div className="text-1xl font-serif py-2 pl-12 p-2">
                    {parse(blog.content)}
                </div>
            </div>
            <div className="hidden lg:block lg:col-span-4 p-12">
                Author
                <div className="pt-5 grid grid-cols-9">
                    <div className="col-span-1 pt-4">
                        <Avatar name={blog.author.name || "Anonymous"} type="big" />
                    </div>
                    <div className="col-span-7 px-2">
                        <div className="text-2xl font-bold">
                            {blog.author.name || "Anonymous"}
                        </div>
                        <div className="text-1xl font-serif text-gray-600 py-2">
                            A writer and historian with a passion for uncovering the hidden stories that shape our world
                        </div>
                    </div>

                    

                </div>
                
            </div>

        </div>

    </>
}