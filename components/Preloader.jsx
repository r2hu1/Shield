"use client";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Preloader() {
    const [show, setShow] = useState(true);
    useEffect(() => {
        setShow(false);
    },[]);
    return show && (
        <div className="fixed z-[99999999] top-0 left-0 right-0 bottom-0 h-full w-full flex items-center justify-center bg-background">
            <div className="grid place-items-center">
                <Loader2 className="h-5 w-5 animate-spin" />
                <p className="text-sm text-center mt-1 text-muted-foreground">Hold on! loading..</p>
            </div>
        </div>
    )
}