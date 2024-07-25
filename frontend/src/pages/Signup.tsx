import {Quote} from "../components/Quote"
import { Heading } from "../components/Heading" 
import { InfoField } from "../components/InfoField"
import { Button } from "../components/Button"
import { useRecoilState } from "recoil"
import { signupPayloadAtom } from "../store"
import swal from "sweetalert";
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signup = ()=>{

    const navigate = useNavigate();
    const [signupPayload,setSignupPayload] = useRecoilState(signupPayloadAtom);

    async function signup()
    {
        const base_url = import.meta.env.VITE_API_BASE_URL;
        axios.post(`${base_url}/user/signup`,signupPayload).then((response)=>{
            localStorage.setItem("token","Bearer "+response.data.token);
            localStorage.setItem("name",response.data.name);
            navigate("/api/v1/blog");
        }).catch(()=>{
            swal("Error", "Invalid Credential Format", "error");
        });
    }


    
    return <>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="h-screen flex flex-col items-center justify-center">
                <div className="py-6 gap-y-4">
                    <Heading heading="Create an account" subHeading="Already have an account?" link="signin"></Heading>
                    <InfoField Label="Username" prompt="Enter your username"
                        onChange={(e)=>{
                            setSignupPayload({
                                ...signupPayload,
                                name : e.target.value
                            });
                        }}>
                    </InfoField>
                    <InfoField Label="Email" prompt="m@example.com" 
                        onChange={(e)=>{
                            setSignupPayload({
                                ...signupPayload,
                                email : e.target.value
                            });
                        }}>
                    </InfoField>
                    <InfoField Label="Password" prompt="Enter your password" onChange={(e)=>{
                            setSignupPayload({
                                ...signupPayload,
                                password : e.target.value
                            });
                        }} type="password">
                    </InfoField>
                    <Button label="Sign Up" onClick={signup}></Button>
                </div>
            
            </div>
            <div className="hidden lg:block">
                <Quote content="The customer service I recieved was exceptional. The support team went above and beyond to address my concerns." Author="Jules Winnfield" Author_position="CEO, Acme Inc"></Quote>

            </div>
        </div>
        
    </>
}