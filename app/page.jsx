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
    const [inPwa, setInPwa] = useState(false);
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
        };
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setInPwa(true);
        }
    }, [status, session]);

    return (
        <main>
            {!inPwa && (
                <div className="flex items-center justify-between gap-3 bg-secondary/40 p-3">
                    <p className="text-sm text-foreground/80">Download the shield app for better experience!</p>
                    <Button size="sm" className="text-xs p-0 h-8 px-3" asChild>
                        <Link href="/shield.apk">Download</Link>
                    </Button>
                </div>
            )}
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