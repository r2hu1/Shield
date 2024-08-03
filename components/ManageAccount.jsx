"use client";
import { Check, FileJson, Loader, Settings, User, X } from "lucide-react";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import { ModeToggle } from "./ThemeSwitcher";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { toast } from "sonner";
import changePassword from "@/server_functions/changePassword";

export default function ManageAccount() {
    const [mng, setMng] = useState(false);
    const [impr, setImpr] = useState(false);
    const [crntPwd, setCrntPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [loading, setLoading] = useState("");
    const reqMeets = /[A-Z]/.test(newPwd) && /[0-9]/.test(newPwd) && newPwd.length >= 8 && /[!@#$%^&*(){}[\]/?|`~,.;:]/.test(newPwd) ? true : false;
    const currUser = useSession();

    const handleChangePassword = async () => {
        if (!crntPwd || !newPwd) return toast.error(`Please enter ${!crntPwd ? "your current" : "new"} password!`);
        try {
            setLoading(true);
            const data = await changePassword({
                currentUserEmail: currUser.data.user.email,
                currentPassword: crntPwd,
                newPassword: newPwd
            })
            if (JSON.parse(data).success) {
                toast.success("Password changed successfully, login with your new password to continue!");
                setMng(false);
                setLoading(false);
                return signOut({ callbackUrl: "/login" });
            };
            setLoading(false);
            return toast.error(JSON.parse(data).error);
        }
        catch (e) {
            setLoading(false);
            console.log(e);
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="outline"><Settings className="h-4 w-4" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mr-6 mt-1 md:mr-20">
                    <DropdownMenuItem onClick={() => setMng(true)} className="justify-between">Account <User className="h-4 w-4" /></DropdownMenuItem>
                    <DropdownMenuItem asChild><ModeToggle /></DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="justify-between" onClick={() => setImpr(true)}>Import <FileJson className="h-4 w-4" /></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialog open={mng}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-left relative">Manage your account <X onClick={() => setMng(false)} className="h-4 w-4 absolute -top-3 -right-3 cursor-pointer hover:opacity-85" /></AlertDialogTitle>
                        <AlertDialogDescription className="text-left">
                            Manage your saved passwords, change your password, or delete your account.
                            <Accordion type="single" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="text-primary">Saved passwords</AccordionTrigger>
                                    <AccordionContent>
                                        Delete your saved passwords or export them as json.
                                        <div className="flex items-center gap-2 mt-2">
                                            <Button>Export</Button>
                                            <Button variant="outline">Delete all</Button>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="item-2">
                                    <AccordionTrigger className="text-primary">Change your account's password</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="grid gap-2 mt-2 px-1">
                                            <Label htmlFor="current-password">Current password</Label>
                                            <Input value={crntPwd} onChange={(e) => setCrntPwd(e.target.value)} placeholder="Current password" type="password" id="current-password" />
                                            <Label htmlFor="new-password">New password</Label>
                                            <Input value={newPwd} onChange={(e) => setNewPwd(e.target.value)} placeholder="New password" type="password" id="new-password" />
                                            {!reqMeets && newPwd.length >= 1 ? (
                                                <div className="mt-2 rounded-md border border-border p-3">
                                                    <ul className="list-none grid gap-2">
                                                        <li className="flex items-center gap-3">
                                                            {!/[A-Z]/.test(newPwd) ? <X className="h-3.5 w-3.5 text-red-400" /> : <Check className="h-3.5 w-3.5 text-green-400" />}
                                                            <p className="text-xs opacity-75">Contains atleast one Uppercase Alphabet</p>
                                                        </li>
                                                        <li className="flex items-center gap-3">
                                                            {!/[0-9]/.test(newPwd) ? <X className="h-3.5 w-3.5 text-red-400" /> : <Check className="h-3.5 w-3.5 text-green-400" />}
                                                            <p className="text-xs opacity-75">Contains atleast one Digit</p>
                                                        </li>
                                                        <li className="flex items-center gap-3">
                                                            {!/[!@#$%^&*(){}[\]/?|`~,.;:]/.test(newPwd) ? <X className="h-3.5 w-3.5 text-red-400" /> : <Check className="h-3.5 w-3.5 text-green-400" />}
                                                            <p className="text-xs opacity-75">Contains atleast one Symbol</p>
                                                        </li>
                                                        <li className="flex items-center gap-3">
                                                            {newPwd.length < 8 ? <X className="h-3.5 w-3.5 text-red-400" /> : <Check className="h-3.5 w-3.5 text-green-400" />}
                                                            <p className="text-xs opacity-75">Length must be 8 or greater</p>
                                                        </li>
                                                    </ul>
                                                </div>
                                            ) : null}
                                            <Button onClick={handleChangePassword} className="mt-2" disabled={loading || !reqMeets}>{loading ? <Loader className="h-4 w-4 animate-spin" /> : 'Save'}</Button>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="item-3">
                                    <AccordionTrigger className="text-primary">Delete your account</AccordionTrigger>
                                    <AccordionContent>
                                        Permanently delete your account, this action cannot be undone.
                                        <Button variant="outline" className="mt-2 border-red-400 text-red-400">Delete</Button>
                                    </AccordionContent>
                                </AccordionItem>

                            </Accordion>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={impr}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-left relative">Import passwords <X onClick={() => setImpr(false)} className="h-4 w-4 absolute -top-3 -right-3 cursor-pointer hover:opacity-85" /></AlertDialogTitle>
                        <AlertDialogDescription className="text-left">
                            Import passwords from your or your friends encrypted json.

                            <div className="mt-5 grid gap-3">
                                <Input type="file" accept=".json"/>
                                <Button>Import</Button>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
};