"use client";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, ExternalLink, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
    const user = useSession();
    const router = useRouter();
    if (user.status == "unauthenticated") return router.push("/login");

    return (
        <main>
            <Header />
            <div className="px-6 py-6 max-w-lg mx-auto w-fit">
                <Alert>
                    <ShieldAlert className="h-5 w-5" />
                    <AlertTitle>Verification Pending!</AlertTitle>
                    <AlertDescription className="flex gap-3 items-center justify-between">
                        <p className="text-muted-foreground">
                            Please verify your email address to use all settings and features.
                        </p>
                        <Button className="min-w-10" variant="outline" size="icon" asChild><Link href="/verify-email"><ExternalLink className="h-4 w-4" /></Link></Button>
                    </AlertDescription>
                </Alert>
            </div>
            <section className="px-6 py-20">

            </section>
        </main>
    )
}