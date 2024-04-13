'use client'
import { useRouter } from "next/navigation"
import axios from "axios";

export function LogoutButton({children}){
    const router = useRouter();
    async function logoutClick(){
        try {
            const response = await axios.get("/api/logout");
            console.log(response);
            router.push("/login")

        } catch (error) {
            console.log(error + " failed to logout");
        }
    }
    return(
        <span onClick={logoutClick}>{children}</span>
    )
}