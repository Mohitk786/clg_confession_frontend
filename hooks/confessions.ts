import { QUERY_KEYS } from "@/constants/queryKeys";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getAllConfessions, createConfession} from "@/services/confessions";


export const useConfessions = ({enabled=true}:{ enabled?: boolean }) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_ALL_CONFESSIONS],
        queryFn: getAllConfessions,
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


