import { cookies } from "next/headers";

export async function serverFetch(endpoint: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    throw new Error("Auth token missing");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}${endpoint}`,
    {
      ...options,
      headers: {
        ...options.headers,
        Cookie: `session=${token}`,
      },
      credentials: "include",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`API error: ${res.statusText}`);
  }

  return res.json();
}
