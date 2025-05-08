"use client";

import React, { useState } from 'react';
import Layout from '@/components/new/Layout';
import ConfessionCard, { ConfessionProps } from '@/components/new/ConfessionCard';
import MemeCard, { MemeProps } from '@/components/new/MemeCard';
import NewConfessionForm from '@/components/new/NewConfessionForm';



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
      imageUrl: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
      title: "Study session expectation vs. reality",
      votes: 205,
      comments: 31,
      createdAt: "7 hours ago"
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
          <NewConfessionForm />
        
        {/* Main content area */}
        <div className="lg:col-span-2 space-y-6">
         
          
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
          
          <h2 className="font-playfair text-2xl font-bold text-campus-navy mt-8">Trending {}</h2>
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