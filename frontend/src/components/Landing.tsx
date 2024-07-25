import { LandingPost } from "./LandingPost"

export const Landing = ()=>{
    return <>
        <div className="text-4xl font-bold pt-12 px-10 flex items-center justify-center">
            Recent Posts
        </div>
        <div>
            <LandingPost></LandingPost>
        </div>
    </>
}