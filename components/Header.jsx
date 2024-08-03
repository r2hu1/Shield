"use client";
import { ShieldHalf } from "lucide-react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { ModeToggle } from "./ThemeSwitcher";

export default function Header() {
    return (
        <header className="px-6 py-5 flex items-center justify-between">
            <ShieldHalf className="h-6 w-6" />
            <div className="flex items-center gap-2">
                <Button onClick={() => signOut({ callbackUrl: '/login' })}>Logout</Button>
                <ModeToggle />
            </div>
        </header>
    )
}