import { axiosInstance } from "@/lib/axiosInstance";

interface LoginRequest {
    phone: string;
    otp: string;
}

export const sendOtp = async ({phone}:{phone:LoginRequest["phone"]}) => {
    const res = await axiosInstance.post("/auth/send-otp", {
        phone,
    });
    return res.data;
}


export const verifyOtp = async ({phone, otp}:LoginRequest) => {
    const res = await axiosInstance.post("/auth/verify-otp", {
        phone,
        otp
    });
    return res.data;
}

export const createProfile = async (data: any) => {
    const res = await axiosInstance.post("/auth/create-profile", data);
    return res.data;
}


export const getUser = async () => {
    const res = await axiosInstance.get("/auth/user");
    return res.data;
}

export const logout = async () => {
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
}