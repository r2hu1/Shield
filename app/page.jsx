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
            <section className="px-6 py-14">
                in dev
            </section>
        </main>
    )
}