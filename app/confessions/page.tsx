
import PostFeedPage from "@/components/PostFeed/PostFeed";
import {getPosts} from "@/actions/getPosts"

export const dynamic = "force-dynamic";

export default async function ConfessionsPage() {
  try {
    const {confessions=[]} = await getPosts(true);
    return (
      <PostFeedPage type="confession" title="Confessions" posts={confessions} />
    );
  } catch (err) {
    throw new Error("Failed to load confessions"); 
  }
}
