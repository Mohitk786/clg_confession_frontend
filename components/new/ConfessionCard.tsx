
import React from 'react';
import { Heart, MessageSquare, Share2 } from 'lucide-react';

export interface ConfessionProps {
  id: number;
  content: string;
  category: 'love' | 'rant' | 'nsfw' | 'funny';
  votes: number;
  comments: number;
  createdAt: string;
}

const categoryEmojis = {
  love: '💔',
  rant: '🧠',
  nsfw: '🫣',
  funny: '😂'
};

const categoryClasses = {
  love: 'category-love',
  rant: 'category-rant',
  nsfw: 'category-nsfw',
  funny: 'category-funny'
};

const ConfessionCard: React.FC<ConfessionProps> = ({
  id,
  content,
  category,
  votes,
  comments,
  createdAt
}) => {
  return (
    <div className="campus-card animate-fade-in" style={{ animationDelay: `${id * 100}ms` }}>
      <div className="flex justify-between items-start mb-3">
        <div className={`category-badge ${categoryClasses[category]}`}>
          {categoryEmojis[category]} {category.charAt(0).toUpperCase() + category.slice(1)}
        </div>
        <span className="text-xs text-campus-navy/50">{createdAt}</span>
      </div>
      
      <p className="text-campus-navy text-base mb-4 leading-relaxed">{content}</p>
      
      <div className="flex items-center justify-between pt-3 border-t border-campus-cream">
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

export default ConfessionCard;