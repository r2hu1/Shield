"use client";

import getPassword from "@/server_functions/pwd/getPassword";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { AlertTriangle, Copy, Eye, Loader, X } from "lucide-react";
import { decrypt } from "@/lib/crypto";
import { FaFacebook, FaGithub, FaGoogle, FaInstagram, FaMicrosoft, FaRegUser, FaTwitter, FaYoutube } from "react-icons/fa";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";

export default function Passwords() {
    const [data, setData] = useState([]);
    const [loading, setloading] = useState(true);
    const user = useSession();

    const icons = {
        "github": <FaGithub className="h-4 w-4" />,
        "google": <FaGoogle className="h-4 w-4" />,
        "facebook": <FaFacebook className="h-4 w-4" />,
        "instagram": <FaInstagram className="h-4 w-4" />,
        "x": <X className="h-4 w-4" />,
        "twitter": <FaTwitter className="h-4 w-4" />,
        "youtube": <FaYoutube className="h-4 w-4" />,
        "microsoft": <FaMicrosoft className="h-4 w-4" />,
        "account": <FaRegUser className="h-4 w-4" />,
    };

    const getData = async () => {
        try {
            if (!user) return;
            setloading(true);
            let pwds = await getPassword({ currentUserEmail: user.data.user.email });
            if (JSON.parse(pwds).success) {
                setData(JSON.parse(pwds).data);
                setloading(false);
                return;
            }
            setloading(false);
            return JSON.parse(pwds).error;
        }
        catch (e) {
            setloading(false);
            return e;
        }
    };
    useEffect(() => {
        getData();
    }, []);
    return (
        <div className="grid gap-3">
            <div className="mb-2">
                <h1 className="text-lg font-medium">Saved Passwords</h1>
                <p className="text-sm text-muted-foreground max-w-md">your saved passwords is encrypted and it can be decrypt only by you.</p>
            </div>
            {!loading ? data && data.map((item, i) => {
                return (
                    <div key={i}>
                        <div className="flex items-center justify-between border border-border p-3 rounded-md">
                            <div className="flex items-center">
                                <div className="w-10 items-center flex justify-center mr-3">
                                    {icons[item.name.toLowerCase()] || icons["account"]}
                                </div>
                                <div>
                                    <h1 className="text-base">{item.name}</h1>
                                    <p className="text-xs text-muted-foreground">{decrypt(item.email)}</p>
                                </div>
                            </div>
                            <div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="min-w-10" size="icon" variant="outline">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle className="text-left">Viewing {item.name} Account</DialogTitle>
                                            <DialogDescription className="text-left">
                                                <p className="text-sm text-muted-foreground">Copy, share, edit or delete your {item.name} account.</p>
                                                <div className="mt-5 grid gap-3">
                                                    <Label htmlFor="name" className="text-primary -mb-1">Name</Label>
                                                    <Input type="text" id="name" value={item.name} readOnly className="w-full text-primary border-border" />
                                                    <Label htmlFor="email" className="text-primary -mb-1">Email</Label>
                                                    <div className="flex items-center gap-2">
                                                        <Input type="text" id="email" value={decrypt(item.email)} readOnly className="w-full text-primary border-border" />
                                                        <Button className="min-w-10" size="icon" onClick={() => { navigator.clipboard.writeText(decrypt(item.email)); toast.success(`Copied ${item.name} email to clipboard`) }}><Copy className="h-4 w-4" /></Button>
                                                    </div>
                                                    <Label htmlFor="password" className="text-primary -mb-1">Password <span className="text-xs text-muted-foreground">encrypted (click copy to decrypt & copy)</span></Label>
                                                    <div className="flex items-center gap-2">
                                                        <Input type="text" id="password" value={item.password} readOnly className="w-full text-primary border-border" />
                                                        <Button className="min-w-10" size="icon" onClick={() => { navigator.clipboard.writeText(decrypt(item.password)); toast.success(`Copied ${item.name} password to clipboard`) }}><Copy className="h-4 w-4" /></Button>
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <Button onClick={() => { navigator.clipboard.writeText(JSON.stringify({ "name": item.name, "email": decrypt(item.email), "password": decrypt(item.password) })); toast.success(`Copied ${item.name} to clipboard`) }}>Copy All</Button>
                                                        <Button onClick={() => navigator.share({ "title": `${item.name} Account`, "text": `Name: ${item.name}\nEmail: ${decrypt(item.email)}\nPassword: ${decrypt(item.password)}` })} variant="outline" className="text-primary border-primary">Share</Button>
                                                        <Button variant="outline" className="text-red-400 border-red-400 hover:text-red-400">Delete</Button>
                                                    </div>
                                                </div>
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                )
            }) : (
                <div className="flex items-center justify-center h-64">
                    <Loader className="h-5 w-5 animate-spin" />
                </div>
            )}
            {!loading && data.length == 0 && (
                <div className="flex items-center justify-center h-64">
                    <div className="grid place-items-center text-center">
                        <AlertTriangle className="h-6 w-6 mb-1"/>
                        <h1 className="text-sm">No Passwords Found</h1>
                        <p className="text-xs text-muted-foreground">Add by clicking Add New on the setting button</p>
                    </div>
                </div>
            )}
        </div>
    )
};