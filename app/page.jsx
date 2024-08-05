"use client";
import Header from "@/components/Header";
import { ExternalLink, FilterIcon, Lock, SearchIcon, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import getStatus from "@/server_functions/userStatus";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Label } from "@/components/ui/label";

export default function Page() {
    const router = useRouter();
    const [isVerifyed, setIsVerifyed] = useState(true);
    const { data: session, status } = useSession();

    const checkVerification = async () => {
        if (!session) return;
        try {
            const dta = await getStatus({ currentUserEmail: session.user.email });
            if (JSON.parse(dta).status == "unverified") {
                setIsVerifyed(false);
                return router.push("/verify-email");
            }
            setIsVerifyed(true);
        }
        catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        if (status === "authenticated") {
            checkVerification();
        }
        else {
            router.push("/login");
        }
    }, [status, session]);

    return (
        <main>
            <Header />
            <section className="px-6 py-10 md:px-20 lg:px-32">
                {!isVerifyed && (
                    <div className="p-3 rounded border border-border flex items-center gap-3">
                        <div className="flex items-start gap-3">
                            <ShieldAlert className="h-10 w-10" />
                            <div>
                                <h1 className="text-base">Verification Pending!</h1>
                                <p className="text-sm text-muted-foreground">Your email has not been verified yet. verify it by clicking the verify button.</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Button asChild className="w-fit" variant="outline"><Link href="/verify-email">Verify</Link></Button>
                        </div>
                    </div>
                )}
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
                                <div className="p-2 grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input type="text" id="name" autoComplete="off" placeholder="Google Account" className="w-full" />
                                    <Label htmlFor="email">Email</Label>
                                    <Input type="email" id="email" autoComplete="off" placeholder="name@domain.com" className="w-full" />
                                    <Label htmlFor="password" className="mt-1">Password</Label>
                                    <Input type="password" id="password" autoComplete="off" placeholder="pass****" className="w-full" />
                                    <p className="text-xs max-w-md text-muted-foreground">No one can see your email & password even the coder itself, It will be encrypted with highest encryption strength possible!</p>
                                    <Button className="mt-2">Add</Button>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>
        </main>
    )
}