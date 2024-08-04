import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    if (!resend) return NextResponse.json({ error: "Resend API Key Not Found" });
    const vCode = Math.floor(100000 + Math.random() * 900000);

    const { email } = await request.json();
    try {
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: process.env.PRODUCTION == "true" ? email : process.env.RESEND_EMAIL,
            subject: `OTP for email verification`,
            react: EmailTemplate({ validationCode: vCode }),
        });

        if (!data) {
            return Response.json({ error }, { status: 500 });
        }
        return Response.json({ data: vCode });
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}