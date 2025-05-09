
import React from 'react';
import { Trophy, Heart } from 'lucide-react';

interface LeaderboardItemProps {
  title: string;
  content: string;
  votes: number;
  award: string;
}

const LeaderboardItem: React.FC<LeaderboardItemProps> = ({ title, content, votes, award }) => {
  return (
    <div className="flex items-start space-x-3 mb-4 pb-4 border-b border-campus-cream last:mb-0 last:pb-0 last:border-0">
      <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-campus-gold text-white">
        <Trophy size={16} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <h4 className="font-playfair text-campus-navy font-medium">{award}</h4>
          <span className="text-xs flex items-center text-campus-navy/70">
            <Heart size={12} className="mr-1" /> {votes}
          </span>
        </div>
        <p className="text-xs text-campus-navy/70 italic line-clamp-1">{content}</p>
      </div>
    </div>
  );
};

const Leaderboard: React.FC = () => {
  const leaderboardItems = [
    {
      title: "Confession of the Day",
      content: "I've been secretly tutoring my crush for the entire semester...",
      votes: 247,
      award: "Whisper King"
    },
    {
      title: "Meme of the Day",
      content: "That professor who never stops talking even after class ends",
      votes: 186,
      award: "Meme Lord"
    },
    {
      title: "Most Controversial",
      content: "Unpopular opinion but the dining hall food isn't that bad...",
      votes: 124,
      award: "Campus Rebel"
    },
    {
      title: "Most Relatable",
      content: "When you haven't started the paper due tomorrow",
      votes: 99,
      award: "Truth Speaker"
    },
    {
      title: "Biggest Simp",
      content: "To the girl in econ who always wears the blue sweater...",
      votes: 87,
      award: "Hopeless Romantic"
    }
  ];

  return (
    <div className="campus-card">
      <h3 className="campus-title text-lg mb-4 flex items-center">
        <Trophy size={18} className="text-campus-gold mr-2" />
        Today's Leaderboard
      </h3>
      
      <div className="space-y-4">
        {leaderboardItems.map((item, index) => (
          <LeaderboardItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;