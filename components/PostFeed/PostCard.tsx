"use client";

import { FC, ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { MoreHorizontal } from "lucide-react";
import { EmojiBar, ReactionIcons } from "./ReactionIcons";

type CardType = "confession" | "news";

export interface PostCardProps {
  _id: string;
  type: CardType;
  tags: string[];
  content: string;
  imageUrl?: string;
  path?: string;
  isLiked: boolean;
  title?: string;
  isMidnight?: boolean;
  likesCount: number;
  commentsCount: number;
  unlockText?: string;
  actions?: ReactNode;
}

export const PostCard: FC<PostCardProps> = ({
  type,
  _id,
  tags,
  content,
  path,
  title,
  isLiked,
  imageUrl,
  isMidnight = false,
  unlockText,
  likesCount,
  commentsCount,
}) => {
  const currentPath = usePathname();
  const isConfession = type === "confession";
  const router = useRouter();

  const handlePostClick = () => {
    if (currentPath === "/") {
      const redirectLink = isConfession ? "/confessions" : "/campus-corner";
      router.push(redirectLink);
    }
  };


  return (
    <div  className="w-full">
      <Card className="border border-[#d4c8a8] bg-[#f9f7f1] shadow-md overflow-hidden relative">
        {isConfession && isMidnight && unlockText && (
          <div className="absolute top-0 right-0 bg-[#2a2a2a] text-[#f5f2e8] text-xs px-3 py-1 font-medium z-20">
            {unlockText}
          </div>
        )}

        {type === "news" && title && (
          <h2 className="text-xl font-bold text-[#2a2a2a] p-5">{title}</h2>
        )}

        {type === "news" && imageUrl && (
          <img
            src={imageUrl}
            alt="News Image"
            className="w-full h-64 object-contain mx-auto"
          />
        )}

        <div className="p-5 relative">
          {isConfession && isMidnight && (
            <div className="absolute inset-0 backdrop-blur-sm flex items-center justify-center z-10">
              <Button className="bg-[#c9b27c] hover:bg-[#b39c64] text-[#2a2a2a]">
                Unlock Midnight Confession (25 SP)
              </Button>
            </div>
          )}

          <div onClick={handlePostClick} className={`flex flex-col justify-between items-start mb-3`}>
            <div>
              <p className="text-sm text-[#8a7e55] italic mb-1">
                {type === "confession"
                  ? `From: Anonymous`
                  : `Source: Anonymous`}
              </p>
              <div className="flex gap-2 mb-3">
                {tags?.map((tag, i) => (
                  <Badge
                    key={i}
                    className="bg-[#c9b27c] hover:bg-[#b39c64] text-[#2a2a2a]"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Report</DropdownMenuItem>
                <DropdownMenuItem>Share</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}

            <p className="font-['Caveat'] text-lg leading-relaxed mb-4">
              {path === "/" && content.length > 100
                ? `${content.slice(0, 100)}...`
                : content}
            </p>
          </div>

          <ReactionIcons
            post={{
              _id,
              type,
              tags,
              content,
              title,
              isLiked,
              imageUrl,
              isMidnight,
              unlockText,
              likesCount,
              commentsCount,
            }}
          />
          <div className="mt-4 pt-3 border-t border-[#d4c8a8]">
            <EmojiBar />
          </div>
        </div>
      </Card>
    </div>
  );
};
