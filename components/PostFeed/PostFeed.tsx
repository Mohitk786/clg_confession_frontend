"use client";

import { useEffect, useRef, useState } from "react";
import { PostCard } from "@/components/PostFeed/PostCard";
import { ConfessionModal } from "@/components/modals/confession-modal";
import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";
import { NewsModal } from "../modals/NewsModal";
import { useConfessions } from "@/hooks/confessions";
import { useNews } from "@/hooks/news";
import { ShimmerCard } from "../ui/shimmer-card";
import { motion } from "framer-motion";

export type Post = {
  tags: string[];
  content: string;
  isMidnight?: boolean;
  unlockText?: string;
  image?: string;
};

interface PostFeedPageProps {
  type: "confession" | "news";
  title: string;
}

export default function PostFeedPage({ type, title }: PostFeedPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isConfession = type === "confession";

  const confessionQuery = useConfessions({ enabled: isConfession });
  const newsQuery = useNews({ enabled: !isConfession });

  const postsData =
    (isConfession
      ? confessionQuery.data?.pages.flatMap((page: any) => page?.confessions)
      : newsQuery.data?.pages.flatMap((page: any) => page?.news)) || [];

  const isLoading = isConfession
    ? confessionQuery.isLoading
    : newsQuery.isLoading;

  const isError = isConfession ? confessionQuery.isError : newsQuery.isError;

  const fetchNextPage = isConfession
    ? confessionQuery.fetchNextPage
    : newsQuery.fetchNextPage;

  const isFetchingNextPage = isConfession
    ? confessionQuery.isFetchingNextPage
    : newsQuery.isFetchingNextPage;

  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (!loadMoreRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { threshold: 1 }
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [loadMoreRef.current, fetchNextPage]);

  return (
    <>
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="font-serif text-3xl text-[#2a2a2a] mb-8 text-center italic">
          {title}
        </h1>

        <div className="flex flex-col gap-4">
          {!isLoading ? (
            postsData.length > 0 ? (
              postsData.map((post: any, i: number) => (
                <motion.div
                  key={post?._id || i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <PostCard
                    _id={post?._id}
                    likesCount={post?.likesCount || 0}
                    commentsCount={post?.commentsCount || 0}
                    type={isConfession ? "confession" : "news"}
                    isLiked={post?.isLiked}
                    title={post?.title}
                    tags={post?.tags}
                    content={post?.content}
                    isMidnight={isConfession && post?.isMidnight}
                    unlockText={post?.unlockText}
                    image={!isConfession ? post?.image : undefined}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-500 font-medium py-12 italic"
              >
                {isConfession ? "No confessions found." : "No news found."}
              </motion.div>
            )
          ) : (
            new Array(3).fill(null).map((_, i) => <ShimmerCard key={i} />)
          )}

          {isFetchingNextPage &&
            new Array(3)
              .fill(null)
              .map((_, i) => <ShimmerCard key={`shimmer-${i}`} />)}

          <div ref={loadMoreRef} className="h-10" />
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
    </>
  );
}
