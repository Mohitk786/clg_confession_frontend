"use client"

import type React from "react"
import { useState } from "react"
import { Heart, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CommentModal } from "../custom-ui/modals/CommentModal"
import type { PostCardProps } from "./PostCard"
import { useLikePost } from "@/hooks/post"

interface ReactionIconsProps {
  post: PostCardProps
}

export const ReactionIcons: React.FC<ReactionIconsProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post?.isLiked)
  const [likes, setLikes] = useState(post?.likesCount)
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)
  const { mutate: likePost } = useLikePost()

  const handleLikeClick = () => {
    likePost(
      { postId: post._id, postType: post.type },
      {
        onSuccess: ({ data }: any) => {
          setIsLiked(data.isLiked)
          setLikes(data.likesCount)
        },

        onError: (error) => {
          console.error(error)
          setIsLiked((prev) => {
            const next = !prev
            setLikes((prevLikes) => prevLikes + (next ? 1 : -1))
            return next
          })
        },
      },
    )
  }

  return (
    <div className="flex items-center gap-4">
      <PostReactionIcons
        isLiked={isLiked}
        handleLikeClick={handleLikeClick}
        commentCount={post.commentsCount}
        setIsCommentModalOpen={setIsCommentModalOpen}
        likesCount={likes}
      />

      {isCommentModalOpen && (
        <CommentModal
          isLiked={isLiked}
          handleLikeClick={handleLikeClick}
          likesCount={likes}
          commentCount={post.commentsCount}
          setIsCommentModalOpen={setIsCommentModalOpen}
          post={post}
          isOpen={isCommentModalOpen}
          onClose={() => setIsCommentModalOpen(false)}
        />
      )}
    </div>
  )
}

const emojis = ["💋", "😍", "🔥", "😢", "😈", "🥺", "🖤", "💔", "😱", "😏"]

export const EmojiBar: React.FC = () => (
  <div className="flex flex-wrap gap-2">
    {emojis.map((icon, i) => (
      <Button
        key={i}
        variant="outline"
        size="sm"
        className="rounded-full bg-white/50 border-purple-200/50 hover:bg-purple-100/50 hover:border-purple-300/50 transition-all duration-200 text-base"
      >
        {icon}
      </Button>
    ))}
  </div>
)

export interface PostReactionIconsProps {
  isLiked: boolean
  handleLikeClick: () => void
  likesCount: number
  commentCount: number
  setIsCommentModalOpen: (isOpen: boolean) => void
}

export const PostReactionIcons = ({
  isLiked,
  likesCount,
  handleLikeClick,
  commentCount,
  setIsCommentModalOpen,
}: PostReactionIconsProps) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full hover:bg-purple-100/50 transition-all duration-200"
          onClick={handleLikeClick}
        >
          <Heart
            className={`h-5 w-5 transition-all duration-200 ${
              isLiked ? "fill-red-500 text-red-500 scale-110" : "text-gray-600 hover:text-red-400"
            }`}
          />
        </Button>
        <span className="text-sm font-medium text-gray-700">{likesCount}</span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full hover:bg-purple-100/50 transition-all duration-200"
          onClick={() => setIsCommentModalOpen(true)}
        >
          <MessageSquare className="h-5 w-5 text-gray-600 hover:text-purple-600 transition-colors duration-200" />
        </Button>
        <span className="text-sm font-medium text-gray-700">{commentCount}</span>
      </div>
    </>
  )
}
