"use client"

import { LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { signOut } from "next-auth/react"

interface LogoutButtonProps {
  className?: string
}

export function LogoutButton({ className }: LogoutButtonProps) {

    const handleLogout = async () => {
      console.log("logout")
      await signOut({ callbackUrl: "/login" }) 
    }

  return (
    <button
      onClick={handleLogout}
      className={cn("flex items-center text-red-500 hover:text-red-600 transition-colors cursor-pointer", className)}
    >
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
    </button>
  )
}
