import { ShieldHalf } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-10 md:px-20 lg:px-32 px-7 mb-5">
            <div className="grid gap-1">
                <div className="flex items-center gap-1">
                    <ShieldHalf className="h-5 w-5 -ml-1" />
                    <h1 className="text-base">Shield</h1>
                </div>
                <p className="text-sm text-muted-foreground">opensource end to end encrypted password manager.</p>
                <ul className="list-none flex gap-3 mt-2">
                    <li><Link href="https://github.com/r2hu1/shield" className="text-sm text-muted-foreground underline underline-offset-4">Github</Link></li>
                    <li><Link href="https://github.com/r2hu1/shield/fork" className="text-sm text-muted-foreground underline underline-offset-4">Fork Repo</Link></li>
                    <li><Link href="https://github.com/r2hu1/shield/issues" className="text-sm text-muted-foreground underline underline-offset-4">Open Issue</Link></li>
                </ul>
                <p className="text-sm opacity-85 mt-3">Built by <Link className="underline underline-offset-4 text-muted-foreground" href="https://rahul.eu.org">r2hu1</Link> deployed on vercel.</p>
            </div>
        </footer>
    )
}