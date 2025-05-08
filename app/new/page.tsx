"use client"

import React, { useState } from 'react';
import Layout from '@/components/new/Layout';
import ConfessionCard, { ConfessionProps } from '@/components/new/ConfessionCard';
import MemeCard, { MemeProps } from '@/components/new/MemeCard';
import NewConfessionForm from '@/components/new/NewConfessionForm';
import CategoryFilter from '@/components/new/CategoryFilter';
import Leaderboard from '@/components/new/Leaderboard';
import { ImagePlus } from 'lucide-react';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTimeFilter, setActiveTimeFilter] = useState('today');
  
  // Mock data for confessions
  const confessions: ConfessionProps[] = [
    {
      id: 1,
      content: "I walked into my 8am lecture yesterday and realized I was still wearing my pajama pants. No one said anything but I'm pretty sure everyone noticed.",
      category: "funny",
      votes: 126,
      comments: 24,
      createdAt: "2 hours ago"
    },
    {
      id: 2,
      content: "To the cute guy who always sits in the back row of our Computer Science class - I've been wanting to talk to you all semester but I'm too nervous. Maybe this will give me courage...",
      category: "love",
      votes: 234,
      comments: 41,
      createdAt: "5 hours ago"
    },
    {
      id: 3,
      content: "The prices at the campus bookstore are ridiculous! I just spent $300 on textbooks that I'll probably use twice. Something needs to change.",
      category: "rant",
      votes: 198,
      comments: 32,
      createdAt: "8 hours ago"
    },
    {
      id: 4,
      content: "Accidentally sent my professor an email that was meant for my friend complaining about his class. Looking for a new major now, suggestions welcome.",
      category: "funny",
      votes: 310,
      comments: 52,
      createdAt: "11 hours ago"
    }
  ];
  
  // Mock data for memes
  const memes: MemeProps[] = [
    {
      id: 1,
      imageUrl: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e",
      title: "When the professor says the exam will be easy",
      votes: 187,
      comments: 23,
      createdAt: "3 hours ago"
    },
    {
      id: 2,
      imageUrl: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
      title: "Study session expectation vs. reality",
      votes: 205,
      comments: 31,
      createdAt: "7 hours ago"
    }
  ];
  
  // Filter confessions based on active category
  const filteredConfessions = activeCategory === 'all' 
    ? confessions 
    : confessions.filter(confession => confession.category === activeCategory);

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left sidebar - New confession form */}
        <div className="lg:col-span-1 space-y-6">
          <NewConfessionForm />
          
          <div className="campus-card">
            <h3 className="campus-title text-lg mb-4 flex items-center">
              <ImagePlus size={18} className="text-campus-forest mr-2" />
              Post a Meme
            </h3>
            <div className="bg-campus-offwhite border border-dashed border-campus-cream rounded-md p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-campus-cream/30 transition-colors">
              <ImagePlus className="h-10 w-10 text-campus-navy/40 mb-2" />
              <p className="text-sm text-campus-navy/70">
                Click to upload a meme
              </p>
              <p className="text-xs text-campus-navy/50 mt-1">
                PNG, JPG or GIF (max. 4MB)
              </p>
            </div>
          </div>
          
          <Leaderboard />
        </div>
        
        {/* Main content area */}
        <div className="lg:col-span-2 space-y-6">
          <CategoryFilter 
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            activeTimeFilter={activeTimeFilter}
            setActiveTimeFilter={setActiveTimeFilter}
          />
          
          <h2 className="font-playfair text-2xl font-bold text-campus-navy">Campus Confessions</h2>
          <div className="space-y-4">
            {filteredConfessions.length === 0 ? (
              <p className="text-center py-8 text-campus-navy/50">No confessions found. Be the first to share one!</p>
            ) : (
              filteredConfessions.map((confession) => (
                <ConfessionCard key={confession.id} {...confession} />
              ))
            )}
          </div>
          
          <h2 className="font-playfair text-2xl font-bold text-campus-navy mt-8">Trending Memes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {memes.map((meme) => (
              <MemeCard key={meme.id} {...meme} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;