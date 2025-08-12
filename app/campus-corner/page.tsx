import PostFeedPage from '@/components/PostFeed/PostFeed'
import React from 'react'

export const dynamic = "force-dynamic";

const page = async () => {

  return <PostFeedPage type='news' title='News' />;

}

export default page