"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { ShieldHalf } from "lucide-react";
import HeaderContent from "./HeaderContent";
import { ModeToggle } from "./ThemeSwitcher";

export default function Header() {
    return (
        <header className="px-5 py-5 flex items-center justify-between md:mx-20 lg:mx-32">
            <div className="bg-secondary/80 rounded-md px-2 py-2">
                <ShieldHalf className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2">
                <Button size="sm" onClick={() => signOut({ callbackUrl: '/login' })}>Logout</Button>
                <ModeToggle />
            </div>
        </header>
    )
}