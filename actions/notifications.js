
import { verifySession } from "@/lib/dal";
import { dbConnect } from "@/lib/dbConnect";
import Notification from "@/models/Notification";


export const getNotifications = async () => {
    try{
        const session = await auth();

        if (!session) {
            return { success: false, message: "Not authenticated" };
        }

        const {user} = session;

        await dbConnect();

        const notifications = await Notification.find({to: user.userId}).sort({createdAt: -1});

        return notifications;

    }catch(err){
        console.log(err);
    }
}