import { axiosInstance } from "@/lib/axiosInstance"

export const getAllNews = async () =>{
    try{
        const res = await axiosInstance.get("/news/all");
        return res.data;
    }catch(e){
       
    }
}

export const createNews = async (data: any) => {
    try {
        console.log("data", data);
        const res = await axiosInstance.post("/news/create", {...data});
        return res.data;
    } catch (e) {
        console.log(e);
    }
}
export const deleteNews = async (id: string) => {
    try {
        const res = await axiosInstance.delete(`/delete/${id}`);
        return res.data;
    } catch (e) {
        console.log(e);
    }
}


