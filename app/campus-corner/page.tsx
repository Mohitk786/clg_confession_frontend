import PostFeedPage from '@/components/PostFeed/PostFeed'
import React from 'react'
import { memes } from '@/components/NewHome'

const page = () => {
  return <PostFeedPage type='news'
    title='News'
    posts={memes}
  />
}

export default page