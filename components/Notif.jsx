"use client"

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Notif() {
    const [inPwa, setInPwa] = useState(false);

    useEffect(() => {
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setInPwa(true);
        }
    }, []);
    return !inPwa && (
        <div className="flex items-center justify-between gap-3 bg-secondary/40 p-3">
            <p className="text-sm text-foreground/80">Download the shield app for better experience!</p>
            <Button size="sm" className="text-xs p-0 h-8 px-3" asChild>
                <Link href="/shield.apk">Download</Link>
            </Button>
        </div>
    )
};