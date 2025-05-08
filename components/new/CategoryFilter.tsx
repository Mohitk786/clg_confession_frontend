

import React from 'react';

interface CategoryFilterProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  activeTimeFilter: string;
  setActiveTimeFilter: (filter: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  setActiveCategory,
  activeTimeFilter,
  setActiveTimeFilter
}) => {
  return (
    <div className="campus-card mb-6">
      <div className="flex flex-wrap md:flex-nowrap justify-between gap-4">
        <div className="w-full md:w-auto">
          <h3 className="text-sm font-medium mb-2">Filter by Category</h3>
          <div className="flex flex-wrap gap-2">
            <button
              className={`category-badge ${activeCategory === 'all' ? 'bg-campus-gold text-white' : 'bg-gray-100'}`}
              onClick={() => setActiveCategory('all')}
            >
              All
            </button>
            <button
              className={`category-badge ${activeCategory === 'love' ? 'category-love' : 'bg-gray-100'}`}
              onClick={() => setActiveCategory('love')}
            >
              💔 Love
            </button>
            <button
              className={`category-badge ${activeCategory === 'rant' ? 'category-rant' : 'bg-gray-100'}`}
              onClick={() => setActiveCategory('rant')}
            >
              🧠 Rant
            </button>
            <button
              className={`category-badge ${activeCategory === 'nsfw' ? 'category-nsfw' : 'bg-gray-100'}`}
              onClick={() => setActiveCategory('nsfw')}
            >
              🫣 NSFW
            </button>
            <button
              className={`category-badge ${activeCategory === 'funny' ? 'category-funny' : 'bg-gray-100'}`}
              onClick={() => setActiveCategory('funny')}
            >
              😂 Funny
            </button>
          </div>
        </div>
        
        <div className="w-full md:w-auto">
          <h3 className="text-sm font-medium mb-2">Time Period</h3>
          <div className="flex flex-wrap gap-2">
            <button
              className={`category-badge ${activeTimeFilter === 'today' ? 'bg-campus-gold text-white' : 'bg-gray-100'}`}
              onClick={() => setActiveTimeFilter('today')}
            >
              Today
            </button>
            <button
              className={`category-badge ${activeTimeFilter === 'week' ? 'bg-campus-gold text-white' : 'bg-gray-100'}`}
              onClick={() => setActiveTimeFilter('week')}
            >
              This Week
            </button>
            <button
              className={`category-badge ${activeTimeFilter === 'fresh' ? 'bg-campus-gold text-white' : 'bg-gray-100'}`}
              onClick={() => setActiveTimeFilter('fresh')}
            >
              Fresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;