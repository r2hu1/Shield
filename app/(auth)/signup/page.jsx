"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ShieldCheck, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const reqMeets = /[A-Z]/.test(password) && /[0-9]/.test(password) && password.length >= 8 && /[!@#$%^&*(){}[\]/?|`~,.;:]/.test(password) ? true : false;

    const handleSubmit = (e) => {
        e.prevent.default();
        if(!email){
            return "ee"
        }
    };
    return (
        <div className="w-full max-w-md px-6">
            <div className="grid place-items-center text-center gap-2">
                <ShieldCheck className="h-8 w-8" />
                <p className="text-sm text-muted-foreground">SignUp using your email</p>
            </div>
            <form method="post" onSubmit={handleSubmit} className="mt-5 grid gap-3">
                <Label className="-mb-1" htmlFor="email">Email</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="name@domain.com" type="email" />
                <Label className="-mb-1" htmlFor="password">Password</Label>
                <Input value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="********" type="password" />
                {!reqMeets && password.length >= 1  ? (
                    <div className="mt-2 rounded-md border border-border p-3">
                        <ul className="list-none grid gap-2">
                            <li className="flex items-center gap-3">
                                {!/[A-Z]/.test(password) ? <X className="h-3.5 w-3.5 text-red-400" /> : <Check className="h-3.5 w-3.5 text-green-400" />}
                                <p className="text-xs opacity-75">Contains atleast one Uppercase Alphabet</p>
                            </li>
                            <li className="flex items-center gap-3">
                                {!/[0-9]/.test(password) ? <X className="h-3.5 w-3.5 text-red-400" /> : <Check className="h-3.5 w-3.5 text-green-400" />}
                                <p className="text-xs opacity-75">Contains atleast one Digit</p>
                            </li>
                            <li className="flex items-center gap-3">
                                {!/[!@#$%^&*(){}[\]/?|`~,.;:]/.test(password) ? <X className="h-3.5 w-3.5 text-red-400" /> : <Check className="h-3.5 w-3.5 text-green-400" />}
                                <p className="text-xs opacity-75">Contains atleast one Symbol</p>
                            </li>
                            <li className="flex items-center gap-3">
                                {password.length < 8 ? <X className="h-3.5 w-3.5 text-red-400" /> : <Check className="h-3.5 w-3.5 text-green-400" />}
                                <p className="text-xs opacity-75">Length must be 8 or greater</p>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <p className="flex items-center gap-3 text-xs text-muted-foreground"><Check className="text-green-400 h-3.5 w-3.5"/> All requirements meet!</p>
                )}
                <div className="grid mt-3">
                    <Button type="submit" disabled={!reqMeets}>SignUp</Button>
                    <p className="text-sm text-muted-foreground text-center mt-2">Already have one? <Link href="/login" className="underline text-primary">Login</Link></p>
                </div>
            </form>
        </div>
    );
}
