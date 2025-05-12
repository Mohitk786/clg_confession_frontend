"use client";

import React, { useState } from "react";
import { Heart, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommentModal } from "../modals/CommentModal";
import { PostCardProps } from "./PostCard";
import { useLikePost } from "@/hooks/post";



interface ReactionIconsProps {
  post: PostCardProps;
}

export const ReactionIcons: React.FC<ReactionIconsProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post?.isLiked);
  const [likes, setLikes] = useState(post?.likesCount);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const {mutate:likePost} = useLikePost();

  const handleLikeClick = () => {
    likePost({postId: post._id, postType: post.type}
      ,
      {
        onSuccess: ({data}:any) => {
          console.log(data);
          setIsLiked(data.isLiked);
          setLikes(data.likesCount);
        },

        onError: (error) => {
          console.error(error);
          setIsLiked((prev) => {
            const next = !prev;
            setLikes((prevLikes) => prevLikes + (next ? 1 : -1));
            return next;
          });
        },
      }
    );
  };

  return (
    <div className="flex items-center gap-4">
      <PostReactionIcons 
        isLiked={isLiked}
        handleLikeClick={handleLikeClick}
        commentCount={post.commentsCount}
        setIsCommentModalOpen={setIsCommentModalOpen}
        likesCount={likes}
      />

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
  likesCount: number;
  commentCount: number;
  setIsCommentModalOpen: (isOpen: boolean) => void;
}

export const PostReactionIcons = ({isLiked, likesCount, handleLikeClick, commentCount, setIsCommentModalOpen}:PostReactionIconsProps) => {
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
      <span className="text-sm font-medium text-[#2a2a2a]">{likesCount}</span>
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
