import { QUERY_KEYS } from "@/constants/queryKeys";
import { useMutation, useQuery } from "@tanstack/react-query"
import { likePost } from "@/services/post";



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
}