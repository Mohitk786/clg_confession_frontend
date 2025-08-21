"use client"

import { type FC, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { usePathname, useRouter } from "next/navigation"
import { useCheckForMe } from "@/hooks/post"
import ConfessionResultModal from "@/components/custom-ui/modals/ConfessionResultModal"
import { EmojiBar, ReactionIcons } from "./ReactionIcons"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useUser } from "@/hooks/auth"
import { useToast } from "@/hooks/use-toast"

type CardType = "confession" | "news"

export interface PostCardProps {
  _id: string
  type: CardType
  tags: string[]
  content: string
  image?: string
  path?: string
  isLiked: boolean
  title?: string
  hasTargetUser?: boolean
  likesCount: number
  commentsCount: number
  createdBy: string
}

export const PostCard: FC<PostCardProps> = ({
  type="confession",
  _id,
  tags,
  content,
  path,
  title,
  hasTargetUser=false,
  isLiked,
  image,
  likesCount,
  commentsCount,
  createdBy,
}) => {
  const { toast } = useToast();
  
  const currentPath = usePathname()
  const isConfession = type === "confession"
  const router = useRouter()
  const { data }: any = useUser()
  const user = data?.data
  
  const { mutate: checkForMe, isPending } = useCheckForMe()

  const [modalOpen, setModalOpen] = useState(false)
  const [confessionResult, setConfessionResult] = useState<{
    isForYou: boolean
    message: string
    isAnonymous: boolean
  } | null>(null)

  const handlePostClick = () => {
    if (currentPath === "/") {
      const redirectLink = isConfession ? "/confessions" : "/campus-corner"
      router.push(redirectLink)
    }
  }


  const handleCheckForMe = () => {
    if (user?.sp < 5) {
      toast({
        title: "Error",
        description: "You need at least 5 SP to check for you",
      })
      return
    }

    checkForMe(_id, {
      onSuccess: (data) => {
        setConfessionResult({ isForYou: data.isForYou, message: data.message, isAnonymous: data.isAnonymous })
        setModalOpen(true)
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      },
    })
  }

  return (
    <div className="w-full">
      <Card className="relative overflow-hidden bg-white/80 backdrop-blur-sm border border-purple-200/50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
      
        {!isConfession && title && (
          <div className="p-6 pb-0">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              {title}
            </h2>
            <div className="h-1 w-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
          </div>
        )}

        {!isConfession && image && (
          <div className="p-6 pt-4">
            <img
              src={image || "/placeholder.svg"}
              alt="News Image"
              className="w-full h-64 object-cover rounded-xl shadow-md"
            />
          </div>
        )}

        <div className="p-6 relative">
          

          <div onClick={handlePostClick} className="flex flex-col justify-between items-start mb-4">
            <div className="w-full">
              <p className="text-sm text-purple-600/70 italic mb-3 font-medium">
                {type === "confession" ? "From: Anonymous" : "Source: Anonymous"}
              </p>

              <div className="flex gap-2 mb-4 flex-wrap">
                {tags?.map((tag, i) => (
                  <Badge
                    key={i}
                    className="bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-purple-700 border-0 px-3 py-1 rounded-full font-medium"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            <p className="text-gray-700 text-base leading-relaxed font-medium">
              {path === "/" && content.length > 100 ? `${content.slice(0, 100)}...` : content}
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
              likesCount,
              hasTargetUser,
              commentsCount,
              createdBy,
            }}
          />

          <div className="mt-6 pt-4 border-t border-purple-200/50 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <EmojiBar />

            {type === "confession" && hasTargetUser && user?.userId !== createdBy && (
              <div className="flex justify-end md:justify-end">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={handleCheckForMe}
                        disabled={isPending}
                        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium shadow-md transition-all duration-200 disabled:opacity-50"
                      >
                        {!isPending ? "Check For Me for 5 SP" : "Checking..."}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-gray-900 text-white text-xs rounded-lg">
                      Check if this is for you
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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
  )
}
