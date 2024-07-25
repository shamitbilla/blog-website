interface HeadingProps{
    heading : string,
    subHeading : string
    link : string
}

export const Heading = ({heading, subHeading, link} : HeadingProps)=>{
    return <>
        <div className="text-center">
            <div className="text-3xl font-bold py-2">
                {heading}
            </div>
            <div className="text-1xl font-serif text-gray-600 px-10  w">
                {subHeading} <a href={`/${link}`}>click here</a>
            </div>
        </div>
    </>
}