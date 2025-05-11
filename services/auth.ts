import  {axiosInstance}  from "@/lib/axiosInstance";

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
    console.log("verifyOtp", res.data);
    return res.data;
}

export const createProfile = async (data: any) => {
    const res = await axiosInstance.post("/auth/create-profile", data);
    return res.data;
}


export const getUser = async () => {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
}

export const logout = async () => {
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
}


export const updateProfile = async (data: any) => {
    const res = await axiosInstance.post("/auth/update-profile", data);
    return res.data;
}

export const getProfile = async () => {
    const res = await axiosInstance.get("/auth/get-profile");
    return res.data;
}