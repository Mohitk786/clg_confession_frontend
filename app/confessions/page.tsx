"use client";

import PostFeedPage from "@/components/PostFeed/PostFeed";
import { confessions } from "@/components/NewHome";

export default function ConfessionsPage() {

  return (
      <PostFeedPage type="confession" title="Confessions" posts={confessions}/>
  );
}
