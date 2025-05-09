import { axiosInstance } from "@/lib/axiosInstance"

export const getAllConfessions = async () =>{
    try{
        const res = await axiosInstance.get("/getAllConfessions");
        console.log(res?.data);
        return res.data;
    }catch(e){
       
    }
}

export const createConfession = async (data: any) => {
    try {
        const res = await axiosInstance.post("/confession/create", {...data});
        return res.data;
    } catch (e) {
        console.log(e);
    }
}
export const deleteConfession = async (id: string) => {
    try {
        const res = await axiosInstance.delete(`/deleteConfession/${id}`);
        return res.data;
    } catch (e) {
        console.log(e);
    }
}


