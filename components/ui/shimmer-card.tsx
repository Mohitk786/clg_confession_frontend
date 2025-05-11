"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { EmojiBar } from "@/components/PostFeed/ReactionIcons";

export const ShimmerCard = () => {
  return (
    <Card className="border border-[#d4c8a8] bg-[#f9f7f1] shadow-md overflow-hidden relative">
      <div className="shimmer h-6 w-3/4 bg-gray-300 mb-3"></div>
      <div className="shimmer h-4 bg-gray-300 mb-4"></div>
      <div className="shimmer h-40 w-full bg-gray-300 mb-4"></div>

      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="shimmer h-3 w-32 bg-gray-300 mb-2"></div>
          <div className="flex gap-2 mb-3">
            <div className="shimmer h-6 w-20 bg-gray-300"></div>
            <div className="shimmer h-6 w-20 bg-gray-300"></div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Report</DropdownMenuItem>
            <DropdownMenuItem>Share</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="shimmer h-4 w-full bg-gray-300 mb-4"></div>

      <div className="mt-4 pt-3 border-t border-[#d4c8a8]">
        <EmojiBar />
      </div>
    </Card>
  );
};
