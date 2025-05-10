
import PostFeedPage from "@/components/PostFeed/PostFeed";
import {getPosts} from "@/actions/getPosts"


export default async function ConfessionsPage() {
  const {confessions} = await getPosts(true);
  return (
      <PostFeedPage type="confession" title="Confessions" posts={confessions}/>
  );
}
