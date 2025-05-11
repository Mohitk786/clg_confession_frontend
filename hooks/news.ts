import { QUERY_KEYS } from "@/constants/queryKeys";
import { useInfiniteQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getAllNews, createNews} from "@/services/news";

export const useNews = ({enabled=true}:{ enabled?: boolean }) => {
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.GET_ALL_NEWS],
        queryFn: getAllNews,
        initialPageParam: 1,
        staleTime: 0,
        getNextPageParam: (lastPage:any, allPages:any) =>
            lastPage.hasMore ? allPages.length + 1 : undefined,
        enabled
    });
}

export const useCreateNews = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createNews,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_ALL_NEWS] });
        }
    });
}