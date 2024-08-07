import { ShieldHalf } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="grid place-items-center px-6 h-36 mt-3">
            <div className="grid place-items-center text-center">
                <div className="flex flex-col gap-1 items-center justify-center">
                    <ShieldHalf className="h-5 w-5 -ml-1" />
                    <h1 className="text-base">Shield</h1>
                </div>
                <p className="text-xs text-muted-foreground">end to end encrypted password manager</p>
                <ul className="list-none flex items-center gap-3 mt-2">
                    <li><Link href="https://github.com/r2hu1/shield" className="text-sm text-muted-foreground hover:underline">Github</Link></li>
                    <li><Link href="https://github.com/r2hu1/shield/fork" className="text-sm text-muted-foreground hover:underline">Fork Repo</Link></li>
                    <li><Link href="https://github.com/r2hu1/shield/issues" className="text-sm text-muted-foreground hover:underline">Open Issue</Link></li>
                </ul>
            </div>
        </footer>
    )
}