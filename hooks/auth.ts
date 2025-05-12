import { QUERY_KEYS } from "@/constants/queryKeys";
import { sendOtp, verifyOtp, createProfile, getUser, updateProfile, getProfile } from "@/services/auth";
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
        onSuccess: ({data}:any) => {
            localStorage.setItem("user", JSON.stringify(data));
        },
        onError: (error) => {
            console.error("Error creating profile", error);
        }
    })
}
    
export const useUser = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_USER],
        queryFn:  getUser,
        retry: 1
    });
}

export const useUpdateProfile = () => {
    return useMutation({
        mutationFn: updateProfile,
        mutationKey: [QUERY_KEYS.UPDATE_PROFILE],
    })
}

export const useProfile = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_PROFILE],
        queryFn: getProfile,
        retry: 1,
    });
}