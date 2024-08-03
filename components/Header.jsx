"use client";
import { ShieldHalf } from "lucide-react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Header(){
    const user = useSession();
    console.log(user);
    return(
        <header className="px-6 py-5 flex items-center justify-between">
            <ShieldHalf className="h-6 w-6"/>
            <Button onClick={()=>signOut({callbackUrl:'/login'})}>Logout</Button>
        </header>
    )
}