
import PostFeedPage from "@/components/PostFeed/PostFeed";
import {getPosts} from "@/actions/getPosts"

export const dynamic = "force-dynamic";

export default async function ConfessionsPage() {
  try {
    return (
      <PostFeedPage type="confession" title="Confessions"  />
    );
  } catch (err) {
    throw new Error("Failed to load confessions"); 
  }
}
