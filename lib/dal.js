import { decrypt } from './session';
import User from '@/models/User';
import { cache } from "react";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers'

export const verifySession = cache(async () => {
    const cookie = (await cookies()).get("clg_app_cookie")?.value;
    const session = await decrypt(cookie);
  
    if (!session || !session?.user) {
      redirect("/onboarding");
    }
  
    return { isAuth: true, user: session.user };
  });


export async function getUser() {
  
    const session =  await verifySession();
    if (!session) return null;

    try{
      const user = await User.findById(session?.user?.userId).select("-password");
      return user;
  
    }catch(error){
      console.error('Error decoding cookie:', error);
      return null;
    }
  }