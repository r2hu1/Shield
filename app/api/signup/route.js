import connectDB from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(request) {
    const { email, password } = await request.json();
    await connectDB();
    try {
        const getExistingUser = await User.findOne({ email });
        if (getExistingUser) {
            return new Response(JSON.stringify({ error: "Email already exists, login instead or use another email!" }), { status: 409 });
        }
        const user = await User.create({ email, password });
        return new Response(JSON.stringify({ success: "success" }), { status: 200 });
    }
    catch (error) {
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
}