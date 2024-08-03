"use client"

import * as React from "react"
import { ChevronDown, ChevronRight, Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex cursor-pointer select-none items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground w-full">
        Theme <ChevronRight className="h-4 w-4"/>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mr-16 -mt-2">
        <DropdownMenuItem className="flex items-center justify-between" onClick={() => setTheme("light")}>
          Light
          <Sun className="h-4 w-4" />
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center justify-between" onClick={() => setTheme("dark")}>
          Dark
          <Moon className="h-4 w-4" />
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center justify-between" onClick={() => setTheme("system")}>
          System
          <Monitor className="h-4 w-4"/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
