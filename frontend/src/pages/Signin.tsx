import {Quote} from "../components/Quote"
import { Heading } from "../components/Heading" 
import { InfoField } from "../components/InfoField"
import { Button } from "../components/Button"
import { useRecoilState } from "recoil"
import { nameAtom, signinPayloadAtom } from "../store"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signin = ()=>{

    const navigate = useNavigate();
    const [signinPayload,setSigninPayload] = useRecoilState(signinPayloadAtom);
    const [name,setName] = useRecoilState(nameAtom);
    async function signin()
    {
        const base_url = import.meta.env.VITE_API_BASE_URL;
        axios.post(`${base_url}/user/signin`,signinPayload).then((response)=>{
            localStorage.setItem("token","Bearer "+response.data.token);
            localStorage.setItem("name",response.data.name);
            setName(response.data.name);
            navigate("/blogs");
            
        }).catch(()=>{
            swal("Error", "Invalid Credentials", "error");
        });
    }
    return <>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="h-screen flex flex-col items-center justify-center">
                <div className="py-6 gap-y-4">
                    <Heading heading="Welcome Back" subHeading="Don't have an account?" link="signup"></Heading>
                    <InfoField Label="Email" prompt="m@example.com" 
                        onChange={(e)=>{
                            setSigninPayload({
                                ...signinPayload,
                                email : e.target.value
                            });
                        }}>
                    </InfoField>
                    <InfoField Label="Password" prompt="Enter your password" onChange={(e)=>{
                            setSigninPayload({
                                ...signinPayload,
                                password : e.target.value
                            });
                        }} type="password">
                    </InfoField>
                    <Button label="Sign Up" onClick={signin}></Button>
                </div>
            
            </div>
            <div className="hidden lg:block">
                <Quote content="The customer service I recieved was exceptional. The support team went above and beyond to address my concerns." Author="Jules Winnfield" Author_position="CEO, Acme Inc"></Quote>

            </div>
        </div>
        
    </>
}