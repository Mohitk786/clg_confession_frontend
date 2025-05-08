
import React from 'react';
import { Heart, MessageSquare, Share2 } from 'lucide-react';

export interface MemeProps {
  id: number;
  imageUrl: string;
  title: string;
  votes: number;
  comments: number;
  createdAt: string;
}

const MemeCard: React.FC<MemeProps> = ({
  id,
  imageUrl,
  title,
  votes,
  comments,
  createdAt
}) => {
  return (
    <div className="campus-card animate-fade-in" style={{ animationDelay: `${id * 100}ms` }}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-campus-navy">{title}</h3>
        <span className="text-xs text-campus-navy/50">{createdAt}</span>
      </div>
      
      <div className="mb-3 rounded-md overflow-hidden border border-campus-cream">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-auto object-cover"
          loading="lazy" 
        />
      </div>
      
      <div className="flex items-center justify-between pt-2">
        <div className="flex space-x-4">
          <button className="flex items-center space-x-1 text-campus-navy/70 hover:text-campus-gold transition-colors">
            <Heart size={18} />
            <span className="text-sm">{votes}</span>
          </button>
          <button className="flex items-center space-x-1 text-campus-navy/70 hover:text-campus-gold transition-colors">
            <MessageSquare size={18} />
            <span className="text-sm">{comments}</span>
          </button>
        </div>
        <button className="text-campus-navy/70 hover:text-campus-gold transition-colors">
          <Share2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default MemeCard;