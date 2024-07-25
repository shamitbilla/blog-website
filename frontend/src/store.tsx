import {atom} from 'recoil';
import { SignupType, SigninType } from '@shamit/medium-common';

export const signupPayloadAtom = atom<SignupType>({
    key : "signupPayload",
    default : {
        name:"",
        email : "",
        password : ""
    }
});


export const signinPayloadAtom = atom<SigninType>({
    key : "signinPayload",
    default : {
        email : "",
        password : ""
    }
});

export const blogsAtom = atom({
    key : "blogs",
    default : {
        title: "",
        content: "",
        author : {
            name: ""
        }
    }
});

export const nameAtom = atom<string>({
    key : "nameAtom",
    default : ""
});






