"use server";

import connectDB from "@/lib/mongodb";
import Pwd from "@/models/pwd";
import User from "@/models/user";

export default async function deleteAccount({ currentUserEmail }) {
    try {
        await connectDB();
        const user = await User.findOne({ email: currentUserEmail });
        if (!user) return JSON.stringify({ success: false, error: "User not found" });
        const dlPwd = await Pwd.deleteMany({ owner: user._id });
        if (!dlPwd) return JSON.stringify({ success: false, error: "Something went wrong" });
        const dlUser = await User.findOneAndDelete({ email: currentUserEmail });
        if (dlUser) return JSON.stringify({ success: true });
        return JSON.stringify({ success: false, error: "Something went wrong" });
    }
    catch (e) {
        return JSON.stringify({ error: e });
    }
}