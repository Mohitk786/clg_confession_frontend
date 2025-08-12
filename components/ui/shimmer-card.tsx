"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { EmojiBar } from "@/components/PostFeed/ReactionIcons"

export const ShimmerCard = () => {
  return (
    <Card className="border-0 bg-white/80 backdrop-blur-md shadow-lg overflow-hidden relative rounded-2xl">
      <div className="animate-pulse">
        {/* Header shimmer */}
        <div className="h-6 w-3/4 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 bg-[length:200%_100%] animate-shimmer rounded-lg mb-3"></div>

        {/* Content shimmer */}
        <div className="h-4 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 bg-[length:200%_100%] animate-shimmer rounded-lg mb-4"></div>

        {/* Image placeholder shimmer */}
        <div className="h-40 w-full bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 bg-[length:200%_100%] animate-shimmer rounded-xl mb-4"></div>

        <div className="flex justify-between items-start mb-3">
          <div>
            {/* Timestamp shimmer */}
            <div className="h-3 w-32 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 bg-[length:200%_100%] animate-shimmer rounded mb-2"></div>

            {/* Tags shimmer */}
            <div className="flex gap-2 mb-3">
              <div className="h-6 w-20 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 bg-[length:200%_100%] animate-shimmer rounded-full"></div>
              <div className="h-6 w-20 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 bg-[length:200%_100%] animate-shimmer rounded-full"></div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-purple-100/50 text-purple-600"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-md border-purple-200/50 shadow-lg">
              <DropdownMenuItem className="hover:bg-purple-50 text-purple-700">Report</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-purple-50 text-purple-700">Share</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Content line shimmer */}
        <div className="h-4 w-full bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 bg-[length:200%_100%] animate-shimmer rounded-lg mb-4"></div>
      </div>

      <div className="mt-4 pt-3 border-t border-purple-200/30">
        <EmojiBar />
      </div>
    </Card>
  )
}
