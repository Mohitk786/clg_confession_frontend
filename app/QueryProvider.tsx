"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/home/Footer";
import { usePathname } from "next/navigation";

const queryClient = new QueryClient();

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isOnboardingPage =
    pathname === "/policy" ||
    pathname === "/verify" ||
    pathname === "/login" ||
    pathname === "/welcome" ||
    pathname === "/register" ||
    pathname === "/landing";

  return (
    <QueryClientProvider client={queryClient}>
      {isOnboardingPage ? (
        children
      ) : (
        <div className="min-h-screen flex flex-col bg-[#f5f2e8] bg-paper-texture">
          <Navbar />
          <main className="flex-grow container mx-auto md:py-6 px-6">
            {children}
          </main>
          <Footer />
        </div>
      )}
    </QueryClientProvider>
  );
}
