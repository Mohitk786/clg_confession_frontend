import { cookies } from 'next/headers';
import { decrypt } from './session'; 

export const getAuthUser = async () => {
  try {
    const cookieStore = await cookies(); 
    const cookie =  cookieStore.get('clg_app_cookie')?.value;

    const session = await decrypt(cookie);
    if (!session) return null;

    return session.user;
  } catch (error) {
    console.error('Error decoding cookie:', error);
    return null;
  }
};
