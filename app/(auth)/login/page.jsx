"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Eye, EyeOff, Loader, ShieldCheck, ShieldHalf, View, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import base64 from "base-64"
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

export default function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [logging, setLogging] = useState("");
    const [viewType, setViewType] = useState("password");
    const router = useRouter();
    const user = useSession();
    if (user.status === "authenticated") return router.push("/");

    const handleSubmit = async () => {
        if (!email || !password) return toast.error(`Please enter your ${email ? "password" : "email address"}!`);
        try {
            setLogging(true);
            const res = await signIn("credentials", {
                email: email,
                password: password,
                redirect: false,
            });
            if (res.error) {
                setLogging(false);
                return toast.error("Invalid email or password please try again!");
            }
            router.push("/");
            setLogging(false);
        } catch (error) {
            setLogging(false);
        }

    };
    return (
        <div className="w-full max-w-md px-6">
            <div className="grid place-items-center text-center gap-2">
                <ShieldHalf className="h-8 w-8" />
                <h1 className="-mb-2.5 text-lg">Login to your account</h1>
                <p className="text-sm text-muted-foreground">login using your email address and password.</p>
            </div>
            <div className="mt-8 grid gap-3">
                <Label className="-mb-1" htmlFor="email">Email</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="name@domain.com" type="email" />
                <Label className="-mb-1" htmlFor="password">Password</Label>
                <div className="flex items-center gap-2">
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="********" type={viewType} />
                    <Button size="icon" variant="secondary" onClick={() => setViewType(viewType === "password" ? "text" : "password")} className="min-w-10">{viewType != "password" ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</Button>
                </div>
                <div className="grid mt-3">
                    <Button onClick={handleSubmit} disabled={logging}>{logging ? <Loader className="h-4 w-4 animate-spin" /> : "Login"}</Button>
                    <p className="text-sm text-muted-foreground text-center mt-2">Don't have one? <Link href="/signup" className="underline text-primary">SignUp</Link></p>
                </div>
            </div>
        </div>
    );
}
