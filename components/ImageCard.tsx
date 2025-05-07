import Image from "next/image";
import { Heart, MessageSquare, Share2, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ImageCardProps {
  id: number;
  caption: string;
  interactions: number;
}

const ImageCard = ({item}: {item:ImageCardProps}) => {
  return (
    <Card
      key={item.id}
      className="overflow-hidden border border-[#c9b27c]/30 bg-[#0c2420] relative group"
    >
      <div className="relative aspect-square overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-xl bg-[#0a1f1c]/30 group-hover:backdrop-blur-lg transition-all duration-300 z-10"></div>
        <Image
          src={`/placeholder.svg?height=600&width=600&text=Mystery+${item.id}`}
          alt={item.caption}
          width={600}
          height={600}
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a1f1c] p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <p className="font-serif text-lg text-[#e8d9b5] mb-3">
            {item.caption}
          </p>
          <Button className="w-full bg-[#c9b27c] hover:bg-[#b39c64] text-[#0a1f1c] font-medium">
            Unblur for 50 SP
          </Button>
        </div>
      </div>
      <div className="p-4 flex items-center justify-between border-t border-[#c9b27c]/20">
        <div className="flex items-center gap-4">
          <button className="text-[#c9b27c] hover:text-[#e8d9b5] transition-colors flex items-center gap-1">
            <Heart size={18} />
            <span className="text-sm">
              {Math.floor(item.interactions * 0.7)}
            </span>
          </button>
          <button className="text-[#c9b27c] hover:text-[#e8d9b5] transition-colors flex items-center gap-1">
            <ThumbsDown size={18} />
            <span className="text-sm">
              {Math.floor(item.interactions * 0.3)}
            </span>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-[#c9b27c] hover:text-[#e8d9b5] transition-colors">
            <MessageSquare size={18} />
          </button>
          <button className="text-[#c9b27c] hover:text-[#e8d9b5] transition-colors">
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default ImageCard;
