"use client"
import React, { useState } from 'react';
import { Label } from '../ui/label';
import { availableTags } from '@/constants/data';
import {Checkbox} from '../ui/checkbox';
import { useCreateConfession } from '@/hooks/confessions';
import { toast } from '@/hooks/use-toast';

const NewConfessionForm: React.FC = () => {
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const {mutate:addConfession, isPending, isError} = useCreateConfession();
  
  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      if (selectedTags.length < 2) {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   
    addConfession({content, tags: selectedTags}, {
      onSuccess: () => {
        setContent('');
        setSelectedTags([]);
        toast({
          title: "Success",
          description: "Confession posted successfully",
        });
      },
    
      onError: (error) => {
        toast({
          title: "Error",
          description: "Failed to post confession. Please try again.",
          variant: "destructive",
        });
      }
   })
   
  };
  
  return (
    <div className="campus-card">
      <h3 className="campus-title text-lg mb-4">Post a Confession</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            className="w-full p-3 border border-campus-cream  rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent min-h-[120px]"
            placeholder="Share your anonymous confession..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        
        <div className="space-y-3">
            <Label className="text-[#2a2a2a] font-medium">
              Category:
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {availableTags.slice(0,4).map((tag) => (
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
        
        <div className="text-right mt-4 md:mt-2">
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-campus-forest text-white hover:bg-campus-forest/90 transition-colors"
            disabled={!content.trim()}
          >
            Post Anonymously
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewConfessionForm;