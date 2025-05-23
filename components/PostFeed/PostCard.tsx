"use client";

import { FC, ReactNode, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useCheckForMe } from "@/hooks/post";
import ConfessionResultModal from "@/components/modals/ConfessionResultModal";
import { EmojiBar, ReactionIcons } from "./ReactionIcons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUser } from "@/hooks/auth";

type CardType = "confession" | "news";

export interface PostCardProps {
  _id: string;
  type: CardType;
  tags: string[];
  content: string;
  image?: string;
  path?: string;
  isLiked: boolean;
  title?: string;
  isMidnight?: boolean;
  likesCount: number;
  hasTargetUser?: undefined | boolean;
  commentsCount: number;
  isPaid?: boolean;
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
  hasTargetUser,
  isLiked,
  image,
  isMidnight = false,
  unlockText,
  likesCount,
  commentsCount,
}) => {
  const currentPath = usePathname();
  const isConfession = type === "confession";
  const router = useRouter();
  const {data}:any = useUser();
  const user = data?.data;  

  const [modalOpen, setModalOpen] = useState(false);
  const [confessionResult, setConfessionResult] = useState<{
    isForYou: boolean;
    message: string;
    isAnonymous: boolean;
  } | null>(null);

  const handlePostClick = () => {
    if (currentPath === "/") {
      const redirectLink = isConfession ? "/confessions" : "/campus-corner";
      router.push(redirectLink);
    }
  };

  const { mutate: checkForMe, isPending } = useCheckForMe();

  const handleCheckForMe = () => {

    if(user?.sp < 5){
      alert("You need at least 5 SP to check for you");
      return;
    }

    checkForMe(_id, {
      onSuccess: (data) => {
        setConfessionResult({ isForYou: data.isForYou, message: data.message, isAnonymous: data.isAnonymous });
        setModalOpen(true);
      },
      onError: (error) => {
        console.error("Check for me error:", error);
      },
    });
  };

  return (
    <div className="w-full">
      <Card className="border border-[#d4c8a8] bg-[#f9f7f1] shadow-md overflow-hidden relative">
        {isConfession && isMidnight && unlockText && (
          <div className="absolute top-0 right-0 bg-[#2a2a2a] text-[#f5f2e8] text-xs px-3 py-1 font-medium z-20">
            {unlockText}
          </div>
        )}

        {type === "news" && title && (
          <h2 className="text-xl font-bold text-[#2a2a2a] p-5">{title}</h2>
        )}

        {type === "news" && image && (
          <img
            src={image}
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

          <div
            onClick={handlePostClick}
            className={`flex flex-col justify-between items-start mb-3`}
          >
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
              image,
              isMidnight,
              unlockText,
              likesCount,
              commentsCount,
            }}
          />
          <div className="mt-6 pt-4 border-t border-[#d4c8a8] flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-gray-700">
            <EmojiBar />
            {/* <div></div> */}

            {type === "confession" && hasTargetUser && (
              <div className="flex justify-end md:justify-end">
               <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={handleCheckForMe}
                        disabled={isPending}
                        className="p-2  bg-[#c9b27c] hover:bg-[#b39c64] shadow-md transition"
                      >
                       {!isPending ? "Check For Me for 5 SP" : "Checking..."}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="bg-black text-white text-xs"
                    >
                      Check if this is for you
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
{/*                 
                <CheckCheck className="w-4 h-4 text-green-700" />   */}
              {/* } */}
              </div>
            )}
          </div>
        </div>
      </Card>

      {confessionResult && (
        <ConfessionResultModal
          hasTargetUser={hasTargetUser}
          confessionId={_id}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          isForYou={confessionResult.isForYou}
          message={confessionResult.message}
          isAnonymous={confessionResult.isAnonymous}
        />
      )}
    </div>
  );
};
