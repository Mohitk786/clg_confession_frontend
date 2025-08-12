"use client"

import { LogOut } from "lucide-react"
import { logout } from "@/actions/auth"
import { cn } from "@/lib/utils"

interface LogoutButtonProps {
  className?: string
}

export function LogoutButton({ className }: LogoutButtonProps) {
  return (
    <button
      onClick={() => logout()}
      className={cn("flex items-center text-red-500 hover:text-red-600 transition-colors cursor-pointer", className)}
    >
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
    </button>
  )
}
