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
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Upload } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ConfessionModalProps {
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
  const [scheduleDate, setScheduleDate] = useState<Date | undefined>(undefined);
  const [hintIndex, setHintIndex] = useState(0);

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-[#f5f2e8] bg-[url('/paper-texture.png')] border border-[#d4c8a8] shadow-xl">
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
              {[
                { id: "lust", label: "#Lust", emoji: "😈" },
                { id: "love", label: "#Love", emoji: "🥺" },
                { id: "closure", label: "#Closure", emoji: "🖤" },
                { id: "missed", label: "#MissedConnection", emoji: "👀" },
                { id: "funny", label: "#Funny", emoji: "😂" },
                { id: "toxic", label: "#Toxic", emoji: "☠️" },
              ].map((tag) => (
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

          {/* Schedule for Later */}
          <div className="space-y-2">
            <Label className="text-[#2a2a2a] font-medium flex items-center gap-2">
              <CalendarIcon size={16} /> Drop this confession at:
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-[#f9f7f1] border-[#d4c8a8] hover:bg-[#f5f2e8] hover:text-[#2a2a2a]",
                    !scheduleDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {scheduleDate ? (
                    format(scheduleDate, "PPP")
                  ) : (
                    <span>Choose date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-[#f9f7f1] border-[#d4c8a8]">
                <Calendar
                  mode="single"
                  selected={scheduleDate}
                  onSelect={setScheduleDate}
                  initialFocus
                  className="bg-[#f9f7f1]"
                />
              </PopoverContent>
            </Popover>
            <div className="flex gap-2">
              <select className="border border-[#d4c8a8] rounded px-2 py-1 text-sm bg-[#f9f7f1] flex-1">
                {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                  <option key={hour} value={hour}>
                    {hour.toString().padStart(2, "0")}
                  </option>
                ))}
              </select>
              <span className="flex items-center">:</span>
              <select className="border border-[#d4c8a8] rounded px-2 py-1 text-sm bg-[#f9f7f1] flex-1">
                {[0, 15, 30, 45].map((minute) => (
                  <option key={minute} value={minute}>
                    {minute.toString().padStart(2, "0")}
                  </option>
                ))}
              </select>
            </div>
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
          <Button className="bg-[#c9b27c] hover:bg-[#b39c64] text-[#2a2a2a] font-medium">
            Post Confession
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export const PostImage = ({ open, onOpenChange }: ConfessionModalProps) => {
  const [blurLevel, setBlurLevel] = useState(50);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTitle className="font-serif text-2xl text-center text-[#2a2a2a]">
        Post Photo
      </DialogTitle>
      <DialogContent className="max-w-md text-gray-200 bg-[#0a1f1c] bg-[url('/paper-texture.png')] border border-[#d4c8a8]/10 shadow-xl">
        <div className="space-y-3  rounded-md p-3 bg-[#0a1f1c]/30">
          <Label className=" font-medium flex items-center gap-2">
            <Upload size={16} /> Upload a Blurry Photo (Optional)
          </Label>
          <div className="flex items-center justify-center h-32 border-2 border-dashed border-[#d4c8a8] rounded-md bg-[#f9f7f1]/50 cursor-pointer hover:bg-[#f9f7f1]">
            <div className="text-center">
              <p className="text-sm  text-[#c9b27c]">
                Drag & drop or click to upload
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-[#8a7e55]">
              <span>Blur Level:</span>
              <span>
                {blurLevel < 33 ? "Low" : blurLevel < 66 ? "Medium" : "High"} (
                {blurLevel}%)
              </span>
            </div>
            <Slider
              value={[blurLevel]}
              min={10}
              max={90}
              step={10}
              onValueChange={(value) => setBlurLevel(value[0])}
              className="[&_[role=slider]]:bg-[#c9b27c]"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[#8a7e55]/70 text-sm">
              Want people to spend points to unblur?
            </Label>
            <div className="flex items-center gap-2">
              <RadioGroup
                defaultValue="yes"
                className="flex gap-4"
                orientation="horizontal"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="yes"
                    id="unblur-yes"
                    className="border-[#c9b27c] text-[#c9b27c]"
                  />
                  <Label htmlFor="unblur-yes" className="text-sm">
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="no"
                    id="unblur-no"
                    className="border-[#c9b27c] text-[#c9b27c]"
                  />
                  <Label htmlFor="unblur-no" className="text-sm">
                    No
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center gap-2">
              <Label className="text-[#c9b27c] text-sm whitespace-nowrap">
                Cost to unlock:
              </Label>
              <RadioGroup
                defaultValue="20"
                className="flex gap-4"
                orientation="horizontal"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="20"
                    id="cost-20"
                    className="border-[#c9b27c] text-[#c9b27c]"
                  />
                  <Label htmlFor="cost-20" className="text-sm">
                    20 SP
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="50"
                    id="cost-50"
                    className="border-[#c9b27c] text-[#c9b27c]"
                  />
                  <Label htmlFor="cost-50" className="text-sm">
                    50 SP
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="100"
                    id="cost-100"
                    className="border-[#c9b27c] text-[#c9b27c]"
                  />
                  <Label htmlFor="cost-100" className="text-sm">
                    100 SP
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
        <DialogFooter className="flex gap-2 sm:justify-between">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-[#d4c8a8]  text-[#2a2a2a]"
          >
            Cancel
          </Button>
          <Button className="bg-[#c9b27c] hover:bg-[#b39c64] text-[#2a2a2a] font-medium">
            Post Confession
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
