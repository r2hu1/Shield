"use client";
import { Settings, ShieldHalf, User } from "lucide-react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { ModeToggle } from "./ThemeSwitcher";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
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

export default function Header() {
    const[mng,setMng] = useState(false);
    return (
        <header className="px-6 border-b border-border py-4 flex items-center justify-between md:mx-20 lg:mx-32">
            <ShieldHalf className="h-6 w-6" />
            <div className="flex items-center gap-2">
                <Button onClick={() => signOut({ callbackUrl: '/login' })}>Logout</Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="outline"><Settings className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-6 mt-1 md:mr-20">
                        <DropdownMenuItem onClick={() => setMng(true)} className="flex items-center justify-between">Account <User className="h-4 w-4" /></DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild><ModeToggle /></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <AlertDialog open={mng}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Manage your account</AlertDialogTitle>
                            <AlertDialogDescription className="text-left">
                                <Accordion type="single" collapsible>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger className="text-primary">Manage saved passwords</AccordionTrigger>
                                        <AccordionContent>
                                            Delete your saved passwords or export them as json.
                                            <div className="flex items-center gap-2 mt-2">
                                                <Button>Export</Button>
                                                <Button variant="outline">Delete all</Button>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-2">
                                        <AccordionTrigger className="text-primary">Change your account password</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="grid gap-2 mt-2 px-1">
                                                <Label htmlFor="current-password">Current password</Label>
                                                <Input placeholder="Current password" type="password" id="current-password" />
                                                <Label htmlFor="new-password">New password</Label>
                                                <Input placeholder="New password" type="password" id="new-password" />
                                                <Button className="mt-2">Change</Button>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                                <Button className="w-full mt-5" onClick={() => setMng(false)}>Close</Button>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </header>
    )
}