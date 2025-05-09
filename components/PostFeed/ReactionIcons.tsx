"use client";

import React, { useState } from "react";
import { Heart, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommentModal } from "../modals/CommentModal";
import { PostCardProps } from "./PostCard";



interface ReactionIconsProps {
  post: PostCardProps;
}

export const ReactionIcons: React.FC<ReactionIconsProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post?.likeCount || 0);
  const [commentCount, setCommentCount] = useState(post?.commentCount || 0);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const handleLikeClick = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="flex items-center gap-4">
      <PostReactionIcons 
        isLiked={isLiked}
        handleLikeClick={handleLikeClick}
        commentCount={commentCount}
        setIsCommentModalOpen={setIsCommentModalOpen}
        likes={likes}
      />

      <CommentModal
        isLiked={isLiked}
        handleLikeClick={handleLikeClick}
        likes={likes}
        commentCount={commentCount}
        setIsCommentModalOpen={setIsCommentModalOpen}
        post={post}
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
      />
    </div>
  );
};

const emojis = ["💋", "😍", "🔥", "😢", "😈", "🥺", "🖤", "💔", "😱", "😏"];

export const EmojiBar: React.FC = () => (
  <div className="flex flex-wrap gap-2">
    {emojis.map((icon, i) => (
      <Button
        key={i}
        variant="outline"
        size="sm"
        className="rounded-full bg-transparent border-[#d4c8a8] hover:bg-[#f5f2e8]"
      >
        {icon}
      </Button>
    ))}
  </div>
);

export interface PostReactionIconsProps {
  isLiked: boolean;
  handleLikeClick: () => void;
  likes: number;
  commentCount: number;
  setIsCommentModalOpen: (isOpen: boolean) => void;
}

export const PostReactionIcons = ({isLiked, likes, handleLikeClick, commentCount, setIsCommentModalOpen}:PostReactionIconsProps) => {
  return (
    <>
      <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full"
        onClick={handleLikeClick}
      >
        <Heart
          className={`h-5 w-5 ${
            isLiked ? "fill-red-500 text-red-500" : "text-[#2a2a2a]"
          }`}
        />
      </Button>
      <span className="text-sm font-medium text-[#2a2a2a]">{likes}</span>
    </div>
     <div className="flex items-center gap-1">
     <Button
       variant="ghost"
       size="icon"
       className="h-8 w-8 rounded-full"
       onClick={() => setIsCommentModalOpen(true)}
     >
       <MessageSquare className="h-5 w-5 text-[#2a2a2a]" />
     </Button>
     <span className="text-sm font-medium text-[#2a2a2a]">
       {commentCount}
     </span>
   </div>
    </>
  );
};
