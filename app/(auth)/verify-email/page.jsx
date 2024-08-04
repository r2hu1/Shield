"use client"
import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import updateStatus from "@/server_functions/updateStatus";
import getStatus from "@/server_functions/userStatus";
import { Loader, ShieldHalf } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
    const [userOtp, setUserOtp] = useState(null);
    const [snding, setSnding] = useState(false);
    const [vrfing, setVrfing] = useState(false);
    const [vcs, setVcs] = useState(null);
    const { data: session, status } = useSession();
    const router = useRouter();

    const sendOtp = async () => {
        setSnding(true);
        await fetch("/api/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: session.user.email }),
        }).then((data) => data.json()).then((data) => {
            if (data) {
                setVcs(data.data);
                toast.success("OTP sent! check your email");
                setSnding(false);
                return true;
            }
            toast.error(data.error);
            setSnding(false);
            return false;
        });
    };

    const handleVerify = async () => {
        if (!userOtp) return toast.error("Please enter OTP!");
        if (vcs.toString() !== userOtp) return toast.error("Invalid OTP! Please try again");
        try {
            const data = await updateStatus({ currentUserEmail: session.user.email, newStatus: "verified" });
            if (JSON.parse(data)) {
                toast.success("Email verified successfully!");
                return router.push("/");
            }
        }
        catch (e) {
            console.log(e);
        }
    };
    
    const checkVerification = async () => {
        if (!session) return;
        try {
            const dta = await getStatus({ currentUserEmail: session.user.email });
            if (JSON.parse(dta).status == "verified") return router.push("/");
        }
        catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        if (status === "authenticated") {
            checkVerification();
        }
    }, [status, session]);

    return (
        <div className="w-full max-w-md px-6 grid gap-3 text-center">
            <div className="grid gap-2 mb-4 place-items-center">
                <ShieldHalf className="h-8 w-8" />
                <h1 className="text-lg -mb-2">Enter OTP</h1>
                <p className="text-sm text-muted-foreground max-w-sm">Enter 6 digits one time password (OTP) sent to your email address!</p>
            </div>
            <div className="grid w-fit gap-3 mx-auto">
                <InputOTP maxLength={6} value={userOtp} onChange={setUserOtp}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
                <p className="text-sm text-muted-foreground flex items-center gap-1 justify-center">Didn't get email? <span className="cursor-pointer hover:opacity-85 underline" onClick={sendOtp}>{snding ? <Loader className="h-3 w-3 animate-spin" /> : "Resend"}</span></p>
                <Button onClick={handleVerify} disabled={vrfing}>{vrfing ? <Loader className="h-4 w-4 animate-spin" /> : "Verify"}</Button>
            </div>
        </div>
    );
}
