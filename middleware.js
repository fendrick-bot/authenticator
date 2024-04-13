import { NextRequest, NextResponse } from "next/server";

export function middleware(request){
    const path = request.nextUrl.pathname;

    const isAccessible = path === '/login' || path === '/signup';

    const token = request.cookies.get('token')?.value || '';

    if( isAccessible && token){
        return NextResponse.redirect(new URL('/' , request.nextUrl));
    }
    if( !isAccessible && !token && path !== "/"){
        return NextResponse.redirect(new URL('/login' , request.nextUrl));
    }
}
export const config ={
    matcher : [
        '/',
        '/login',
        '/signup',
        '/myprofile'
    ]
}