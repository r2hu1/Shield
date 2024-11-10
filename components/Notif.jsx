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
        <div className="flex items-center justify-between gap-3 bg-secondary/50 px-3 py-3 md:px-20 lg:px-32">
            <p className="text-sm text-foreground/80">Download the Shield app for better experience!</p>
            <Button size="sm" className="text-xs p-0 h-8 px-3" asChild>
                <Link href="https://github.com/r2hu1/Shield/raw/refs/heads/main/public/shield.apk">Download</Link>
            </Button>
        </div>
    )
};
