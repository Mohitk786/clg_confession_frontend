import { NextResponse } from "next/server";
import { getPosts } from "@/actions/getPosts";

export async function GET() {
  const {news} = await getPosts(false); 
  return NextResponse.json(news);
}
