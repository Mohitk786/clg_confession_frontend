import { QUERY_KEYS } from "@/constants/queryKeys";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { likePost, getAllComments, postComment } from "@/services/post";

// export const useComments = () => {
//     return useQuery({
//         queryKey: [QUERY_KEYS.GET_ALL_COMMENTS],
//         queryFn: getAllComments,
//         retry: 1
//     });
// }

export const useLikePost = () => {
  return useMutation({
    mutationKey: [QUERY_KEYS.LIKE_POST],
    mutationFn: likePost,
  });
};

export const useComments = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_COMMENTS, postId],
    queryFn: () => getAllComments(postId),
    retry: 1,
  });
};

export const usePostComment = () => {
    const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEYS.POST_COMMENT],
    mutationFn: postComment,
    onSuccess: ()=>{
        queryClient.invalidateQueries({queryKey : [QUERY_KEYS.GET_ALL_COMMENTS]})
    }
  });
};
