"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { availableTags } from "@/constants/data"
import { useState } from "react"
import { useCreateNews } from "@/hooks/news"

interface NewsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const NewsModal: React.FC<NewsModalProps> = ({ open, onOpenChange }) => {
  const initialData = {
    title: "",
    image: "",
    content: "",
  }
  const [formData, setFormData] = useState(initialData)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const { mutate: createNews } = useCreateNews()

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      if (selectedTags.length < 3) {
        setSelectedTags([...selectedTags, tag])
      }
    }
  }

  const handleSubmit = async () => {
    try {
      let imageBase64 = ""

      if (selectedImage) {
        const reader = new FileReader()
        reader.readAsDataURL(selectedImage)

        reader.onloadend = () => {
          imageBase64 = reader.result as string

          const payload = {
            ...formData,
            image: imageBase64,
            tags: selectedTags,
          }

          createNews(payload, {
            onSuccess: () => {
              setFormData(initialData)
              setSelectedImage(null)
              setPreviewUrl(null)
              onOpenChange(false)
            },
            onError: (error) => {
              console.error("Error submitting news:", error)
            },
          })
        }
      } else {
        const payload = {
          ...formData,
          tags: selectedTags,
        }

        createNews(payload, {
          onSuccess: () => {
            setFormData(initialData)
            setSelectedImage(null)
            setPreviewUrl(null)
            onOpenChange(false)
          },
          onError: (error) => {
            console.error("Error submitting news:", error)
          },
        })
      }
    } catch (err) {
      console.error("Error:", err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-6 max-w-2xl bg-white/95 backdrop-blur-xl border border-purple-200/50 shadow-2xl rounded-2xl">
        <DialogHeader className="text-center space-y-3">
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Submit Campus News
          </DialogTitle>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto"></div>
          <p className="text-gray-600 text-sm">Keep the community informed and engaged.</p>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label className="text-gray-700 font-medium">Title</Label>
            <Input
              placeholder="News Title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="bg-white/80 border-purple-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-lg"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-gray-700 font-medium">Upload Image (Optional)</Label>
            <div className="space-y-3">
              <Input
                type="file"
                name="picture"
                accept="image/*"
                onChange={handleImageSelect}
                className="bg-white/80 border-purple-200 focus:border-purple-400 rounded-lg file:bg-purple-50 file:text-purple-700 file:border-0 file:rounded-md file:px-3 file:py-1"
              />
              <p className="text-xs text-gray-500">Upload an image to make your news more engaging.</p>
            </div>

            {previewUrl && (
              <div className="mt-3">
                <img
                  src={previewUrl || "/placeholder.svg"}
                  alt="Preview"
                  className="max-w-full max-h-48 rounded-lg border border-purple-200 object-contain shadow-md"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-gray-700 font-medium">Content</Label>
            <Textarea
              placeholder="Write the news content here..."
              value={formData.content}
              onChange={(e) => handleChange("content", e.target.value)}
              className="min-h-[120px] bg-white/80 border-purple-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-lg resize-none"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-gray-700 font-medium">Select relevant tags:</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
            </div>
          </div>
        </div>

        <DialogFooter className="mt-8 flex gap-3">
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
          >
            Submit News
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
