"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { availableTags } from "@/constants/data";
import { useState } from "react";
import { useCreateNews } from "@/hooks/news";

interface NewsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewsModal: React.FC<NewsModalProps> = ({ open, onOpenChange }) => {
  
  const initialData = {
    title: "",
    image: "",
    content: "",
  }
  const [formData, setFormData] = useState(initialData);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {mutate:createNews} = useCreateNews();

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      // Optional: limit to 3 tags
      if (selectedTags.length < 3) {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      let imageBase64 = ";
  
      if (selectedImage) {
        const reader = new FileReader();
        reader.readAsDataURL(selectedImage);
  
        reader.onloadend = () => {
          imageBase64 = reader.result as string;
  
          const payload = {
            ...formData,
            image: imageBase64,
            tags: selectedTags,
          };
  
          createNews(payload, {
            onSuccess: () => {
              setFormData(initialData);
              setSelectedImage(null);
              setPreviewUrl(null);
              onOpenChange(false);
            },
            onError: (error) => {
              console.error("Error submitting news:", error);
            },
          });
        };
      } else {
        const payload = {
          ...formData,
          tags: selectedTags,
        };
  
        createNews(payload, {
          onSuccess: () => {
            setFormData(initialData);
            setSelectedImage(null);
            setPreviewUrl(null);
            onOpenChange(false);
          },
          onError: (error) => {
            console.error("Error submitting news:", error);
          },
        });
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };
  

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-5 max-w-xl bg-[#f5f2e8] bg-[url('/paper-texture.png')] border border-[#d4c8a8] shadow-xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-center text-[#2a2a2a] italic">
            Submit Campus News
          </DialogTitle>
          <p className="text-center text-[#8a7e55] text-sm italic">
            Keep the community informed and engaged.
          </p>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <Label className="text-[#2a2a2a] font-medium">Title</Label>
            <Input
              placeholder="News Title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="bg-[#f9f7f1] border-[#d4c8a8]"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[#2a2a2a] font-medium">
              Upload Image (Optional)
            </Label>

            <div className="flex gap-4 flex-wrap">
              <div className="flex flex-col items-start">
                <Input
                  type="file"
                  name="picture"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="bg-[#f9f7f1] border-[#d4c8a8]"
                />
                <small className="text-xs text-muted-foreground">
                  Upload a image to make your news more engaging.
                </small>
              </div>
            </div>

            {previewUrl && (
              <div className="mt-2">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-48 rounded border border-[#d4c8a8]"
                />
              </div>
            )}
          </div>

          <div>
            <Label className="text-[#2a2a2a] font-medium">Describe</Label>
            <Textarea
              placeholder="Write the news content here..."
              value={formData.content}
              onChange={(e) => handleChange("content", e.target.value)}
              className="min-h-[120px] bg-[#f9f7f1] border-[#d4c8a8] font-['Caveat'] text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[#2a2a2a] font-medium">
              Select relevant tags:
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
        </div>

        <DialogFooter className="mt-6 flex justify-between">
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
          >
            Submit News
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
