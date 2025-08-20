import User from '@/models/User';
import { cache } from "react";
import { dbConnect } from './dbConnect';
import { auth } from '@/auth';


export const getUser = cache(async () => {
    const session =  await auth();
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