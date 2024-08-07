"use server";

import connectDB from "@/lib/mongodb";
import Pwd from "@/models/pwd";
import User from "@/models/user";

export default async function deletePassword({ currentUserEmail, id }) {
    try {
        await connectDB();
        const user = await User.findOne({ email: currentUserEmail });
        if (!user) return JSON.stringify({ success: false, error: "User not found" });
        if (user.status != "verified") return JSON.stringify({ success: false, error: "Email is not verified" });
        const dlUser = await Pwd.findOneAndDelete({ _id: id, });
        if (dlUser) return JSON.stringify({ success: true });
        return JSON.stringify({ success: false, error: "Something went wrong" });
    }
    catch (e) {
        return JSON.stringify({ error: e });
    }
}