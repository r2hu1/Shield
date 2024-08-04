import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import bcrypt from "bcryptjs";
import EmailTemplate from '@/components/email-template';
import { render } from '@react-email/components';

export async function POST(request) {
    const { email } = await request.json();
    const sixDigitOtp = Math.floor(100000 + Math.random() * 900000);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(sixDigitOtp.toString(), salt);


    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    });

    let rndrEm = render(<EmailTemplate validationCode={sixDigitOtp} />);
    let mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: "OTP for email verification",
        html: rndrEm,
    };

    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true, otp: hashedPassword });
    } catch (error) {
        return NextResponse.json({ success: false, error: error });
    }
}
