import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
 const { setTheme, theme } = useTheme();
  return (
   <DropdownMenu>
   <DropdownMenuTrigger asChild>
     <Button variant="outline" size="icon">
       {/* Conditionally render based on theme */}
       <Sun
         className={`h-[1.2rem] w-[1.2rem] transition-all ${
           theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"
         }`}
       />
       <Moon
         className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
           theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"
         }`}
       />
       <span className="sr-only">Toggle theme</span>
     </Button>
   </DropdownMenuTrigger>
   <DropdownMenuContent align="end">
     <DropdownMenuItem onClick={() => setTheme("light")}>
       Light
     </DropdownMenuItem>
     <DropdownMenuItem onClick={() => setTheme("dark")}>
       Dark
     </DropdownMenuItem>
     <DropdownMenuItem onClick={() => setTheme("system")}>
       System
     </DropdownMenuItem>
   </DropdownMenuContent>
 </DropdownMenu>
  )
}
