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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Upload } from "lucide-react";
import { ConfessionModalProps } from "@/components/modals/confession-modal";

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