import { getPosts } from '@/actions/getPosts'
import PostFeedPage from '@/components/PostFeed/PostFeed'
import React from 'react'

const page = async () => {
  const {news} = await getPosts(false);

  return <PostFeedPage type='news'
    title='News'
    posts={news}
  />
}

export default page