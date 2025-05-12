import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-[#f5f2e8] border-t border-[#d4c8a8] py-4 text-center">
      <p className="text-sm text-[#8a7e55]">
        &copy; {new Date().getFullYear()} ClgConfessions. All rights reserved.
      </p>
    </footer>
  );
}