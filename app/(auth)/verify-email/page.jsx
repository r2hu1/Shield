"use client"
import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { ShieldHalf } from "lucide-react";
import { toast } from "sonner";

export default function Page() {
    return (
        <div className="w-full max-w-md px-6 grid gap-3 text-center">
            <div className="grid gap-2 mb-4 place-items-center">
                <ShieldHalf className="h-8 w-8" />
                <h1 className="text-lg -mb-2">Enter OTP</h1>
                <p className="text-sm text-muted-foreground max-w-sm">Enter 4 digit one time password (OTP) sent to your email address!</p>
            </div>
            <div className="grid w-fit gap-3 mx-auto">
                <InputOTP maxLength={6}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPSeparator/>
                    <InputOTPGroup>
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                    </InputOTPGroup>
                </InputOTP>
                <p className="text-sm text-muted-foreground">Didn't get? <span className="cursor-pointer hover:opacity-85 underline" onClick={() => toast.success("OTP sent, check your email!")}>Resend</span></p>
                <Button>Verfy</Button>
            </div>
        </div>
    )
}