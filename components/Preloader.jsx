"use client";
import { Loader, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Preloader() {
    const [show, setShow] = useState(true);
    useEffect(() => {
        document.body.style.overflow = "hidden";
        setTimeout(() => {
            setShow(false);
            document.body.style.overflow = "auto";
        }, 2000);
    }, []);
    return show && (
        <div className="fixed z-[99999999] top-0 left-0 right-0 bottom-0 h-full w-full flex items-center justify-center bg-background">
            <Loader2 className="h-6 w-6 animate-spin" />
        </div>
    )
}