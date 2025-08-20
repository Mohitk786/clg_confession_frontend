import { decrypt, SessionUser } from './session';
import User from '@/models/User';
import { cache } from "react";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers'
import { dbConnect } from './dbConnect';



export const verifySession = async (): Promise<{ isAuth: boolean; user: SessionUser | null }> => {
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);


    console.log("cookie", cookie);
    if (!session || !session?.user) {
      redirect("/login");
    }
    return { isAuth: true, user: session?.user as SessionUser };
};


export const getUser = cache(async () => {
    const session =  await verifySession();
    if (!session) return null;

    try{
      await dbConnect();
      const {user} = await User.findById(session?.user?.userId).select("-password");
      return user;
  
    }catch(error){
      console.error('Error decoding cookie:', error);
      return null;
    }
  })