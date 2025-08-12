"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { availableTags } from "@/constants/data"
import { useCreateConfession } from "@/hooks/confessions"
import { useUser } from "@/hooks/auth"
import Link from "next/link"

export interface ConfessionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface TaggedUser {
  _id: string
  username: string
  avatar?: string
}

const hintTexts = [
  "To the one who passed me notes in class...",
  "That night in the library… I still remember.",
  "This isn't just about love… it's obsession.",
  "I've been watching you from across the hall...",
  "If you knew what I was thinking when you walked by...",
]

export function ConfessionModal({ open, onOpenChange }: ConfessionModalProps) {
  const [confession, setConfession] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [identityReveal, setIdentityReveal] = useState("anonymous")
  const [revealCost, setRevealCost] = useState("50")
  const [hintIndex, setHintIndex] = useState(0)
  const [inputValue, setInputValue] = useState("")
  const [isTagging, setIsTagging] = useState(false)
  const [taggedUser, setTaggedUser] = useState<TaggedUser | null>(null)
  const [error, setError] = useState({
    confession: false,
    tags: false,
    identityReveal: false,
  })

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { data }: any = useUser()
  const user = data?.data!
  const { mutate: addConfession, isPending, isError } = useCreateConfession()





  // Rotate hint text every 5 seconds
  useState(() => {
    const interval = setInterval(() => {
      setHintIndex((prev) => (prev + 1) % hintTexts.length)
    }, 5000)
    return () => clearInterval(interval)
  })

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const clearTaggedUser = () => {
    setTaggedUser(null)
    setInputValue("")
    setIsTagging(false)
  }

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      if (selectedTags.length < 10) {
        setSelectedTags([...selectedTags, tag])
      }
    }
  }

  const handleSubmit = () => {
    const payload = {
      content: confession,
      tags: selectedTags,
      isAnonymous: identityReveal === "anonymous",
      ...(identityReveal === "reveal" && { spForRevealIdentity: revealCost }),
      ...(taggedUser && { taggedUserId: taggedUser._id }),
    }

    if (confession.length < 10) {
      setError((prev) => ({ ...prev, confession: true }))
      return
    }
    if (selectedTags.length === 0) {
      setError((prev) => ({ ...prev, tags: true }))
      return
    }

    if (identityReveal === "reveal" && !user?.profileCompleted) {
      setError((prev) => ({ ...prev, identityReveal: true }))
      return
    }

    addConfession(payload, {
      onSuccess: () => {
        setConfession("")
        setSelectedTags([])
        setIdentityReveal("anonymous")
        setRevealCost("50")
        setInputValue("")
        setTaggedUser(null)
        setIsTagging(false)
        onOpenChange(false)
      },
      onError: (error) => {
        console.error("Error creating confession", error)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-6 max-w-2xl bg-white/95 backdrop-blur-xl border border-purple-200/50 shadow-2xl rounded-2xl">
        <DialogHeader className="text-center space-y-3">
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Whisper Your Confession
          </DialogTitle>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto"></div>
          <p className="text-gray-600 text-sm">Your identity is anonymous. Unless you choose otherwise.</p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Textarea
              placeholder={hintTexts[hintIndex]}
              className="min-h-[120px] bg-white/80 border-purple-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-lg resize-none text-lg"
              value={confession}
              onChange={(e) => setConfession(e.target.value)}
              maxLength={600}
            />
            <div className="flex justify-between items-center flex-row-reverse">
              <div className="text-right text-xs text-gray-500">{confession.length}/600 characters</div>
              {error.confession && (
                <p className="text-xs text-red-600 italic">Confession must be at least 10 characters long</p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-gray-700 font-medium">Select up to 2 tags:</Label>
            <div className="grid grid-cols-2 gap-3">
              {availableTags.map((tag) => (
                <div key={tag.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={tag.id}
                    checked={selectedTags.includes(tag.id)}
                    onCheckedChange={() => handleTagToggle(tag.id)}
                    className="border-purple-300 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                  />
                  <Label
                    htmlFor={tag.id}
                    className="text-sm font-medium leading-none cursor-pointer flex items-center hover:text-purple-600 transition-colors"
                  >
                    {tag.label} <span className="ml-1">{tag.emoji}</span>
                  </Label>
                </div>
              ))}
              {selectedTags.length === 0 && error.tags && (
                <p className="text-xs text-red-600 italic col-span-2">Please select at least one tag</p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-gray-700 font-medium">Reveal My Identity:</Label>
            <RadioGroup value={identityReveal} onValueChange={setIdentityReveal} className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="anonymous" id="anonymous" className="border-purple-300 text-purple-500" />
                <Label htmlFor="anonymous" className="text-sm">
                  Stay Anonymous
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="reveal" id="reveal" className="border-purple-300 text-purple-500" />
                <Label htmlFor="reveal" className="text-sm flex items-center gap-2">
                  Identity Reveal
                  <span className="text-xs text-gray-500 italic">(only the tagged user can see your identity)</span>
                </Label>
              </div>
            </RadioGroup>

            {((identityReveal === "reveal" && !user?.profileCompleted) || error.identityReveal) && (
              <p className="text-xs text-red-600 italic">
                Complete your{" "}
                <Link href={"/profile"} className="text-purple-600 underline">
                  Profile
                </Link>{" "}
                or Post Anonymously
              </p>
            )}
          </div>

          <div className="space-y-2 relative">
            <MentionSuggestion
              inputValue={inputValue}
              isTagging={isTagging}
              onUserSelect={(user) => {
                setTaggedUser(user)
                setInputValue(`@${user.username}`)
              }}
              setIsTagging={setIsTagging}
            />
            <Label className="text-gray-700 font-medium">Confess to (optional):</Label>
            <Input
              placeholder="@username"
              value={inputValue}
              onChange={(e) => {
                const value = e.target.value
                setInputValue(value)
                if (value.includes("@") && !taggedUser) {
                  setIsTagging(true)
                } else if (!value.includes("@")) {
                  setIsTagging(false)
                }
              }}
              className="bg-white/80 border-purple-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-lg"
            />
            {taggedUser && (
              <div className="text-xs text-green-600 mt-1 bg-green-50 p-2 rounded-lg">
                Tagged: @{taggedUser.username}{" "}
                <button onClick={clearTaggedUser} className="ml-2 text-red-500 hover:text-red-700">
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex gap-3 sm:justify-between">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-purple-200 hover:bg-purple-50 hover:text-purple-700 transition-all duration-200"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            disabled={isPending}
          >
            {isPending ? "Posting..." : "Post Confession"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

interface MentionSuggestionProps {
  inputValue: string
  isTagging: boolean
  onUserSelect: (user: TaggedUser) => void
  setIsTagging: (val: boolean) => void
}

export const MentionSuggestion: React.FC<MentionSuggestionProps> = ({
  inputValue,
  isTagging,
  onUserSelect,
  setIsTagging,
}) => {
  const [suggestedUsers, setSuggestedUsers] = useState<TaggedUser[]>([])
  const [isPending, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      if (!inputValue.startsWith("@") || inputValue.length <= 1) {
        setSuggestedUsers([])
        return
      }

      setIsLoading(true)
      try {
        const username = inputValue.slice(1)
        const response = await fetch(`/api/tagUser?username=${username}`)
        if (response.ok) {
          const data = await response.json()
          setSuggestedUsers(data?.data || [])
        }
      } catch (err) {
        console.error("Error fetching users", err)
      } finally {
        setIsLoading(false)
      }
    }

    const delayDebounce = setTimeout(fetchUsers, 500)
    return () => clearTimeout(delayDebounce)
  }, [inputValue])

  if (!isTagging) return null

  return (
    <div className="absolute z-10 w-full -mt-5 bg-white/95 backdrop-blur-sm border border-purple-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
      {inputValue === "@" && <div className="p-3 text-sm text-gray-500">Start typing a username...</div>}

      {isPending && inputValue.length > 1 && (
        <div className="p-3 flex items-center text-sm text-gray-500">
          <div className="w-4 h-4 border-2 border-purple-300 border-t-purple-600 rounded-full animate-spin mr-2"></div>
          Searching...
        </div>
      )}

      {!isPending &&
        suggestedUsers.length > 0 &&
        suggestedUsers.map((user) => (
          <div
            key={user._id}
            onClick={() => {
              onUserSelect(user)
              setIsTagging(false)
            }}
            className="px-3 py-2 hover:bg-purple-50 cursor-pointer flex items-center gap-2 border-t border-purple-100 first:border-t-0 transition-colors"
          >
            <div className="w-6 h-6 rounded-full overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
              {user.avatar ? (
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.username}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-xs font-bold text-purple-600">{user.username[0].toUpperCase()}</span>
              )}
            </div>
            <span className="text-sm text-gray-700">{user.username}</span>
          </div>
        ))}
    </div>
  )
}
