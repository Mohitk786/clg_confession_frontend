import { cookies } from 'next/headers';
import { decrypt } from './session'; 

export const getAuthUser = async () => {
  try {
    const cookieStore = await cookies(); 
    const cookie =  cookieStore.get('session')?.value;

    const session = await decrypt(cookie);
    if (!session) return null;

    return session.user;
  } catch (error) {
    console.error('Error decoding cookie:', error);
    return null;
  }
};



export function generateToken(length = 32) {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, b => b.toString(16).padStart(2, "0")).join("");
}
