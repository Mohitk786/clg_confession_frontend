import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";


const JWT_SECRET = process.env.JWT_SECRET;


export const getAuthUser = async (req) => {
  try {
    const token = await req.cookies.get('clg_app_cookie')?.value;

    if (!token) return null;

    const decoded = await jwt.verify(token, JWT_SECRET) ;

    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};



export async function getUserAuth() {
  const cookieStore = cookies();
  const token = await cookieStore.get("clg_app_cookie")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; 
  } catch (error) {
    return null;
  }
}

