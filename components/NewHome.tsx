
import React from "react";
import Link from "next/link";

import NewConfessionForm from "@/components/new/NewConfessionForm";
import { PostCard } from "./PostFeed/PostCard";
import {getDashboardData} from "@/actions/getDashboardData"
import { getUserAuth } from "@/lib/auth";


interface Confession {
  _id: string;
  content: string;
  tags: string[];
  likeCount?: number;
  commentCount?: number;
  likesCount?: number;
  reactionCount?: number;
}

const Index = async ({user}:any) => {
 
  if (!user) {
    return <div className="text-center py-8 text-campus-navy/50">Loading...</div>;
  }

  const { confessions=[], news=[] }:{confessions:Confession[], news:any} = await getDashboardData();

 

  return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <NewConfessionForm />

          <div className="flex flex-col gap-2  mt-8">
            <h2 className="font-playfair text-2xl font-bold text-campus-navy mt-8">
              Latest Post
            </h2>

            <div className="flex flex-col gap-4">
              {news.length === 0 ? (
                <p className="text-center py-8 text-campus-navy/50">
                  No trending news found. Be the first to share one!
                </p>
              ) : (
                news.map((data:any) => (
                  <PostCard key={data?._id} {...data} type="news" path="/" />
                ))
              )}

          <div className="flex justify-center mb-4 md:mb-0">
              <Link
                href="/campus-corner"
                className="bg-[#c9b27c] hover:bg-[#b39c64] text-white font-medium px-4 py-2 rounded"
              >
                See what happening in Campus
              </Link>
            </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="lg:col-span-2 flex flex-col">
          <h2 className="font-playfair text-2xl font-bold text-campus-navy">
            Latest Confessions
          </h2>
          <div className="flex flex-col gap-4">
            {confessions.length === 0 ? (
              <p className="text-center py-8 text-campus-navy/50">
                No confessions found. Be the first to share one!
              </p>
            ) : (
              confessions.map((confession:any) => (
                <PostCard
                  key={confession._id}
                  type="confession"
                  path="/"
                  {...confession}
                />
              ))
            )}

            <div className="flex justify-center mb-4 md:mb-0">
              <Link
                href="/confessions"
                className="bg-[#c9b27c] hover:bg-[#b39c64] text-white font-medium px-4 py-2 rounded"
              >
                View All Confessions
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Index;
