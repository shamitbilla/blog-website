import { Details } from "./Details";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser"

interface BlogCardProps {
    title: string;
    content: string;
    author: string;
    imgsrc : string;
    id : string;
}

export const BlogCard = ({ title, content, author, imgsrc, id }: BlogCardProps) => {
    const navigate = useNavigate();

    function go()
    {
        navigate(`/blog/${id}`);
    }
    function extractTextFromHTML(html :string) : string {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        return doc.body.textContent || '';
    }
    return (
        <>
            <div className="p-3 w-[463px] h-[529px]">
            <button className="w-full h-full" onClick={go}>
                <div className="bg-white p-4 rounded-lg outline outline-gray-300 h-full shadow-md hover:shadow-lg transition-shadow">
                    <div className="p-4">
                        <img src={imgsrc} className="rounded-lg w-full h-[290px] object-cover transition-transform transform hover:scale-110" />
                    </div>
                    <div className="text-lg font-bold py-2 text-center">
                        {title.length > 40? title.slice(0, 40) + "..." : title}
                    </div>
                    <div className="text-sm text-gray-500 h-16 overflow-hidden text-center">
                        {extractTextFromHTML(content.slice(0, 75)) + "..."}
                    </div>
                    <div className="py-2 flex justify-center">
                        <Details Author={author || "Anonymous"} />
                    </div>
                </div>
            </button>
        </div>
        </>
        
    );
};
