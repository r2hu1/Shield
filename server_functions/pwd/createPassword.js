"use server";

import { encrypt } from "@/lib/crypto";
import connectDB from "@/lib/mongodb";
import Pwd from "@/models/pwd";
import User from "@/models/user";

export default async function createPassword({ currentUserEmail, name, email, password }) {
    try {
        await connectDB();
        const user = await User.findOne({ email: currentUserEmail });
        if (!user) return JSON.stringify({ success: false, error: "User not found" });
        console.log(user.status);
        if (user.status != "verified") return JSON.stringify({ success: false, error: "Email is not verified" });
        let encryptedPassword = encrypt(password);
        let encryptedEMail = encrypt(email);
        const crPwd = await Pwd.create({ name, email: encryptedEMail, password: encryptedPassword, owner: user._id });
        if (crPwd) return JSON.stringify({ success: true, data: crPwd });
        return JSON.stringify({ success: false, error: "Something went wrong" });
    }
    catch (e) {
        return JSON.stringify({ error: e });
    }
}