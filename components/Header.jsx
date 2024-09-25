"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { ShieldHalf } from "lucide-react";
import HeaderContent from "./HeaderContent";

export default function Header() {
    return (
        <header className="px-5 py-5 flex items-center justify-between md:mx-20 lg:mx-32">
            <div className="flex items-center gap-2">
                <ShieldHalf className="h-5 w-5" />
                <span className="text-sm">Shield</span>
            </div>
            <div className="flex items-center gap-2">
                <Button size="sm" onClick={() => signOut({ callbackUrl: '/login' })}>Logout</Button>
                <HeaderContent />
            </div>
        </header>
    )
}