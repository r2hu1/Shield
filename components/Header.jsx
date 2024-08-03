"use client";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Header(){
    const user = useSession();
    console.log(user);
    return(
        <header className="px-6 py-5 flex items-center justify-between">
            <Button onClick={()=>signOut({callbackUrl:'/login'})}>Logout</Button>
        </header>
    )
}