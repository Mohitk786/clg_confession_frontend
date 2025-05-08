"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface NewsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewsModal: React.FC<NewsModalProps> = ({ open, onOpenChange }) => {
  const [formData, setFormData] = useState({
    headline: "",
    tags: "",
    image: "",
    content: "",
  });

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    const formattedTags = formData.tags.split(",").map((tag) => tag.trim());
    const payload = {
      ...formData,
      tags: formattedTags,
    };
    console.log(payload); // You can replace this with an API call
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#f9f7f1] text-[#2a2a2a] border-[#d4c8a8] max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl italic">Submit News</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Headline"
          value={formData.headline}
          onChange={(e) => handleChange("headline", e.target.value)}
        />

        <Input
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={(e) => handleChange("tags", e.target.value)}
        />

        <Input
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => handleChange("image", e.target.value)}
        />

        <Textarea
          placeholder="News content"
          value={formData.content}
          onChange={(e) => handleChange("content", e.target.value)}
        />

        <div className="flex justify-end mt-4">
          <Button
            className="bg-[#c9b27c] hover:bg-[#b39c64] text-[#2a2a2a]"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
