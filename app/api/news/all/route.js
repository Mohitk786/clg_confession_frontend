import { NextResponse } from "next/server";
import { getPosts } from "@/actions/getPosts";

export async function GET(req) {
  const {news, hasMore} = await getPosts(req, false); 
  return NextResponse.json({news, hasMore});
}
