"use client"

import type React from "react"

import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import Navbar from "@/components/Navbar"
import { usePathname } from "next/navigation"

const queryClient = new QueryClient()

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const isOnboardingPage =
    pathname === "/policy" ||
    pathname === "/verify" ||
    pathname === "/login" ||
    pathname === "/welcome" ||
    pathname === "/register" ||
    pathname === "/landing"

  return (
    <QueryClientProvider client={queryClient}>
      {isOnboardingPage ? (
        children
      ) : (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
          <Navbar />
          <main className="flex-grow">{children}</main>
         
        </div>
      )}
    </QueryClientProvider>
  )
}
