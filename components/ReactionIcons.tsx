"use client";

import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, ThumbsDown } from "lucide-react";

const icons = [
  { Icon: Heart, count: 214 },
  { Icon: ThumbsDown, count: 10 },
  { Icon: MessageSquare, count: 47 },
];

export const ReactionIcons: FC = () => (
  <div className="flex items-center gap-4">
    {icons.map(({ Icon, count }, i) => (
      <button key={i} className="text-[#8a7e55] hover:text-[#2a2a2a] flex items-center gap-1">
        <Icon size={18} />
        <span className="text-sm">{count}</span>
      </button>
    ))}
  </div>
);




const emojis = ["💋", "😍", "🔥", "😢", "😈", "🥺", "🖤", "💔", "😱", "😏"];

export const EmojiBar: FC = () => (
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
