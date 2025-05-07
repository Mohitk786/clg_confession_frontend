"use client";

import React, { useEffect, useState } from 'react';
import OnboardingPage from '@/components/onboarding/Index';
import ConfessionsPage from './confessions/page';

const Page = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      setToken(token);
    };

    checkToken();

   
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'token') {
        checkToken();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return token ? <ConfessionsPage /> : <OnboardingPage />;
};

export default Page;
