"use client";

import getPassword from "@/server_functions/pwd/getPassword";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { AlertCircle, AlertTriangle, Check, CheckCircle, Clipboard, ClipboardType, Eye, Globe, Loader, RotateCw, Share2, Trash, X } from "lucide-react";
import { decrypt } from "@/lib/crypto";
import { FaCloudflare, FaDiscord, FaFacebook, FaGithub, FaGoogle, FaInstagram, FaLinkedin, FaMicrosoft, FaQuora, FaReddit, FaRegUser, FaStackOverflow, FaTwitter, FaYoutube } from "react-icons/fa";
import {
    Credenza,
    CredenzaBody,
    CredenzaClose,
    CredenzaContent,
    CredenzaDescription,
    CredenzaFooter,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger,
} from "@/components/ui/credenza";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { SiMinecraft } from "react-icons/si";
import { GiSwordClash } from "react-icons/gi";
import { FaXTwitter } from "react-icons/fa6";
import deletePassword from "@/server_functions/pwd/deletePassword";
import { Skeleton } from "./ui/skeleton";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

export default function Passwords() {
    const [data, setData] = useState([]);
    const [loading, setloading] = useState(true);
    const [loading2, setloading2] = useState(false);
    const user = useSession();

    const icons = {
        "github": <FaGithub className="h-4 w-4" />,
        "google": <FaGoogle className="h-4 w-4" />,
        "facebook": <FaFacebook className="h-4 w-4" />,
        "instagram": <FaInstagram className="h-4 w-4" />,
        "x": <FaXTwitter className="h-4 w-4" />,
        "twitter": <FaTwitter className="h-4 w-4" />,
        "youtube": <FaYoutube className="h-4 w-4" />,
        "microsoft": <FaMicrosoft className="h-4 w-4" />,
        "minecraft": <SiMinecraft className="h-4 w-4" />,
        "coc": <GiSwordClash className="h-4 w-4" />,
        "clash of clans": <GiSwordClash className="h-4 w-4" />,
        "linkedin": <FaLinkedin className="h-4 w-4" />,
        "youtube": <FaYoutube className="h-4 w-4" />,
        "quora": <FaQuora className="h-4 w-4" />,
        "stackoverflow": <FaStackOverflow className="h-4 w-4" />,
        "cloudflare": <FaCloudflare className="h-4 w-4" />,
        "reddit": <FaReddit className="h-4 w-4" />,
        "discord": <FaDiscord className="h-4 w-4" />,
        "account": <FaRegUser className="h-4 w-4" />,
        "domain": <Globe className="h-4 w-4" />,
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

    const handleDelete = async (id) => {
        try {
            if (!user) return;
            setloading2(true);
            let del = await deletePassword({ currentUserEmail: user.data.user.email, id: id });
            if (JSON.parse(del).success) {
                toast.success("Password deleted successfully!");
                setloading2(false);
                return getData();
            }
            setloading2(false);
            toast.error(JSON.parse(del).error);
            return JSON.parse(del).error;
        }
        catch (e) {
            setloading2(false);
            return e;
        }
    };

    const passStrength = (str) => {
        let strength = 0;
        if (str.length >= 8) {
            strength += 25;
        }
        if (/[a-z]/.test(str)) {
            strength += 20;
        }
        if (/[A-Z]/.test(str)) {
            strength += 20;
        }
        if (/[\W_]/.test(str)) {
            strength += 15;
        }
        if (/[0-9]/.test(str)) {
            strength += 20;
        }
        return Math.min(strength, 100);
    };

    const sum = data.length && data.map((i) => passStrength(decrypt(i.password))).reduce((a, b) => a + b / data.length, 0);


    useEffect(() => {
        getData();
    }, []);
    return (
        <div className="min-h-[450px]">
            {!loading && data.length > 0 &&
                <div className="border border-border rounded-md -mt-5 mb-8">
                    <div className="p-3">
                        <h1 className="text-base font-medium">Overall Password Strength</h1>
                        <p className="text-sm mt-0.5 text-muted-foreground">This is an overall password strength for all your saved passwords.</p>
                        <div className="flex items-center mt-2 gap-3">
                            <Progress value={sum} />
                            <span className="text-sm font-medium">{Math.floor(sum)}%</span>
                        </div>
                    </div>
                </div>
            }
            {loading && (
                <div className="mb-8 -mt-4 grid gap-2 border border-border rounded-md p-3">
                    <Skeleton className="md:w-56 w-full h-4" />
                    <Skeleton className="md:w-96 w-2/3 h-3 mt-1" />
                    <Skeleton className="md:w-24 w-1/3 h-3 md:hidden" />
                    <div className="mt-1 flex items-center gap-3">
                        <Skeleton className="w-full h-5 rounded-full" />
                        <Skeleton className="w-5 h-5" />
                    </div>
                </div>
            )}
            <div className="grid gap-3">
                <div className="mb-2">
                    <h1 className="text-lg font-medium flex items-center justify-between">Saved Passwords <Button onClick={() => window.location.reload()} size="icon" variant="ghost" className="h-6 w-6 p-0"><RotateCw className="h-3 w-3" /></Button></h1>
                    <p className="text-sm mt-1 text-muted-foreground max-w-md">your saved passwords is encrypted and it can be decrypt only by you.</p>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                    {!loading ? data && data.map((item, i) => {
                        return (
                            <div key={i} className="border border-border rounded-md">
                                <div className="p-3 flex items-center border-b justify-between">
                                    <div className="flex items-center">
                                        <div className="w-10 items-center flex justify-center mr-3">
                                            {icons[item.name.toLowerCase().split(" ")[0]] || icons[item.name.toLowerCase().split(" ")[1]] || icons["account"]}
                                        </div>
                                        <div>
                                            <h1 className="text-base">{item.name}</h1>
                                            <p className="text-xs text-muted-foreground">{decrypt(item.email)}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <Credenza>
                                            <CredenzaTrigger asChild>
                                                <Button className="min-w-10" size="icon" variant="outline">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </CredenzaTrigger>
                                            <CredenzaContent>
                                                <CredenzaHeader>
                                                    <CredenzaTitle className="text-left">Viewing {item.name} Account</CredenzaTitle>
                                                    <CredenzaDescription className="text-left">
                                                        <p className="text-sm text-muted-foreground">Copy, share or delete your {item.name} account.</p>
                                                        <div className="mt-5 grid gap-3">
                                                            <Label htmlFor="name" className="text-primary -mb-1">Name</Label>
                                                            <Input type="text" id="name" value={item.name} readOnly className="w-full text-primary border-border" />
                                                            <Label htmlFor="email" className="text-primary -mb-1">Email</Label>
                                                            <div className="flex items-center gap-2">
                                                                <Input type="text" id="email" value={decrypt(item.email)} readOnly className="w-full text-primary border-border" />
                                                                <Button className="min-w-10" size="icon" onClick={() => { navigator.clipboard.writeText(decrypt(item.email)); toast.success(`Copied ${item.name} email to clipboard`) }}><ClipboardType className="h-4 w-4" /></Button>
                                                            </div>
                                                            <Label htmlFor="password" className="text-primary -mb-1">Password <span className="text-xs text-muted-foreground">encrypted (click copy to decrypt & copy)</span></Label>
                                                            <div className="flex items-center gap-2">
                                                                <Input type="password" id="password" value={item.password} readOnly className="w-full text-primary border-border" />
                                                                <Button className="min-w-10" size="icon" onClick={() => { navigator.clipboard.writeText(decrypt(item.password)); toast.success(`Copied ${item.name} password to clipboard`) }}><ClipboardType className="h-4 w-4" /></Button>
                                                            </div>
                                                            <div className="flex items-center gap-2 mt-2">
                                                                <Button onClick={() => { navigator.clipboard.writeText(JSON.stringify({ "name": item.name, "email": decrypt(item.email), "password": decrypt(item.password) })); toast.success(`Copied ${item.name} to clipboard`) }}>Copy All</Button>
                                                                {/* <Button size="icon" onClick={() => navigator.share({ "title": `${item.name} Account`, "text": `Name: ${item.name}\nEmail: ${decrypt(item.email)}\nPassword: ${decrypt(item.password)}` })} variant="outline" className="text-primary border-primary"><Share2 className="h-4 w-4" /></Button> */}
                                                                <Popover>
                                                                    <PopoverTrigger>
                                                                        <Button size="icon" variant="outline"><Trash className="h-4 w-4" /></Button>
                                                                    </PopoverTrigger>
                                                                    <PopoverContent>
                                                                        <p className="text-sm text-muted-foreground mb-3">
                                                                            Are you sure you want to delete <span className="text-primary underline">{item.name}?</span> <br /> This action cannot be undone.
                                                                        </p>
                                                                        <Button onClick={() => { handleDelete(item._id) }} disabled={loading2} size="sm" variant="destructive">{loading2 ? <Loader className="h-4 w-4 animate-spin" /> : "Delete"}</Button>
                                                                    </PopoverContent>
                                                                </Popover>
                                                            </div>
                                                        </div>
                                                    </CredenzaDescription>
                                                </CredenzaHeader>
                                            </CredenzaContent>
                                        </Credenza>
                                    </div>
                                </div>
                                <div className="p-2 flex items-center justify-between">
                                    <p className="text-xs text-muted-foreground">Password strength ~ <span className={passStrength(decrypt(item.password)) > 80 ? "text-muted-foreground" : "dark:text-white text-black"}>{passStrength(decrypt(item.password))}%</span></p>
                                    {passStrength(decrypt(item.password)) != 100 ?
                                        <Popover>
                                            <PopoverTrigger>
                                                <AlertCircle className="h-3.5 w-3.5" />
                                            </PopoverTrigger>
                                            <PopoverContent className="text-left sm:mr-0 mr-10">
                                                <p className="text-sm">A strong password must meet the following requirements:</p>
                                                <ul className="text-xs mt-3 text-muted-foreground list-decimal px-4 gap-0.5 grid">
                                                    {decrypt(item.password).length < 8 && <li>Password is too short</li>}
                                                    {!/[a-z]/.test(decrypt(item.password)) && <li>Missing at least one lowercase letter</li>}
                                                    {!/[A-Z]/.test(decrypt(item.password)) && <li>Missing at least one uppercase letter</li>}
                                                    {!/[0-9]/.test(decrypt(item.password)) && <li>Missing at least one number</li>}
                                                    {!/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(decrypt(item.password)) && <li>Missing at least one special character</li>}
                                                </ul>
                                            </PopoverContent>
                                        </Popover>
                                        :
                                        <CheckCircle className="h-3.5 w-3.5 text-muted-foreground" />
                                    }
                                </div>
                            </div>
                        )
                    }) : (
                        <>
                            <div className="border border-border rounded-md">
                                <div className="p-3 flex w-full items-center justify-between">
                                    <div className="flex gap-3 items-center">
                                        <Skeleton className="h-10 w-10" />
                                        <div className="grid gap-2">
                                            <Skeleton className="h-3.5 rounded-md md:w-52 w-32" />
                                            <Skeleton className="h-3.5 rounded-md md:w-36 w-20" />
                                        </div>
                                    </div>
                                    <Skeleton className="h-10 rounded-md w-10" />
                                </div>
                                <div className="p-2 border-t flex items-center justify-between">
                                    <Skeleton className="h-3.5 rounded-md md:w-36 w-1/2" />
                                    <Skeleton className="h-3.5 rounded-md w-4" />
                                </div>
                            </div>
                            <div className="border border-border rounded-md">
                                <div className="p-3 flex w-full items-center justify-between">
                                    <div className="flex gap-3 items-center">
                                        <Skeleton className="h-10 w-10" />
                                        <div className="grid gap-2">
                                            <Skeleton className="h-3.5 rounded-md md:w-52 w-32" />
                                            <Skeleton className="h-3.5 rounded-md md:w-36 w-20" />
                                        </div>
                                    </div>
                                    <Skeleton className="h-10 rounded-md w-10" />
                                </div>
                                <div className="p-2 border-t flex items-center justify-between">
                                    <Skeleton className="h-3.5 rounded-md md:w-36 w-1/2" />
                                    <Skeleton className="h-3.5 rounded-md w-4" />
                                </div>
                            </div>
                            <div className="border border-border rounded-md">
                                <div className="p-3 flex w-full items-center justify-between">
                                    <div className="flex gap-3 items-center">
                                        <Skeleton className="h-10 w-10" />
                                        <div className="grid gap-2">
                                            <Skeleton className="h-3.5 rounded-md md:w-52 w-32" />
                                            <Skeleton className="h-3.5 rounded-md md:w-36 w-20" />
                                        </div>
                                    </div>
                                    <Skeleton className="h-10 rounded-md w-10" />
                                </div>
                                <div className="p-2 border-t flex items-center justify-between">
                                    <Skeleton className="h-3.5 rounded-md md:w-36 w-1/2" />
                                    <Skeleton className="h-3.5 rounded-md w-4" />
                                </div>
                            </div>
                            <div className="border border-border rounded-md">
                                <div className="p-3 flex w-full items-center justify-between">
                                    <div className="flex gap-3 items-center">
                                        <Skeleton className="h-10 w-10" />
                                        <div className="grid gap-2">
                                            <Skeleton className="h-3.5 rounded-md md:w-52 w-32" />
                                            <Skeleton className="h-3.5 rounded-md md:w-36 w-20" />
                                        </div>
                                    </div>
                                    <Skeleton className="h-10 rounded-md w-10" />
                                </div>
                                <div className="p-2 border-t flex items-center justify-between">
                                    <Skeleton className="h-3.5 rounded-md md:w-36 w-1/2" />
                                    <Skeleton className="h-3.5 rounded-md w-4" />
                                </div>
                            </div>
                            <div className="border border-border rounded-md">
                                <div className="p-3 flex w-full items-center justify-between">
                                    <div className="flex gap-3 items-center">
                                        <Skeleton className="h-10 w-10" />
                                        <div className="grid gap-2">
                                            <Skeleton className="h-3.5 rounded-md md:w-52 w-32" />
                                            <Skeleton className="h-3.5 rounded-md md:w-36 w-20" />
                                        </div>
                                    </div>
                                    <Skeleton className="h-10 rounded-md w-10" />
                                </div>
                                <div className="p-2 border-t flex items-center justify-between">
                                    <Skeleton className="h-3.5 rounded-md md:w-36 w-1/2" />
                                    <Skeleton className="h-3.5 rounded-md w-4" />
                                </div>
                            </div>
                            <div className="border border-border rounded-md">
                                <div className="p-3 flex w-full items-center justify-between">
                                    <div className="flex gap-3 items-center">
                                        <Skeleton className="h-10 w-10" />
                                        <div className="grid gap-2">
                                            <Skeleton className="h-3.5 rounded-md md:w-52 w-32" />
                                            <Skeleton className="h-3.5 rounded-md md:w-36 w-20" />
                                        </div>
                                    </div>
                                    <Skeleton className="h-10 rounded-md w-10" />
                                </div>
                                <div className="p-2 border-t flex items-center justify-between">
                                    <Skeleton className="h-3.5 rounded-md md:w-36 w-1/2" />
                                    <Skeleton className="h-3.5 rounded-md w-4" />
                                </div>
                            </div>
                        </>
                    )}
                </div>
                {!loading && data.length == 0 && (
                    <div className="flex border-border border rounded-md items-center justify-center h-64">
                        <div className="grid place-items-center text-center">
                            <AlertTriangle className="h-6 w-6 mb-1" />
                            <h1 className="text-sm">No Passwords Found</h1>
                            <p className="text-xs text-muted-foreground">Add by clicking Add New on the setting button</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};