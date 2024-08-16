"use client";
import { Check, Eye, EyeOff, FileJson, Loader, Plus, Settings, Trash, User, X } from "lucide-react";
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
import changePassword from "@/server_functions/user/changePassword";
import deleteAccount from "@/server_functions/user/deleteAccount";
import createPassword from "@/server_functions/pwd/createPassword";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";


export default function ManageAccount() {
    const [mng, setMng] = useState(false);
    const [impr, setImpr] = useState(false);
    const [crntPwd, setCrntPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [loading, setLoading] = useState("");
    const [loadingd, setLoadingD] = useState(false);
    const reqMeets = /[A-Z]/.test(newPwd) && /[0-9]/.test(newPwd) && newPwd.length >= 8 && /[!@#$%^&*(){}[\]/?|`~,.;:]/.test(newPwd) ? true : false;
    const [isOpen, setIsOpen] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const [pwdt, setPwdt] = useState("password");
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

    const handleDeleteAccount = async () => {
        try {
            setLoadingD(true);
            const data = await deleteAccount({ currentUserEmail: currUser.data.user.email });
            if (JSON.parse(data).success) {
                toast.success("Account deleted successfully!");
                setMng(false);
                setLoadingD(false);
                return signOut({ callbackUrl: "/login" });
            };
            setLoadingD(false);
            return toast.error(JSON.parse(data).error);
        }
        catch (e) {
            setLoadingD(false);
            console.log(e);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        let name = e.target.name.value;
        let email = e.target.email.value;
        let password = e.target.password.value;
        if (!name || !email || !password) return toast.error(`Please enter ${!name ? "name!" : ""} ${!email ? "email or username!" : ""} ${!password ? "password!" : ""}`);
        try {
            setLoading3(true);
            const data = await createPassword({ currentUserEmail: currUser.data.user.email, name, email, password });
            if (JSON.parse(data).success) {
                setLoading3(false);
                e.target.reset();
                setIsOpen(false);
                toast.success("Password added successfully!")
                return setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
            setLoading3(false);
            toast.error(JSON.parse(data).error);
        }
        catch (e) {
            setLoading3(false);
            console.log(e);
        }
    }
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
                    <DropdownMenuItem className="justify-between" onClick={() => setIsOpen(true)}>Add New <Plus className="h-4 w-4" /></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialog open={mng}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-left relative">Manage your account <X onClick={() => setMng(false)} className="h-4 w-4 absolute -top-3 -right-3 cursor-pointer hover:opacity-85" /></AlertDialogTitle>
                        <AlertDialogDescription className="text-left">
                            Manage your account, change your password, or delete your account.
                            <Accordion type="single" collapsible>
                                <AccordionItem value="item-1">
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

                                <AccordionItem value="item-2">
                                    <AccordionTrigger className="text-primary">Delete your account</AccordionTrigger>
                                    <AccordionContent className="grid">
                                        Permanently delete your account, this action cannot be undone.
                                        <Popover>
                                            <PopoverTrigger className="text-left">
                                                <Button variant="outline" className="mt-2 gap-2 w-fit hover:text-red-400 border-red-400 text-red-400">Delete <Trash className="h-4 w-4" /></Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <p className="text-sm text-muted-foreground mb-2">Are you sure you want to permanently delete your account? <br /> This action cannot be undone.</p>
                                                <Button size="sm" onClick={handleDeleteAccount} disabled={loadingd}>{loadingd ? <Loader className="h-4 w-4 animate-spin" /> : 'Delete'}</Button>
                                            </PopoverContent>
                                        </Popover>
                                    </AccordionContent>
                                </AccordionItem>

                            </Accordion>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-left relative">Add new password <X onClick={() => setIsOpen(false)} className="h-4 w-4 absolute -top-3 -right-3 cursor-pointer hover:opacity-85" /></AlertDialogTitle>
                        <AlertDialogDescription className="text-left">
                            <p className="text-sm text-muted-foreground -mt-1">The email and password will be encrypted with higest encryption strength possible and cannot be decrypted by anyone except you.</p>
                            <form onSubmit={handleAdd} method="post" className="grid gap-2 mt-4">
                                <Label className="text-primary" htmlFor="name">Name</Label>
                                <Input name="name" type="text" id="name" autoComplete="off" placeholder="Google Account" className="w-full" />
                                <Label htmlFor="email" className="mt-1 text-primary">Email / Username</Label>
                                <Input name="email" type="text" id="email" autoComplete="off" placeholder="name@domain.com" className="w-full" />
                                <Label htmlFor="password" className="mt-1 text-primary">Password</Label>
                                <div className="flex items-center gap-3">
                                    <Input name="password" type={pwdt} id="password" autoComplete="off" placeholder="pass****" className="w-full" />
                                    <Button size="icon" variant="secondary" type="button" className="min-w-10" onClick={() => setPwdt(pwdt === "password" ? "text" : "password")}>{pwdt === "password" ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</Button>
                                </div>
                                <p className="text-xs max-w-md text-muted-foreground">No one can see your email & password even the coder itself, It will be encrypted with highest encryption strength possible!</p>
                                <Button type="submit" className="mt-2" disabled={loading3}>{loading3 ? <Loader className="w-4 h-4 animate-spin" /> : "Add Password"}</Button>
                            </form>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
};