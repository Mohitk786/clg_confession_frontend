
import React, { useState } from 'react';

const NewConfessionForm: React.FC = () => {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'love' | 'rant' | 'nsfw' | 'funny'>('funny');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would submit to the backend
    console.log({ content, category });
    
    // Reset form
    setContent('');
    setCategory('funny');
  };
  
  return (
    <div className="campus-card">
      <h3 className="campus-title text-lg mb-4">Post a Confession</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            className="w-full p-3 border border-campus-cream rounded-md focus:outline-none focus:ring-1 focus:ring-campus-gold focus:border-transparent min-h-[120px]"
            placeholder="Share your anonymous confession..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Category</label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className={`category-badge ${category === 'love' ? 'category-love' : 'bg-gray-100'}`}
              onClick={() => setCategory('love')}
            >
              💔 Love
            </button>
            <button
              type="button"
              className={`category-badge ${category === 'rant' ? 'category-rant' : 'bg-gray-100'}`}
              onClick={() => setCategory('rant')}
            >
              🧠 Rant
            </button>
            <button
              type="button"
              className={`category-badge ${category === 'nsfw' ? 'category-nsfw' : 'bg-gray-100'}`}
              onClick={() => setCategory('nsfw')}
            >
              🫣 NSFW
            </button>
            <button
              type="button"
              className={`category-badge ${category === 'funny' ? 'category-funny' : 'bg-gray-100'}`}
              onClick={() => setCategory('funny')}
            >
              😂 Funny
            </button>
          </div>
        </div>
        
        <div className="text-right">
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