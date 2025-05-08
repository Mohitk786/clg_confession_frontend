import React, { ReactNode } from 'react';
import Navbar from '../Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f2e8] bg-paper-texture">
      <Navbar/>
      
      <main className="flex-grow container mx-auto py-8 px-6">
        {children}
      </main>
      
      <footer className="border-t border-campus-gold/30 bg-[#f5f2e8] mt-auto">
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