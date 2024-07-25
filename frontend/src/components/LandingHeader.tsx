import { Details } from "./Details"
import { LandingBlog } from "./LandingBlog"
import LandingPhoto from "../assets/LandingPhoto.png"

export const LandingHeader = ()=>{
    return <>
      <div className="h-screen w-screen bg-gray-200 grid grid-cols-1 lg:grid-cols-2">
            <div className="hidden lg:flex justify-center items-center h-full">
                <img src={LandingPhoto} width="600" height="625" className="rounded-md" />
            </div>
            <div className="flex flex-col items-left justify-center gap-2 px-10">
                <LandingBlog title="The Joke Tax Chronicles" content="Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his throne. One day, his advisors came to him with a problem: the kingdom was running out of money." />
                <div className="py-2 px-14">
                <Details Author="Acme Inc" />
                </div>
            </div>
        </div>
    </>
}