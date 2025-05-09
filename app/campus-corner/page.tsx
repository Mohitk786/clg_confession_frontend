import PostFeedPage from '@/components/PostFeed/PostFeed'
import React from 'react'

const memes = [
  {
    tags: ["#news", "#funny"],
    content: "New meme format drops!",
    imageUrl: "/images/meme1.jpg",
  },
  {
    tags: ["#news", "#trending"],
    content: "This meme is taking the internet by storm!",
    imageUrl: "/images/meme2.jpg",
  },
  {
    tags: ["#news", "#viral"],
    content: "Check out this hilarious meme that went viral!",
    imageUrl: "/images/meme3.jpg",
  },
]

const page = () => {
  return <PostFeedPage type='news'
    title='News'
    posts={memes}
  />
}

export default page