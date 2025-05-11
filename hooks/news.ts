import { QUERY_KEYS } from "@/constants/queryKeys";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getAllNews, createNews} from "@/services/news";

export const useNews = ({enabled=true}:{ enabled?: boolean }) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_ALL_NEWS],
        queryFn: getAllNews,
        retry: 1,
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