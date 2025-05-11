import { QUERY_KEYS } from "@/constants/queryKeys";
import {  useQueryClient, useMutation, useInfiniteQuery } from "@tanstack/react-query";
import { getAllConfessions, createConfession} from "@/services/confessions";


export const useConfessions = ({enabled=true}:{ enabled?: boolean }) => {
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.GET_ALL_CONFESSIONS],
        queryFn: getAllConfessions,
        initialPageParam: 1,
        getNextPageParam: (lastPage:any, pages:any) => {
            console.log("lastPage", lastPage)
            return lastPage.hasMore ? pages.length + 1 : undefined;
          },
        staleTime: 0,
        enabled
    });
}

export const useCreateConfession = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createConfession,
        onSuccess: () => {
            console.log("Confession created successfully");
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_ALL_CONFESSIONS] });
        },
    });
}


