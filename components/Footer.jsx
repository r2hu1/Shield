import { ShieldHalf } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-5 md:px-20 lg:px-32 px-7 mb-5">
            <p className="text-sm text-muted-foreground mt-3">Built by <Link className="underline underline-offset-4 text-foreground" href="https://rahul.eu.org">r2hu1</Link> source code available on <Link href="https://github.com/r2hu1/shield" className="underline underline-offset-4 text-foreground">github repository</Link></p>
        </footer>
    )
}