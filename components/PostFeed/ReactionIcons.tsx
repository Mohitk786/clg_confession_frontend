"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, ThumbsDown, MessageSquare } from "lucide-react";


interface ReactionIconItem {
  Icon: React.FC<{ size: number }>;
  likeCount: number;
}



export const ReactionIcons = ({ likeCount, commentCount }:{likeCount:number, commentCount:number}) => (
  <div className="flex items-center gap-4">
      <button
        className="text-[#8a7e55] hover:text-[#2a2a2a] flex items-center gap-1"
      >
        <Heart size={18} />
        <span className="text-sm">{likeCount}</span>
      </button>
    
      <button
        className="text-[#8a7e55] hover:text-[#2a2a2a] flex items-center gap-1"
      >
        <MessageSquare size={18} />
        <span className="text-sm">{commentCount}</span>
      </button>
  </div>
);

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
