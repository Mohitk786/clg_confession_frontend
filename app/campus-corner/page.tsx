import PostFeedPage from '@/components/PostFeed/PostFeed'
import React from 'react'

const page = () => {
  return <PostFeedPage type='news'
    title='News'
    posts={[
      {
        from: "Campus Whispers",
        tags: ["Campus", "News"],
        content: "New semester starts on 1st September! Get ready for a great year ahead.",
        // imageUrl: "https://example.com/news-image.jpg",  
      },
      {
        from: "Campus Whispers",
        tags: ["Campus", "Events"],
        content: "Don't miss the Tech Fest this weekend! Register now.",
        imageUrl: "https://example.com/event-image.jpg",
      },
    ]}
  />
}

export default page