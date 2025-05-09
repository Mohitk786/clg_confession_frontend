"use client";

import PostFeedPage from "@/components/PostFeed/PostFeed";

const confessions = [
  {
    tags: ["#confession", "#midnight"],
    content: "I have a crush on my professor.",
    isMidnight: true,
    unlockText: "Unlock this confession",
  },
  {
    tags: ["#confession"],
    content: "I once stole a library book.",
  },
  {
    tags: ["#confession", "#funny"],
    content: "I accidentally sent a text meant for my friend to my professor.",
  },
]

export default function ConfessionsPage() {

  return (
      <PostFeedPage type="confession" title="Confessions" posts={confessions}/>
  );
}
