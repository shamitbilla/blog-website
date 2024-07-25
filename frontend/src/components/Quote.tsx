interface QuoteProps {
    content: string,
    Author : string,
    Author_position : string
}
export function Quote({ content, Author, Author_position}: QuoteProps) {
    return <>
    <div className="h-screen bg-gray-200 flex flex-col items-center justify-center">
        <div className="text-3xl font-serif italic text-gray-800 px-10 py-2 w-full whitespace-normal">
            "{content}"
        </div>
        <div className="">
            <div className="text-1xl font-serif font-semibold text-gray-800 px-10 py-1 w-full whitespace-normal text-left">
                {Author}
            </div>
            <div className="text-1xl font-serif text-gray-600 px-10 w-full whitespace-normal text-left">
                {Author_position}
            </div>
        </div>
    </div>
</>
}