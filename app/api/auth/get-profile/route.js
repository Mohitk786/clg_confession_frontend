import { NextResponse } from "next/server"
import Profile from "@/models/Profile"
import { dbConnect } from "@/lib/dbConnect"
import { auth } from "@/auth"


export async function GET() {
try{
    const session = await auth();

    if (!session) {
        return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
    }

    const {user} = session;

    if(!user){
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect()
    const profile = await Profile.findOne({
        userId: user.userId
    }).populate("userId", "profileCompleted")


    return NextResponse.json({
        success: true,
        message: "Profile fetched",
        data: profile
    })


}catch(er){
    return NextResponse.json({success: false, message: "Error"}, {status: 500})
}
}