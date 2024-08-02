"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Page() {
    return (
        <div className="w-full max-w-md px-6">
            <div className="grid place-items-center text-center gap-2">
                <ShieldCheck className="h-8 w-8" />
                <p className="text-sm text-muted-foreground">Login to your account</p>
            </div>
            <form className="mt-5 grid gap-3">
                <Label className="-mb-1" htmlFor="email">Email</Label>
                <Input id="email" placeholder="name@domain.com" type="email" />
                <Label className="-mb-1" htmlFor="password">Password</Label>
                <Input id="password" placeholder="********" type="password" />
                <div className="grid mt-3">
                    <Button type="submit">Login</Button>
                    <p className="text-sm text-muted-foreground text-center mt-2">Don't have one? <Link href="/signup" className="underline text-primary">SignUp</Link></p>
                </div>
            </form>
        </div>
    );
}
