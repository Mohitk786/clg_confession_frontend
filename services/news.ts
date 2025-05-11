import { axiosInstance } from "@/lib/axiosInstance"

export const getAllNews = async ({pageParam=1}:{pageParam?:number}) =>{
    try{
        const res = await axiosInstance.get(`/news/all?page=${pageParam}`);
        return res.data;
    }catch(e){
       
    }
}

export const createNews = async (data: any) => {
    try {
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


