interface LandingBlogProps{
    title : string,
    content : string
}


export const LandingBlog = ({title, content} : LandingBlogProps)=>{
    return <div className="p-4">
        <div className="text-4xl font-bold py-2 px-10">
            {title}
        </div>
        <div className="text-2xl text-gray-500 px-10  w">
            {content}
        </div>
    </div>
}