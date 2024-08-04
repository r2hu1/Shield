"use client";
import Header from "@/components/Header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExternalLink, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import getStatus from "@/server_functions/userStatus";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Page() {
    const router = useRouter();
    const [isVerifyed, setIsVerifyed] = useState(true);
    const { data: session, status } = useSession();

    const checkVerification = async () => {
        if (!session) return;
        try {
            const dta = await getStatus({ currentUserEmail: session.user.email });
            if (JSON.parse(dta).status != "verified") {
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
    }, [status, session]);

    return (
        <main>
            <Header />
            {!isVerifyed && (
                <div className="px-6 py-6 max-w-lg mx-auto w-fit">
                    <Alert>
                        <ShieldAlert className="h-5 w-5" />
                        <AlertTitle>Verification Pending!</AlertTitle>
                        <AlertDescription className="grid gap-2">
                            <p className="text-muted-foreground">
                                Please verify your email address to use all settings and features.
                            </p>
                            <Button size="sm" asChild className="w-fit gap-2"><Link href="/verify-email">Verify <ExternalLink className="h-3.5 w-3.5" /></Link></Button>
                        </AlertDescription>
                    </Alert>
                </div>
            )}
            <section className="px-6 py-20">
                in dev
            </section>
        </main>
    )
}