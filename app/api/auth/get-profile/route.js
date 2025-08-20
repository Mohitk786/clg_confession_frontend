import { NextResponse } from "next/server"
import Profile from "@/models/Profile"
import { dbConnect } from "@/lib/dbConnect"
import { auth } from "@/auth"


export const GET = async (req) => {
try{
    const session = await auth();

    if (!session) {
        return { success: false, message: "Not authenticated" };
    }

    const {user} = session;

    if(!user){
        return { success: false, message: "Unauthorized" };
    }

    await dbConnect()
    const profile = await Profile.findOne({
        userId: user.userId
    }).populate("userId", "profileCompleted")


    if(!profile){
        return new Response(JSON.stringify({message: "You have not comppleted your profile"}), {status: 404})
    }

    return NextResponse.json({
        success: true,
        message: "Profile fetched",
        data: profile
    })


}catch(er){
    return new Response(JSON.stringify({message: "Error"}), {status: 500})
}
}