"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { PostCard } from "@/components/PostFeed/PostCard";
import { ConfessionModal } from "@/components/modals/confession-modal";
import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";
import { NewsModal } from "../modals/NewsModal";
import { useConfessions } from "@/hooks/confessions";
import {useNews} from "@/hooks/news";

export type Post = {
  tags: string[];
  content: string;
  isMidnight?: boolean;
  unlockText?: string;
  imageUrl?: string;
};

interface PostFeedPageProps {
  type: "confession" | "news";
  title: string;
}

export default function PostFeedPage({
  type,
  title,
 
}: PostFeedPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isConfession = type === "confession";

  
  const {
    data: confessions,
    isLoading: confessionLoading,
    isError: confessionError,
  } = useConfessions({ enabled: isConfession });

  const {
    data: news,
    isLoading: newsLoading,
    isError: newsError,
  } = useNews({ enabled: !isConfession });


  const posts:any = isConfession
    ? confessions || []
    : news || [];

  const isLoading = isConfession ? confessionLoading : newsLoading;
  const isError = isConfession ? confessionError : newsError;

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Failed to load posts</p>;


  return (
    <div className="min-h-screen bg-[#f5f2e8] bg-[url('/paper-texture.png')] bg-repeat text-[#2a2a2a]">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="font-serif text-3xl text-[#2a2a2a] mb-8 text-center italic">
          {title}
        </h1>

        <div className="flex flex-col gap-4">
          {posts.map((post:any, i:number) => (
            <PostCard
              type={isConfession ? "confession" : "news"}
              key={i}
              title={post?.title}
              tags={post.tags}
              content={post.content}
              isMidnight={isConfession && post.isMidnight}
              unlockText={post.unlockText}
              imageUrl={!isConfession ? post.imageUrl : undefined}
            />
          ))}
        </div>
      </main>

      <div>
        {isConfession ? (
          <>
            <div className="fixed bottom-0 left-0 right-0 bg-[#2a2a2a] text-[#f5f2e8] py-2 text-center font-serif z-40">
              This week: "Flirty Friday" — Confess to your crush before
              midnight! 🔥
            </div>

            <div className="fixed bottom-20 right-6 z-50">
              <Button
                className="rounded-full w-14 h-14 bg-[#c9b27c] hover:bg-[#b39c64] text-[#2a2a2a] shadow-lg"
                onClick={() => setIsModalOpen(true)}
              >
                <PenSquare size={24} />
              </Button>
            </div>

            <ConfessionModal open={isModalOpen} onOpenChange={setIsModalOpen} />
          </>
        ) : (
          <>
            <div className="fixed bottom-20 right-6 z-50">
              <Button
                className="rounded-full w-14 h-14 bg-[#c9b27c] hover:bg-[#b39c64] text-[#2a2a2a] shadow-lg"
                onClick={() => setIsModalOpen(true)}
              >
                <PenSquare size={24} />
              </Button>
            </div>

            <NewsModal open={isModalOpen} onOpenChange={setIsModalOpen} />
          </>
        )}
      </div>
    </div>
  );
}
