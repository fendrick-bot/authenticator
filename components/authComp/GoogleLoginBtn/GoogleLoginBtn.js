'use client'
import { signIn} from "next-auth/react";
export function  GoogleLoginBtn(){
    return(
        <button onClick={()=>signIn("google")}>Continue with google</button>
    )
}