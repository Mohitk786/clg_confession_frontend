import { QUERY_KEYS } from "@/constants/queryKeys";
import { sendOtp, verifyOtp, createProfile, getUser } from "@/services/auth";
import { useMutation, useQuery } from "@tanstack/react-query";


export const useSendOtp = () => {
    return useMutation({
        mutationFn:  sendOtp,
        mutationKey: [QUERY_KEYS.SEND_OTP],
})
}


export const useVerifyOtp = () => {
    return useMutation({
        mutationFn:  verifyOtp,
        mutationKey: [QUERY_KEYS.VERIFY_OTP],
})
}


export const useCreateProfile = () => {
    return useMutation({
        mutationFn: createProfile,
        mutationKey: [QUERY_KEYS.CREATE_PROFILE],
        onSuccess: (data) => {
            console.log("Profile created successfully", data);
        },
        onError: (error) => {
            console.error("Error creating profile", error);
        }
    })
}
    
export const useGetUser = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_USER],
        queryFn:  getUser,
        retry: 1
    });
}