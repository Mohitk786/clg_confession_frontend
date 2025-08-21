
import { dbConnect } from "@/lib/dbConnect";
import Notification from "@/models/Notification";
import { auth } from "@/auth";

export const getNotifications = async (): Promise<{success?: boolean, message?: string, data?: any}> => {
    try{
        const session = await auth();

        if (!session) {
            return { success: false, message: "Not authenticated" };
        }

        const {user} = session;

        await dbConnect();

        const notifications = await Notification.find({to: user.userId}).sort({createdAt: -1});

        return {success: true, data: notifications};

    }catch(err){
        return {success: false, message: "Error fetching notifications"};
    }
}