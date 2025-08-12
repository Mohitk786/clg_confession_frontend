"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Upload } from "lucide-react"
import type { ConfessionModalProps } from "@/components/custom-ui/modals/confession-modal"

export const PostImage = ({ open, onOpenChange }: ConfessionModalProps) => {
  const [blurLevel, setBlurLevel] = useState(50)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white/95 backdrop-blur-xl border border-purple-200/50 shadow-2xl rounded-2xl p-6">
        <DialogHeader className="text-center space-y-3">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Post Photo
          </DialogTitle>
          <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto"></div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          <div className="space-y-3">
            <Label className="text-gray-700 font-medium flex items-center gap-2">
              <Upload size={16} className="text-purple-500" /> Upload a Blurry Photo (Optional)
            </Label>
            <div className="flex items-center justify-center h-32 border-2 border-dashed border-purple-300 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 cursor-pointer hover:from-purple-100 hover:to-pink-100 transition-all duration-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Upload size={20} className="text-white" />
                </div>
                <p className="text-sm text-gray-600 font-medium">Drag & drop or click to upload</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700 font-medium">Blur Level:</span>
              <span className="text-purple-600 font-medium">
                {blurLevel < 33 ? "Low" : blurLevel < 66 ? "Medium" : "High"} ({blurLevel}%)
              </span>
            </div>
            <Slider
              value={[blurLevel]}
              min={10}
              max={90}
              step={10}
              onValueChange={(value) => setBlurLevel(value[0])}
              className="[&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-purple-500 [&_[role=slider]]:to-pink-500 [&_[role=slider]]:border-0 [&_.relative]:bg-purple-200"
            />
          </div>

          <div className="space-y-4 bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl">
            <Label className="text-gray-700 font-medium text-sm">Want people to spend points to unblur?</Label>
            <RadioGroup defaultValue="yes" className="flex gap-6" orientation="horizontal">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="unblur-yes" className="border-purple-300 text-purple-500" />
                <Label htmlFor="unblur-yes" className="text-sm font-medium">
                  Yes
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="unblur-no" className="border-purple-300 text-purple-500" />
                <Label htmlFor="unblur-no" className="text-sm font-medium">
                  No
                </Label>
              </div>
            </RadioGroup>

            <div className="space-y-3">
              <Label className="text-purple-600 text-sm font-medium">Cost to unlock:</Label>
              <RadioGroup defaultValue="20" className="flex gap-4" orientation="horizontal">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="20" id="cost-20" className="border-purple-300 text-purple-500" />
                  <Label htmlFor="cost-20" className="text-sm font-medium">
                    20 SP
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="50" id="cost-50" className="border-purple-300 text-purple-500" />
                  <Label htmlFor="cost-50" className="text-sm font-medium">
                    50 SP
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="100" id="cost-100" className="border-purple-300 text-purple-500" />
                  <Label htmlFor="cost-100" className="text-sm font-medium">
                    100 SP
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-3 sm:justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-purple-200 hover:bg-purple-50 hover:text-purple-700 transition-all duration-200"
          >
            Cancel
          </Button>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200">
            Post Confession
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
