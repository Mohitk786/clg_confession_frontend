import { QUERY_KEYS } from "@/constants/queryKeys";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getAllConfessions, createConfession} from "@/services/confessions";


export const useConfessions = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_ALL_CONFESSIONS],
        queryFn: getAllConfessions,
        retry: 1,
    });
}

export const useCreateConfession = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createConfession,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_ALL_CONFESSIONS] });
        },
    });
}

