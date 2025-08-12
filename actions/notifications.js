
import { verifySession } from "@/lib/dal";
import { dbConnect } from "@/lib/dbConnect";
import Notification from "@/models/Notification";


export const getNotifications = async () => {
    try{
        const {user} = await verifySession();
        if(!user?.userId){
            return NextResponse.json({success: false, message: "Unauthorized. User not authenticated"}, {status: 401});
        }
        await dbConnect();

        const notifications = await Notification.find({to: user.userId}).sort({createdAt: -1});

        return notifications;

    }catch(err){
        console.log(err);
    }
}