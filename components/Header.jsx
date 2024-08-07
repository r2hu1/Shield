"use client";
import { signOut } from "next-auth/react";
import ManageAccount from "./ManageAccount";
import { Button } from "./ui/button";
import { ShieldHalf } from "lucide-react";

export default function Header() {
    return (
        <header className="px-6 bordaer-b border-border py-4 flex items-center justify-between md:mx-20 lg:mx-32">
            <ShieldHalf className="h-6 w-6" />
            <div className="flex items-center gap-2">
                <Button onClick={() => signOut({ callbackUrl: '/login' })}>Logout</Button>
                <ManageAccount/>
            </div>
        </header>
    )
}