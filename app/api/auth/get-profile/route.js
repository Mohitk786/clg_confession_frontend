import { getAuthUser } from "@/lib/auth"
import { NextResponse } from "next/server"
import Profile from "@/models/Profile"
import { dbConnect } from "@/lib/dbConnect"



export const GET = async (req) => {
try{
    const user = await getAuthUser(req)
    if(!user){
        return new Response(JSON.stringify({message: "Unauthorized"}), {status: 401})
    }

    await dbConnect()
    const profile = await Profile.findOne({
        userId: user.userId
    }).populate("userId", "profileCompleted")


    if(!profile){
        return new Response(JSON.stringify({message: "Profile not found"}), {status: 404})
    }

    return NextResponse.json({
        success: true,
        message: "Profile fetched",
        data: profile
    })


}catch(er){
    console.log(er)
    return new Response(JSON.stringify({message: "Error"}), {status: 500})
}
}