"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Menu, Bell } from "lucide-react"
import { LogoutButton } from "./logout-button"

interface MobileNavProps {
  user: {
    name: string
    college: string
    sp: number
  }
  navigationLinks: readonly { href: string; label: string }[]
}

export function MobileNav({ user, navigationLinks }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-campus-navy">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle className="text-2xl font-playfair font-bold text-campus-navy text-left">
            Campus <span className="italic text-campus-forest">Whispers</span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* User Info */}
          <div className="py-4">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium text-campus-navy">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.college}</p>
              <p className="text-xs font-semibold text-campus-gold">{user.sp} SP Points</p>
            </div>
          </div>

          <Separator />

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-4 py-6">
            {navigationLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`text-base font-medium transition-colors ${
                  pathname === href ? "text-campus-gold" : "text-campus-navy/80 hover:text-campus-gold"
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/notifications"
              onClick={() => setIsOpen(false)}
              className="flex items-center text-base font-medium text-campus-navy/80 hover:text-campus-gold transition-colors"
            >
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Link>
          </nav>

          {/* Logout Button */}
          <div className="mt-auto pb-4">
            <Separator className="mb-4" />
            <LogoutButton className="w-full justify-center" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
