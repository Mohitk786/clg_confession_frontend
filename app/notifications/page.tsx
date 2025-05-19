export const dynamic = "force-dynamic";

import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Bell, Heart } from "lucide-react";
import { getNotifications } from "@/actions/notifications";

type Notification = {
  _id: string;
  from: string;
  to: string;
  type: string;
  message: string;
  refModel: string;
  refId: string;
  data: any;
};

type Props = {
  notifications: Notification[];
};

const iconMap: Record<string, React.ReactNode> = {
  CONFESSION_LIKED: <Heart className="w-5 h-5 text-red-500" />,
  NEWS_LIKED: <Heart className="w-5 h-5 text-blue-500" />,
};

const NotificationList = async () => {
  const notifications = await getNotifications();

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      {notifications?.length ? (
        notifications.map((n) => (
          <div
            key={n._id}
            className={`flex items-start gap-4 rounded-2xl p-4 shadow-md transition-all duration-300 animate-fade-in
            ${n.isRead ? "bg-campus-offwhite" : "bg-campus-cream border-l-4 border-campus-gold"}
            `}
          >
            <div className="mt-1">
              {iconMap[n.type] || <Bell className="w-5 h-5 text-gray-500" />}
            </div>

            <div className="flex-1">
              <p className="text-sm text-foreground font-medium">{n.message}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(new Date(n.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>

            {!n.isRead && (
              <span className="ml-auto text-xs text-campus-gold font-semibold bg-campus-navy px-2 py-1 rounded-full">
                New
              </span>
            )}
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center h-48 text-gray-500 text-lg font-semibold">
          No Notification For You!
        </div>
      )}
    </div>
  );
};
export default NotificationList;
