import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
  }

  export interface SessionUser {
    name: string;
    userId: string;
    profileCompleted: boolean;
    college: string;
    gender?: string;
  }
  
  interface Session {
    user: SessionUser;
    expiresAt: string;
  }

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}



export async function createSession(user: SessionUser) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({
    user: {
      ...user,
      userId: user.userId.toString(),
    },
    expiresAt,
  });
  const cookieStore = await cookies()
 
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'strict',
    path: '/',
  })
}