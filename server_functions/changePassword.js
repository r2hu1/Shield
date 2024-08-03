"use server";

import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import base64 from "base-64";

export default async function changePassword({ currentUserEmail, currentPassword, newPassword }) {
    try {
        await connectDB();
        const user = await User.findOne({ email: currentUserEmail });
        if (base64.decode(user.password) != currentPassword) return JSON.stringify({ error: 'Current password does not match!' });
        else if (currentPassword == newPassword) return JSON.stringify({ error: 'New password cannot be same as current password!' });
        const newUser = await User.findOneAndUpdate({ email: currentUserEmail }, { password: base64.encode(newPassword) });
        if (newUser) return JSON.stringify({ success: 'Password changed successfully!' });
        return JSON.stringify({ error: 'Something went wrong!' });
    }
    catch (e) {
        return JSON.stringify({ error: e });
    }
}