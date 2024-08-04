import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Not Found",
    description: "The page you are looking for does not exist.",
}
export default function NotFound() {
    return (
        <div className="px-6 absolute h-full w-full flex items-center justify-center">
            <div className="text-center grid gap-2 place-items-center">
                <AlertTriangle className="h-6 w-6"/>
                <h1 className="text-base -mb-2.5">Not Found</h1>
                <p className="text-sm text-muted-foreground">The page you are looking for does not exist.</p>
                <Button asChild className="mt-1" variant="outline"><Link href="/">Go Home</Link></Button>
            </div>
        </div>
    );
}