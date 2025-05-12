
import React from "react";
import Index from "@/components/NewHome";
import { redirect } from "next/navigation";
import { getUserAuth } from "@/lib/auth";

export default async function HomePage() {
  const user = await getUserAuth();

  if(!user){
    redirect("/onboarding");
  }

  return  <Index user={user} /> ;
}
