"use server";

import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export default async function matchPassword({ currentUserEmail, currentPassword }) {
    try {
        await connectDB();
        const user = await User.findOne({ email: currentUserEmail });
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return JSON.stringify({ success: false, error: 'Invalid Password!' });
        return JSON.stringify({ success: true });
    }
    catch (e) {
        return JSON.stringify({ error: e });
    }
}