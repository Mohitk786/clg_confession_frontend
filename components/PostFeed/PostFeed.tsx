"use client"

import { useEffect, useRef, useState } from "react"
import { PostCard } from "@/components/PostFeed/PostCard"
import { ConfessionModal } from "@/components/custom-ui/modals/confession-modal"
import { Button } from "@/components/ui/button"
import { PenSquare } from "lucide-react"
import { NewsModal } from "../custom-ui/modals/NewsModal"
import { useConfessions } from "@/hooks/confessions"
import { useNews } from "@/hooks/news"
import { ShimmerCard } from "../ui/shimmer-card"
import { motion } from "framer-motion"

export type Post = {
  tags: string[]
  content: string
  image?: string
}

interface PostFeedPageProps {
  type: "confession" | "news"
  title: string
}

export default function PostFeedPage({ type, title }: PostFeedPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isConfession = type === "confession"

  const confessionQuery = useConfessions({ enabled: isConfession })
  const newsQuery = useNews({ enabled: !isConfession })

  const postsData =
    (isConfession
      ? confessionQuery.data?.pages.flatMap((page: any) => page?.confessions)
      : newsQuery.data?.pages.flatMap((page: any) => page?.news)) || []

  const isLoading = isConfession ? confessionQuery.isLoading : newsQuery.isLoading

  const isError = isConfession ? confessionQuery.isError : newsQuery.isError

  const fetchNextPage = isConfession ? confessionQuery.fetchNextPage : newsQuery.fetchNextPage

  const isFetchingNextPage = isConfession ? confessionQuery.isFetchingNextPage : newsQuery.isFetchingNextPage

  const loadMoreRef = useRef(null)

  useEffect(() => {
    if (!loadMoreRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage()
      },
      { threshold: 1 },
    )
    observer.observe(loadMoreRef.current)
    return () => observer.disconnect()
  }, [loadMoreRef.current, fetchNextPage])


  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              {title}
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto"></div>
          </div>

          <div className="flex flex-col gap-6">
            {!isLoading ? (
              postsData.length > 0 ? (
                postsData.map((post: any, i: number) => (
                  <motion.div
                    key={post?._id || i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  >
                    <PostCard
                      _id={post?._id}
                      likesCount={post?.likesCount || 0}
                      commentsCount={post?.commentsCount || 0}
                      type={isConfession ? "confession" : "news"}
                      isLiked={post?.isLiked}
                      title={post?.title}
                      createdBy={post?.createdBy}
                      tags={post?.tags}
                      content={post?.content}
                      image={!isConfession ? post?.image : undefined}
                      hasTargetUser={post?.hasTargetUser ? post?.hasTargetUser : undefined}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-purple-200/50">
                    <p className="text-gray-600 font-medium text-lg">
                      {isConfession ? "No confessions found." : "No news found."}
                    </p>
                    <p className="text-purple-600/70 text-sm mt-2">Be the first to share something!</p>
                  </div>
                </motion.div>
              )
            ) : (
              new Array(3).fill(null).map((_, i) => <ShimmerCard key={i} />)
            )}

            {isFetchingNextPage && new Array(3).fill(null).map((_, i) => <ShimmerCard key={`shimmer-${i}`} />)}

            <div ref={loadMoreRef} className="h-10" />
          </div>
        </div>
      </main>

      <div>
        {isConfession ? (
          <>
            <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 text-center font-medium z-40 shadow-lg">
              <p className="text-sm">This week: "Flirty Friday" — Confess to your crush before midnight! 🔥</p>
            </div>

            <div className="fixed bottom-20 right-6 z-50">
              <Button
                className="rounded-full w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                onClick={() => setIsModalOpen(true)}
              >
                <PenSquare size={24} />
              </Button>
            </div>

            <ConfessionModal open={isModalOpen} onOpenChange={setIsModalOpen} />
          </>
        ) : (
          <>
            <div className="fixed bottom-6 right-6 z-50">
              <Button
                className="rounded-full w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
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
  )
}
