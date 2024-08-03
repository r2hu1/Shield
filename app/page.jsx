"use client";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
    const user = useSession();
    const router = useRouter();
    if (user.status == "unauthenticated") return router.push("/login");

    return (
        <main>
            <Header />
            Homepage
        </main>
    )
}