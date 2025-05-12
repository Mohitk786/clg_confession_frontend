import { axiosInstance } from "@/lib/axiosInstance";

export const likePost = async ({postId, postType}:any) => {
  try {
    const res = await axiosInstance.post(`/posts/${postId}/like`, {postType});
    if (res.status !== 200) {
      throw new Error("Failed to like the post");
    }
    return res.data;
  } catch (error) {
    throw error;
  }
};
