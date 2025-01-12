"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "./ui/button";

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <>
      <Button className="hidden dark:flex h-9 w-9" size="icon" variant="outline" onClick={() => setTheme("light")}><Sun className="h-4 w-4" /></Button>
      <Button className="dark:hidden flex h-9 w-9" size="icon" variant="outline" onClick={() => setTheme("dark")}><Moon className="h-4 w-4" /></Button>
    </>
  )
}
