"use server";

import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import base64 from "base-64";

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