"use client";

import { useState } from "react";
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


export interface ConfessionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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
  const {mutate:addConfession, isPending, isError} = useCreateConfession();

  // Rotate hint text every 5 seconds
  useState(() => {
    const interval = setInterval(() => {
      setHintIndex((prev) => (prev + 1) % hintTexts.length);
    }, 5000);
    return () => clearInterval(interval);
  });

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      // Limit to 2 tags
      if (selectedTags.length < 2) {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };

  const handleSubmit = () => {

    const payload = {
      content:confession,
      tags: selectedTags,
      isAnonymous: identityReveal === "anonymous",
      ...(identityReveal==="reveal" && {spForRevealIdentity:revealCost}),
    }

    addConfession(payload, {
      onSuccess: () => {
        setConfession("");
        setSelectedTags([]);
        setIdentityReveal("anonymous");
        setRevealCost("50");
        onOpenChange(false);
      },
      onError: (error) => {
        console.error("Error creating confession", error);
      },
    });
    
  }

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
            <div className="text-right text-xs text-[#8a7e55]">
              {confession.length}/600 characters
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
                  Allow identity reveal for
                  <select
                    value={revealCost}
                    onChange={(e) => setRevealCost(e.target.value)}
                    className="border border-[#d4c8a8] rounded px-2 py-1 text-xs bg-[#f9f7f1]"
                    disabled={identityReveal !== "reveal"}
                  >
                    <option value="50">50 SP</option>
                    <option value="100">100 SP</option>
                  </select>
                </Label>
              </div>
            </RadioGroup>


            

            {identityReveal === "reveal"  && <p className="text-xs text-[#8a7e55] italic">
              If someone spends SP, they can see your identity.
            </p>}

            

          </div>

          {/* Confess to Specific User */}
          <div className="space-y-2">
            <Label className="text-[#2a2a2a] font-medium">
              Confess to (optional):
            </Label>
            <Input
              placeholder="@username"
              className="bg-[#f9f7f1] border-[#d4c8a8]"
            />
            <p className="text-xs text-[#8a7e55] italic">
              They won't be notified unless they spend SP to find out.
            </p>
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
          <Button onClick={handleSubmit} className="bg-[#c9b27c] hover:bg-[#b39c64] text-[#2a2a2a] font-medium">
            Post Confession
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


