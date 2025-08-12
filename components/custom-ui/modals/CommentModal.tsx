"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Avatar } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import type { PostCardProps } from "../../PostFeed/PostCard"
import { type PostReactionIconsProps, PostReactionIcons } from "../../PostFeed/ReactionIcons"
import { DialogTitle } from "@radix-ui/react-dialog"
import { useComments, usePostComment } from "@/hooks/post"

interface CommentModalProps extends PostReactionIconsProps {
  post: PostCardProps
  isOpen: boolean
  onClose: () => void
}

interface Comment {
  id: string
  content: string
  timestamp: string
}

export const CommentModal: React.FC<CommentModalProps> = ({
  post,
  isOpen,
  onClose,
  isLiked,
  handleLikeClick,
  likesCount,
  commentCount,
  setIsCommentModalOpen,
}) => {
  const { toast } = useToast()
  const [commentText, setCommentText] = useState("")

  const { data, isLoading }: any = useComments(post._id)
  const { mutate: postComment } = usePostComment(post._id)

  const comments: Comment[] = data?.data || []

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentText.trim()) return
    postComment({ postId: post._id, content: commentText })
    setCommentText("")
    toast({
      title: "Comment added",
      description: "Your comment has been added successfully.",
    })
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle className="hidden" />
      <DialogContent className="max-w-[95vw] h-[90vh] p-0 bg-white/95 backdrop-blur-xl border border-purple-200/50 shadow-2xl rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 h-full">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-r border-purple-200/50 flex flex-col col-span-2 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-purple-200/50 bg-white/80 backdrop-blur-sm">
              <h3 className="font-semibold text-gray-800 text-lg">
                {post.type === "confession" ? "Confession" : "News Post"}
              </h3>
            </div>
            <div className="p-6 space-y-4">
              {post?.image && (
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt="Post Image"
                  width={1000}
                  height={300}
                  className="object-contain mb-4 rounded-xl shadow-md"
                />
              )}
              <p className="text-sm text-purple-600 italic">
                {post.type === "confession" ? "From: Anonymous" : "Source: Anonymous"}
              </p>
              {post.title && (
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {post.title}
                </h2>
              )}
              <p className="text-gray-700 leading-relaxed text-lg">{post.content}</p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm flex flex-col h-full relative max-h-[90vh]">
            <div className="sticky top-0 p-4 border-b border-purple-200/50 bg-white/95 backdrop-blur-sm z-10">
              <h3 className="font-semibold text-gray-800">Comments</h3>
            </div>

            <div className="flex-1 overflow-auto px-4 py-2">
              {!isLoading && comments.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-gray-500 h-full">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-2xl">💬</span>
                    </div>
                    <p className="font-medium">No comments yet</p>
                    <p className="text-sm">Be the first to comment</p>
                  </div>
                </div>
              ) : !isLoading ? (
                comments.map((comment: any) => (
                  <div
                    key={comment?._id}
                    className="p-3 hover:bg-purple-50/50 rounded-lg transition-colors flex items-start gap-3"
                  >
                    <Avatar className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-medium">
                      <span>A</span>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 justify-between">
                        <div className="flex gap-2 items-center">
                          <span className="font-medium text-sm text-gray-800">Anonymous</span>
                          <span className="text-xs text-gray-500">{comment?.timestamp}</span>
                        </div>
                        <button className="text-gray-400 hover:text-pink-500 transition-colors">❤️</button>
                      </div>
                      <p className="text-sm mt-1 text-gray-700">{comment?.content}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center space-y-2">
                    <div className="w-8 h-8 border-2 border-purple-300 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
                    <p className="text-gray-500 text-sm">Loading comments...</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white/95 backdrop-blur-sm border-t border-purple-200/50 px-4 py-3 z-10">
              <div className="flex items-center gap-2 mb-3">
                <PostReactionIcons
                  isLiked={isLiked}
                  handleLikeClick={handleLikeClick}
                  likesCount={likesCount}
                  commentCount={commentCount}
                  setIsCommentModalOpen={setIsCommentModalOpen}
                />
              </div>
              <Separator className="bg-purple-200/50" />
              <form onSubmit={handleCommentSubmit} className="flex items-center gap-2 mt-3">
                <Avatar className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-purple-600 font-medium">
                  <span>A</span>
                </Avatar>
                <Input
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 bg-purple-50/50 border-purple-200 focus:border-purple-400 rounded-full"
                />
                <button
                  type="submit"
                  className="text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50"
                  disabled={!commentText.trim()}
                >
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
