'use client'
import {SessionProvider } from "next-auth/react"

export function GoogleLogin({children}){
    return(
        <SessionProvider>{children}</SessionProvider>
    )
}