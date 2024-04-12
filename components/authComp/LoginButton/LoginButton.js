'use client'
import { useRouter } from "next/navigation"

export function LoginButton({children}){
    const router = useRouter();
    function loginClick(){
        router.push("/login")
    }
    return(
        <span onClick={loginClick}>{children}</span>
    )
}