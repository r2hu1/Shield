"use client";
import { Input } from "@/components/ui/input";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Label } from "@/components/ui/label";
import { Loader, SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import createPassword from "@/server_functions/pwd/createPassword";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function AddPassword() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const user = useSession();

    const handleAdd = async (e) => {
        e.preventDefault();
        setLoading(true);
        let name = e.target.name.value;
        let email = e.target.email.value;
        let password = e.target.password.value;
        if (!name || !email || !password) return toast.error(`Please enter ${!name ? "name!" : ""} ${!email ? "email or username!" : ""} ${!password ? "password!" : ""}`);
        try {
            const data = await createPassword({ currentUserEmail: user.data.user.email, name, email, password });
            if (JSON.parse(data).success) {
                router.refresh();
                setLoading(false);
                return toast.success("Password added successfully!");
            }
            setLoading(false);
            toast.error(JSON.parse(data).error);
        }
        catch (e) {
            setLoading(false);
            console.log(e);
        }
    }
    return (
        <div className="grid gap-3">
            <div className="flex items-center gap-3">
                <Input type="text" autoComplete="off" placeholder="Google, Facebo.." className="w-full" />
                <Button className="min-w-10" size="icon"><SearchIcon className="h-4 w-4 rotate-90" /></Button>
            </div>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1" className="border-none">
                    <AccordionTrigger className="text-base hover:no-underline font-normal">
                        Add a new password
                    </AccordionTrigger>
                    <AccordionContent>
                        <form onSubmit={handleAdd} method="post" className="p-2 grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input name="name" type="text" id="name" autoComplete="off" placeholder="Google Account" className="w-full" />
                            <Label htmlFor="email" className="mt-1">Email / Username</Label>
                            <Input name="email" type="text" id="email" autoComplete="off" placeholder="name@domain.com" className="w-full" />
                            <Label htmlFor="password" className="mt-1">Password</Label>
                            <Input name="password" type="password" id="password" autoComplete="off" placeholder="pass****" className="w-full" />
                            <p className="text-xs max-w-md text-muted-foreground">No one can see your email & password even the coder itself, It will be encrypted with highest encryption strength possible!</p>
                            <Button type="submit" className="mt-2" disabled={loading}>{loading ? <Loader className="w-4 h-4 animate-spin" /> : "Add Password"}</Button>
                        </form>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
};