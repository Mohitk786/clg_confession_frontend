import { QUERY_KEYS } from "@/constants/queryKeys";
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export const usePostComment = (postId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: [QUERY_KEYS.POST_COMMENT],
    mutationFn: postComment,
    onMutate: async (newComment) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.GET_ALL_COMMENTS, postId],
      });

      const previousComments = queryClient.getQueryData([QUERY_KEYS.GET_ALL_COMMENTS, postId]);

      queryClient.setQueryData([QUERY_KEYS.GET_ALL_COMMENTS, postId], (old: any) => ({
        ...old,
        data: [newComment, ...old.data],
      }));

      return { previousComments };
    },

    onError: (err, newComment, context: any) => {
      queryClient.setQueryData([QUERY_KEYS.GET_ALL_COMMENTS, postId], context.previousComments);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_COMMENTS, postId],  
      });
    },
    
  });
};
