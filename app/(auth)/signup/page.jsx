"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Eye, EyeOff, Loader, ShieldCheck, ShieldHalf, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import base64 from "base-64"
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import bcrypt from "bcryptjs";

export default function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [viewType, setViewType] = useState("password");
    const [logging, setLogging] = useState(false);
    const reqMeets = /[A-Z]/.test(password) && /[0-9]/.test(password) && password.length >= 8 && /[!@#$%^&*(){}[\]/?|`~,.;:]/.test(password) ? true : false;

    const user = useSession();
    const router = useRouter();

    if (user.status === "authenticated") return router.push("/");
    const handleSubmit = async () => {
        if (!email || !reqMeets) return toast.error(`Please enter ${email ? "a strong password!" : "your email address"}!`);

        try {
            setLogging(true);
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password: hashedPassword }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (!data.success) {
                        toast.error(data.error);
                        setLogging(false);
                    } else {
                        toast.success("Account created successfully you can login now!");
                        router.push("/login");
                        setLogging(false);
                    }
                });
        }
        catch (e) {
            setLogging(false);
        }

    };
    return (
        <div className="w-full max-w-md px-6">
            <div className="grid place-items-center text-center gap-2">
                <ShieldHalf className="h-8 w-8" />
                <h1 className="-mb-2.5 text-lg">SignUp to continue</h1>
                <p className="text-sm text-muted-foreground">signup using your email address and password.</p>
            </div>
            <div className="mt-8 grid gap-3">
                <Label className="-mb-1" htmlFor="email">Email</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="name@domain.com" type="email" />
                <Label className="-mb-1" htmlFor="password">Password</Label>
                <div className="flex items-center gap-2">
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="********" type={viewType} />
                    <Button size="icon" variant="secondary" onClick={() => setViewType(viewType === "password" ? "text" : "password")} className="min-w-10">{viewType != "password" ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</Button>
                </div>
                {password.length >= 1 ? (
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
                ) : null}
                <div className="grid mt-3">
                    <Button onClick={handleSubmit} disabled={logging}>{logging ? <Loader className="h-4 w-4 animate-spin" /> : "SignUp"}</Button>
                    <p className="text-sm text-muted-foreground text-center mt-2">Already have one? <Link href="/login" className="underline text-primary">Login</Link></p>
                </div>
            </div>
        </div>
    );
}
