"use client";
import Header from "@/components/Header";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import getStatus from "@/server_functions/user/userStatus";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Passwords from "@/components/Passwords";
import Footer from "@/components/Footer";

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
            <section className="px-6 py-3 md:px-20 lg:px-32 mt-3">
                {!isVerifyed && (
                    <div className="p-3 mb-3 rounded border border-border flex items-center sm:justify-between gap-3">
                        <div className="flex items-start gap-3">
                            <ShieldAlert className="h-8 w-8" />
                            <div>
                                <h1 className="text-base">Verification Pending!</h1>
                                <p className="text-xs text-muted-foreground">Your email has not been verified yet. verify it by clicking the verify button.</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Button asChild className="w-fit"><Link href="/verify-email">Verify</Link></Button>
                        </div>
                    </div>
                )}
                <Passwords />
            </section>
            <Footer />
        </main>
    )
}