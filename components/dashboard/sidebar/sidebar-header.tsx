"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarTrigger } from "@/components/ui/sidebar";
import { Plus, Sun, Moon, Bell } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggle from "@/components/global/theme-toggle";
import UserMenu from "./user-menu";

export default function SidebarHeader() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { setTheme, theme } = useTheme();

  // State to track whether the component has mounted
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after the component has mounted on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent SSR hydration mismatch by not rendering theme-related content until after mount
  if (!mounted) {
    return null; // Wait for client-side rendering to avoid SSR mismatch
  }

  return (
    <div className="flex h-16 items-center gap-4 border-b px-4">
      <SidebarTrigger />
      <div className="flex-1">
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="border-1 pl-4 dark:border-gray-800">
        <ThemeToggle/>
      </div>
      {/* <Button variant="outline" size="icon">
        <Bell className="h-5 w-5" />
        <span className="sr-only">Add new</span>
      </Button> */}
      <SidebarFooter>
     <SidebarMenu>
       <SidebarMenuItem>
         <UserMenu/>
       </SidebarMenuItem>
     </SidebarMenu>
   </SidebarFooter>
    </div>
  );
}
