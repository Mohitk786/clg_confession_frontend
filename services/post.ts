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


export const getAllComments = async (postId: string) => {
  try {
    const res = await axiosInstance.get(`/posts/${postId}/comment`);
    if (res.status !== 200) {
      throw new Error("Failed to fetch comments");
    }
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const postComment = async ({postId, content}:any) => {
  try {
    const res = await axiosInstance.post(`/posts/${postId}/comment`, {content});
    if (res.status !== 200) {
      throw new Error("Failed to post comment");
    }
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const checkForMe = async (confessionId: string) => {
  try{
    if(!confessionId) throw new Error("Confession ID is required");

    const res:any = await axiosInstance.get(`/confession/${confessionId}/checkForMe`);
    
    if(!res.data?.success) throw new Error("Failed to check for me");

    return res.data;

  }catch(error){
    console.error("Error checking for me:", error);
    throw error;
  }

}