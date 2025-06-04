"use server"

import { dbConnect } from "@/lib/dbConnect";
import College from "@/models/College";


export const getColleges = async () => {
    try {
        await dbConnect();
        const colleges = await College.find({}).limit(100);

        return {
            success: true,
            colleges: JSON.parse(JSON.stringify(colleges)),
        };
    
    } catch (error) {
        return {
        success: false,
        message: "Error in getHomeData",
        error: error.message,
        };
    }

}