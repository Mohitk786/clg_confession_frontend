"use client";

import React from "react";
import Layout from "@/components/new/Layout";
import Link from "next/link";

import NewConfessionForm from "@/components/new/NewConfessionForm";
import { PostCard } from "./PostFeed/PostCard";

export const confessions = [
  {
    id: 1,
    content:
      "I walked into my 8am lecture yesterday and realized I was still wearing my pajama pants. No one said anything but I'm pretty sure everyone noticed.",
    tags: ["funny"],
    votes: 126,
    comments: 24,
    createdAt: "2 hours ago",
  },
  {
    id: 2,
    content:
      "To the cute guy who always sits in the back row of our Computer Science class - I've been wanting to talk to you all semester but I'm too nervous. Maybe this will give me courage...",
    tags: ["love"],
    votes: 234,
    comments: 41,
    createdAt: "5 hours ago",
  },
  {
    id: 3,
    content:
      "The prices at the campus bookstore are ridiculous! I just spent $300 on textbooks that I'll probably use twice. Something needs to change.",
    tags: ["rant"],
    votes: 198,
    comments: 32,
    createdAt: "8 hours ago",
  },
  {
    id: 4,
    content:
      "Accidentally sent my professor an email that was meant for my friend complaining about his class. Looking for a new major now, suggestions welcome.",
    tags: ["funny"],
    votes: 310,
    comments: 52,
    createdAt: "11 hours ago",
  },
];

export const memes = [
  {
    id: 1,
    tags: ["funny"],
    content:
      "I walked into my 8am lecture yesterday and realized I was still wearing my pajama pants. No one said anything but I'm pretty sure everyone noticed. I walked into my 8am lecture yesterday and realized I was still wearing my pajama pants. No one said anything but I'm pretty sure everyone noticed.I walked into my 8am lecture yesterday and realized I was still wearing my pajama pants. No one said anything but I'm pretty sure everyone noticed. I walked into my 8am lecture yesterday and realized I was still wearing my pajama pants. No one said anything but I'm pretty sure everyone noticed.",
    imageUrl: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
    title: "Study session expectation vs. reality",
  },
  {
    id: 2,
    tags: ["funny"],
    content: "Akriti pakdi gayi cse 2 k londe ke sath",
    // imageUrl: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
    title: "News 2",
  },
];
const Index = () => {
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <NewConfessionForm />

          <div className="flex flex-col gap-2  mt-8">
            <h2 className="font-playfair text-2xl font-bold text-campus-navy mt-8">
              Latest Post
            </h2>

            <div className="flex flex-col gap-4">
              {memes.length === 0 ? (
                <p className="text-center py-8 text-campus-navy/50">
                  No trending memes found. Be the first to share one!
                </p>
              ) : (
                memes.map((meme) => (
                  <PostCard key={meme.id} {...meme} type="news" path="/" />
                ))
              )}
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
              confessions.map((confession) => (
                <PostCard
                  key={confession.id}
                  type="confession"
                  path="/"
                  {...confession}
                />
              ))
            )}

            <div className="flex justify-center">
              <Link
                href="/confessions"
                className="bg-[#c9b27c] hover:bg-[#b39c64] text-white font-medium px-4 py-2 rounded"
              >
                See More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
