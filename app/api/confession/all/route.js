import { NextResponse } from "next/server";
import { getPosts } from "@/actions/getPosts";

export async function GET() {
  const {confessions} = await getPosts(true); 
  return NextResponse.json(confessions);
}
