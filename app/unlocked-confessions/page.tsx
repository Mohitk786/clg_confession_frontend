export const dynamic = 'force-dynamic';

import React from 'react';
import { getUnlockedConfessions } from '@/actions/getUnlockedConfessions';

const Page = async () => {
  const data = await getUnlockedConfessions();
  const unlockedConfessions = data?.data || [];

  return (
    <div className="min-h-screen bg-campus-cream py-10 px-4">
      <h1 className="text-3xl font-playfair text-campus-forest mb-6 text-center">
        💌 Unlocked Confessions
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {unlockedConfessions.map((confession: any) => (
          <div
            key={confession._id}
            className="bg-white rounded-2xl p-6 shadow-lg border border-muted transition-transform hover:scale-[1.02] animate-fade-in"
          >
            <p className="text-lg text-campus-navy font-inter whitespace-pre-wrap mb-4">
              {confession.content}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {confession.tags?.map((tag: string, i: number) => (
                <span
                  key={i}
                  className="bg-campus-gold/10 text-campus-gold text-sm px-3 py-1 rounded-full font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="text-sm text-muted-foreground font-inter flex items-center justify-between">
              <div>
                ❤️ {confession.likesCount} Likes &nbsp; 💬 {confession.commentsCount} Comments
              </div>
              <div className="text-right">
                <span className="font-semibold text-campus-forest">{confession.createdBy?.name}</span>{' '}
                · {confession.createdBy?.gender}
                <br />
                <span className="text-xs text-campus-navy/70">
                  🎓 {confession.createdBy?.college?.name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
