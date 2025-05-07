"use client";

import { Bell, Wallet } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useGetUser } from "@/hooks/auth";
import { useEffect } from "react";
    
const Navbar = () => {
 
 const pathname = usePathname();
    const isHomePage = pathname !== "/";
    const {data:user, isPending, isError} = useGetUser();

 
  return (
    <header className={`border-b border-[#c9b27c]/20 ${isHomePage ? 'bg-[#0a1f1c]/90' :'bg-[#f5f2e8]'  } backdrop-blur-sm sticky top-0 z-50`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href={'/'} className={`font-serif text-xl ${isHomePage ? 'text-[#c9b27c]': 'text-[#2a2a2a]'}`}>
            The Mystery Vault
          </Link >
          <button className={`${isHomePage ? 'text-[#c9b27c] hover:text-[#e8d9b5]': 'text-[#2a2a2a]'}  transition-colors`}>
            <Bell size={18} />
          </button>
        </div>

        <div className={`font-serif text-xl ${isHomePage ? 'text-[#c9b27c]': 'text-[#2a2a2a]'}`}>
          Ivy League University
        </div>

        <div className={`flex items-center gap-2 ${isHomePage ? 'text-[#c9b27c]': 'text-[#2a2a2a]'}`}>
          <Wallet size={18} />
          <span className="font-medium">{isPending ? "--": user?.sp} SP</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
