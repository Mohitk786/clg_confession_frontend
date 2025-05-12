
import React from "react";
import dynamic from 'next/dynamic';
import { redirect } from "next/navigation";
import { getUserAuth } from "@/lib/auth";

const Index = dynamic(() => import('@/components/NewHome'))

export default async function HomePage() {
  const user = await getUserAuth();

  if(!user){
    redirect("/onboarding");
  }

  return  <Index user={user} /> ;
}
