"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react"
import Link from "next/link";

export function Header() {
  return (
    <header className=" max-w-3xl m-auto top-2 shadow-lg  w-full flex items-center justify-between p-2 rounded-lg">
        <div className="w-15 h-10 flex justify-center items-center border border-orange-500 text-orange-500 bg-gray-900 rounded">Admin</div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-10 h-10 p-0 rounded-full">
                <Avatar>
                    <AvatarFallback>T</AvatarFallback>
                </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" bg-white dark:bg-gray-800 shadow-lg rounded-md p-1">
                <DropdownMenuItem asChild>
                    <Link href="/">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/dashboard">Painel</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </header>
  );
}
