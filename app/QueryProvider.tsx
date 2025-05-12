"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/home/Footer";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-[#f5f2e8] bg-paper-texture">
        <Navbar />
      <main className="flex-grow container mx-auto  md:py-6 px-6">
        {children}
      </main>

      <Footer />
      </div>
    </QueryClientProvider>
  );
}

