import { NextResponse } from "next/server";
import { getPosts } from "@/actions/getPosts";

export async function GET(req) {
  const {confessions, hasMore} = await getPosts(req, true); 
  return NextResponse.json({confessions, hasMore});
}
