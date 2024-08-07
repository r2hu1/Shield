"use server";

import connectDB from "@/lib/mongodb";
import User from "@/models/user";

export default async function updateStatus({ currentUserEmail, newStatus }) {
    try {
        await connectDB();
        const user = await User.findOne({ email: currentUserEmail });
        if (!user) return JSON.stringify({ success: false, error: "User not found" });
        const newUser = await User.findOneAndUpdate({ email: currentUserEmail }, { status: newStatus });
        if (newUser) return JSON.stringify({ success: true });
        return JSON.stringify({ success: false, error: "Something went wrong" });
    }
    catch (e) {
        return JSON.stringify({ error: e });
    }
}