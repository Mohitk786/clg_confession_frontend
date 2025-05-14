"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { availableTags } from "@/constants/data";
import { useCreateConfession } from "@/hooks/confessions";
import { useUser } from "@/hooks/auth";
import Link from "next/link";

export interface ConfessionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface TaggedUser {
  _id: string;
  username: string;
  avatar?: string;
}

const hintTexts = [
  "To the one who passed me notes in class...",
  "That night in the library… I still remember.",
  "This isn't just about love… it's obsession.",
  "I've been watching you from across the hall...",
  "If you knew what I was thinking when you walked by...",
];

export function ConfessionModal({ open, onOpenChange }: ConfessionModalProps) {
  const [confession, setConfession] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [identityReveal, setIdentityReveal] = useState("anonymous");
  const [revealCost, setRevealCost] = useState("50");
  const [hintIndex, setHintIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isTagging, setIsTagging] = useState(false);
  const [taggedUser, setTaggedUser] = useState<TaggedUser | null>(null);
  const [error, setError] = useState({
    confession: false,
    tags: false,
    identityReveal: false,
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { data }: any = useUser();
  const user = data?.data!;


  const { mutate: addConfession, isPending, isError } = useCreateConfession();

  // Rotate hint text every 5 seconds
  useState(() => {
    const interval = setInterval(() => {
      setHintIndex((prev) => (prev + 1) % hintTexts.length);
    }, 5000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    // Clean up timeout on component unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const clearTaggedUser = () => {
    setTaggedUser(null);
    setInputValue("");
    setIsTagging(false);
  };

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      // Limit to 2 tags
      if (selectedTags.length < 10) {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };

  const handleSubmit = () => {
    const payload = {
      content: confession,
      tags: selectedTags,
      isAnonymous: identityReveal === "anonymous",
      ...(identityReveal === "reveal" && { spForRevealIdentity: revealCost }),
      ...(taggedUser && { taggedUserId: taggedUser._id }),
    };

    // Validate confession
    if (confession.length < 10) {
      setError((prev) => {
        return {
          ...prev,
          confession: true,
        };
      });
      return;
    }
    if (selectedTags.length === 0) {
      setError((prev) => {
        return {
          ...prev,
          tags: true,
        };
      });
      return;
    }

    if (identityReveal === "reveal" && !user?.profileCompleted) {
      setError((prev) => {
        return {
          ...prev,
          identityReveal: true,
        };
      });
      return;
    }

    addConfession(payload, {
      onSuccess: () => {
        setConfession("");
        setSelectedTags([]);
        setIdentityReveal("anonymous");
        setRevealCost("50");
        setInputValue("");
        setTaggedUser(null);
        setIsTagging(false);
        onOpenChange(false);
      },
      onError: (error) => {
        console.error("Error creating confession", error);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-4 max-w-2xl bg-[#f5f2e8] bg-[url('/paper-texture.png')] border border-[#d4c8a8] shadow-xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-center text-[#2a2a2a]">
            Whisper Your Confession
          </DialogTitle>
          <p className="text-center text-[#8a7e55] text-sm italic">
            Your identity is anonymous. Unless you choose otherwise.
          </p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Confession Text Area */}
          <div className="space-y-2">
            <Textarea
              placeholder={hintTexts[hintIndex]}
              className="min-h-[120px] bg-[#f9f7f1] border-[#d4c8a8] font-['Caveat'] text-lg"
              value={confession}
              onChange={(e) => setConfession(e.target.value)}
              maxLength={600}
            />
            <div className="flex justify-between items-center flex-row-reverse">
              <div className="text-right text-xs text-[#8a7e55]">
                {confession.length}/600 characters
              </div>
              {error.confession && (
                <p className="text-xs text-red-700 italic">
                  Confession must be at least 10 characters long
                </p>
              )}
            </div>
          </div>

          {/* Mood/Tag Selector */}
          <div className="space-y-3">
            <Label className="text-[#2a2a2a] font-medium">
              Select up to 2 tags:
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {availableTags.map((tag) => (
                <div key={tag.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={tag.id}
                    checked={selectedTags.includes(tag.id)}
                    onCheckedChange={() => handleTagToggle(tag.id)}
                    className="border-[#c9b27c] data-[state=checked]:bg-[#c9b27c] data-[state=checked]:text-[#2a2a2a]"
                  />
                  <Label
                    htmlFor={tag.id}
                    className="text-sm font-medium leading-none cursor-pointer flex items-center"
                  >
                    {tag.label} <span className="ml-1">{tag.emoji}</span>
                  </Label>
                </div>
              ))}
            {selectedTags.length === 0 && error.tags && (
              <p className="text-xs text-red-700 italic">
                Please select at least one tag
              </p>
            )}
            </div>
          </div>

          {/* Reveal Identity */}
          <div className="space-y-3">
            <Label className="text-[#2a2a2a] font-medium">
              Reveal My Identity:
            </Label>
            <RadioGroup
              value={identityReveal}
              onValueChange={setIdentityReveal}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="anonymous"
                  id="anonymous"
                  className="border-[#c9b27c] text-[#c9b27c]"
                />
                <Label htmlFor="anonymous" className="text-sm">
                  Stay Anonymous
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="reveal"
                  id="reveal"
                  className="border-[#c9b27c] text-[#c9b27c]"
                />
                <Label
                  htmlFor="reveal"
                  className="text-sm flex items-center gap-2"
                >
                  Identity Reveal
                  <span className="text-xs text-[#8a7e55] italic">
                    (only the tagged user can see your identity)
                  </span>
                </Label>
              </div>
            </RadioGroup>

            {((identityReveal === "reveal" && !user?.profileCompleted) || (error.identityReveal))
              && (
                <p className="text-xs  text-red-700 italic">
                  Complete your{" "}
                  <Link
                    href={"/profile"}
                    className="cursor-poniter text-blue-600"
                  >
                    Profile
                  </Link>{" "}
                  or Post Anonymously
                </p>
              )}
          </div>

          {/* Confess to Specific User */}
          <div className="space-y-2 relative">
            <MentionSuggestion
              inputValue={inputValue}
              isTagging={isTagging}
              onUserSelect={(user) => {
                setTaggedUser(user);
                setInputValue(`@${user.username}`);
              }}
              setIsTagging={setIsTagging}
            />
            <Label className="text-[#2a2a2a] font-medium">
              Confess to (optional):
            </Label>
            <Input
              placeholder="@username"
              value={inputValue}
              onChange={(e) => {
                const value = e.target.value;
                setInputValue(value);
                if (value.includes("@") && !taggedUser) {
                  setIsTagging(true);
                } else if (!value.includes("@")) {
                  setIsTagging(false);
                }
              }}
            />
            {taggedUser && (
              <div className="text-xs text-green-700 mt-1">
                Tagged: @{taggedUser.username}{" "}
                <button onClick={clearTaggedUser} className="ml-2 text-red-500">
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex gap-2 sm:justify-between">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-[#d4c8a8] hover:bg-[#f5f2e8] hover:text-[#2a2a2a]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-[#c9b27c] hover:bg-[#b39c64] text-[#2a2a2a] font-medium"
            disabled={isPending}
          >
            {isPending ? "Posting..." : "Post Confession"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface TaggedUser {
  _id: string;
  username: string;
  avatar?: string;
}

interface MentionSuggestionProps {
  inputValue: string;
  isTagging: boolean;
  onUserSelect: (user: TaggedUser) => void;
  setIsTagging: (val: boolean) => void;
}

export const MentionSuggestion: React.FC<MentionSuggestionProps> = ({
  inputValue,
  isTagging,
  onUserSelect,
  setIsTagging,
}) => {
  const [suggestedUsers, setSuggestedUsers] = useState<TaggedUser[]>([]);
  const [isPending, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!inputValue.startsWith("@") || inputValue.length <= 1) {
        setSuggestedUsers([]);
        return;
      }

      setIsLoading(true);
      try {
        const username = inputValue.slice(1);
        const response = await fetch(`/api/tagUser?username=${username}`);
        if (response.ok) {
          const data = await response.json();
          setSuggestedUsers(data?.data || []);
        }
      } catch (err) {
        console.error("Error fetching users", err);
      } finally {
        setIsLoading(false);
      }
    };

    const delayDebounce = setTimeout(fetchUsers, 500);

    return () => clearTimeout(delayDebounce);
  }, [inputValue]);

  if (!isTagging) return null;

  return (
    <div className="absolute z-10 w-full -mt-5 bg-[#f9f7f1] border border-[#d4c8a8] rounded-md shadow-md max-h-60 overflow-y-auto">
      {inputValue === "@" && (
        <div className="p-3 text-sm text-[#8a7e55]">
          Start typing a username...
        </div>
      )}

      {isPending && inputValue.length > 1 && (
        <div className="p-3 flex items-center text-sm text-[#8a7e55]">
          <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A7.96 7.96 0 014 12H0c0 3.04 1.13 5.82 3 7.94l3-2.65z"
            ></path>
          </svg>
          Searching...
        </div>
      )}

      {!isPending &&
        suggestedUsers.length > 0 &&
        suggestedUsers.map((user) => (
          <div
            key={user._id}
            onClick={() => {
              onUserSelect(user);
              setIsTagging(false);
            }}
            className="px-3 py-2 hover:bg-[#f0ece0] cursor-pointer flex items-center gap-2 border-t border-[#e6dfc8]"
          >
            <div className="w-6 h-6 rounded-full overflow-hidden bg-[#e6dfc8] flex items-center justify-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-xs font-bold">
                  {user.username[0].toUpperCase()}
                </span>
              )}
            </div>
            <span className="text-sm">{user.username}</span>
          </div>
        ))}
    </div>
  );
};
