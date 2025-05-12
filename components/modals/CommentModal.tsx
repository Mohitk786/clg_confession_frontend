"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { PostCardProps } from "../PostFeed/PostCard";
import {
  PostReactionIconsProps,
  PostReactionIcons,
} from "../PostFeed/ReactionIcons";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useComments, usePostComment } from "@/hooks/post";

interface CommentModalProps extends PostReactionIconsProps {
  post: PostCardProps;
  isOpen: boolean;
  onClose: () => void;
}

interface Comment {
  id: string;
  content: string;
  timestamp: string;
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
  const { toast } = useToast();
  const [commentText, setCommentText] = useState("");

  const { data, isLoading }: any = useComments(post._id);
 const {mutate: postComment} = usePostComment(post._id)

 const comments: Comment[] = data?.data || [];

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    postComment({postId: post._id, content:commentText})
    setCommentText("");
    toast({
      title: "Comment added",
      description: "Your comment has been added successfully.",
    });
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle className="hidden" />
      <DialogContent className="max-w-[90vw] h-[90vh] overflow-y-scroll custome-scrollbar md:overflow-hidden ">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Left side - Post */}
          <div className="bg-[#f9f7f1] border-r border-[#d4c8a8] flex flex-col col-span-2 max-h-[90vh] overflow-y-scroll custom-scrollbar">
            <div className="p-4 border-b border-[#d4c8a8] flex justify-between items-center">
              <h3 className="font-semibold text-[#2a2a2a]">
                {post.type === "confession" ? "Confession" : "News Post"}
              </h3>
            </div>
            <div className="p-4">
              {post?.imageUrl && (
                <Image
                  src={post.imageUrl}
                  alt="Post Image"
                 width={1000}
                  height={300}
                  className="object-contain  mb-4 rounded-md"
                />
              )}
              <p className="text-sm text-[#8a7e55] italic mb-2">
                {post.type === "confession"
                  ? "From: Anonymous"
                  : "Source: Anonymous"}
              </p>
              {post.title && (
                <h2 className="text-xl font-bold text-[#2a2a2a] mb-3">
                  {post.title}
                </h2>
              )}
              <p className="font-['Caveat'] text-lg leading-relaxed">
                {post.content}
              </p>
            </div>
          </div>

          {/* Right side - Comments */}
          <div className="bg-white flex flex-col h-full relative max-h-[90vh]">
            {/* Fixed Header */}
            <div className="sticky top-0 p-4 border-b border-gray-200 bg-white z-10">
              <h3 className="font-semibold text-[#2a2a2a]">Comments</h3>
            </div>

            {/* Scrollable Comments List */}
            <div className="flex-1 overflow-auto custom-scrollbar px-4 py-2">
              {!isLoading && comments.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <p>No comments yet</p>
                  <p className="text-sm">Be the first to comment</p>
                </div>
              ) : (
                !isLoading ? comments.map((comment: any) => (
                  <div
                    key={comment?._id}
                    className="p-3 hover:bg-gray-50 rounded-md flex items-start gap-3"
                  >
                    <Avatar className="h-8 w-8 rounded-full bg-[#c9b27c] flex items-center justify-center text-[#2a2a2a] font-medium">
                      <span>A</span>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 justify-between">
                        <div className="flex gap-2 items-center">
                          <span className="font-medium text-sm">Anonymous</span>
                          <span className="text-xs text-gray-500">
                            {comment?.timestamp}
                          </span>
                        </div>
                        <button className="text-gray-400 hover:text-red-500 transition">
                          ❤️
                        </button>
                      </div>
                      <p className="text-sm mt-1">{comment?.content}</p>
                    </div>
                  </div>
              )
                ):
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">Loading comments...</p>
                </div>
              )}
            </div>

            {/* Fixed Comment Input */}
            <div className="md:bottom-0 bg-white border-t border-gray-200 px-4 py-2 z-10">
              <div className="flex items-center gap-2 mb-2">
                <PostReactionIcons
                  isLiked={isLiked}
                  handleLikeClick={handleLikeClick}
                  likesCount={likesCount}
                  commentCount={commentCount}
                  setIsCommentModalOpen={setIsCommentModalOpen}
                />
              </div>
              <Separator />
              <form
                onSubmit={handleCommentSubmit}
                className="flex items-center gap-2 mt-2"
              >
                <Avatar className="h-8 w-8 rounded-full bg-[#f8dea1] flex items-center justify-center text-[#2a2a2a] font-medium">
                  <span>A</span>
                </Avatar>
                <Input
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 bg-gray-100 border-none"
                />
                <button
                  type="submit"
                  className="text-sm font-semibold text-[#e7b835] px-3 py-1"
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
  );
};
