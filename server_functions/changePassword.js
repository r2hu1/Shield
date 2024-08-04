"use server";

import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export default async function changePassword({ currentUserEmail, currentPassword, newPassword }) {
    try {
        await connectDB();
        const user = await User.findOne({ email: currentUserEmail });
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return JSON.stringify({ error: 'Current password does not match!' });
        else if (currentPassword == newPassword) return JSON.stringify({ error: 'New password cannot be same as current password!' });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        const newUser = await User.findOneAndUpdate({ email: currentUserEmail }, { password: hashedPassword });
        if (newUser) return JSON.stringify({ success: 'Password changed successfully!' });
        return JSON.stringify({ error: 'Something went wrong!' });
    }
    catch (e) {
        return JSON.stringify({ error: e });
    }
}