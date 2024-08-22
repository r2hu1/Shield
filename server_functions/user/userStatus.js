"use server";

import connectDB from "@/lib/mongodb";
import User from "@/models/user";

export default async function getStatus({ currentUserEmail }) {
    try {
        await connectDB();
        const user = await User.findOne({ email: currentUserEmail });
        return JSON.stringify({ status: user.status });
    }
    catch (e) {
        return JSON.stringify({ error: e });
    }
}