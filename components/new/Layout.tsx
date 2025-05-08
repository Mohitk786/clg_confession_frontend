import React, { ReactNode } from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-campus-cream bg-paper-texture">
      <header className="border-b border-campus-gold/30">
        <div className="container mx-auto py-4 px-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <h1 className="text-2xl md:text-3xl font-playfair font-bold text-campus-navy">
                Campus <span className="italic text-campus-forest">Whispers</span>
              </h1>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 font-medium text-campus-navy/80">
              <Link href="/" className="hover:text-campus-gold transition-colors">Feed</Link>
              <Link href="/" className="hover:text-campus-gold transition-colors">Memes</Link>
              <Link href="/" className="hover:text-campus-gold transition-colors">Leaderboard</Link>
            </nav>
            <button className="px-4 py-2 rounded-md bg-campus-forest text-white font-medium text-sm hover:bg-campus-forest/90 transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto py-8 px-6">
        {children}
      </main>
      
      <footer className="border-t border-campus-gold/30 bg-campus-cream mt-auto">
        <div className="container mx-auto py-6 px-6">
          <div className="text-center text-sm text-campus-navy/60">
            <p>&copy; {new Date().getFullYear()} Campus Whispers • Your University's Anonymous Voice</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;