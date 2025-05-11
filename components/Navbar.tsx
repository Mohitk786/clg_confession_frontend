"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/hooks/auth";

const Navbar = () => {
  const path = usePathname();
  const {data:{data:user} }:any = useUser();

  console.log("user", user);
  
 
  return (
    <header className="border-b border-campus-gold/30">
      <div className="container mx-auto py-4 px-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <h1 className="text-2xl md:text-3xl font-playfair font-bold text-campus-navy">
              Campus <span className="italic text-campus-forest">Whispers</span>
            </h1>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 font-medium text-campus-navy/80">
           <Link href="/"  className={`${path==='/'?'text-campus-gold':''} hover:text-campus-gold transition-colors`}>
              Home
            </Link>
            <Link href="/confessions"  className={`${path==='/confessions'?'text-campus-gold':''} hover:text-campus-gold transition-colors`}>
              Confessions
            </Link>
            <Link
              href="/campus-corner"
              className={`${path==='/campus-corner'?'text-campus-gold':''} hover:text-campus-gold transition-colors`}
            >
              Campus Corner
            </Link>
            {/* <Link href="/" className="hover:text-campus-gold transition-colors">
              Leaderboard
            </Link> */}
          </nav>
          <p className="font-bold font-mono text-campus-forest  hover:bg-campus-forest/90 transition-colors">
            {user?.college || "Your University"}
          </p>
          {/* <p className="font-bold text-red-500  hover:bg-campus-forest/90 transition-colors">
            {user?.sp || "--"}SP
          </p> */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
