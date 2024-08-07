"use server";

import connectDB from "@/lib/mongodb";
import Pwd from "@/models/pwd";
import User from "@/models/user";

export default async function getPassword({ currentUserEmail }) {
    try {
        await connectDB();
        const user = await User.findOne({ email: currentUserEmail });
        if (!user) return JSON.stringify({ success: false, error: "User not found" });
        if (user.status != "verified") return JSON.stringify({ success: false, error: "Email is not verified" });
        const crPwd = await Pwd.find({ owner: user._id });
        if (crPwd) return JSON.stringify({ success: true, data: crPwd });
        return JSON.stringify({ success: false, error: "Something went wrong" });
    }
    catch (e) {
        return JSON.stringify({ error: e });
    }
}