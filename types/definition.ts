export type NotificationType =
  | "CONFESSION_POSTED"
  | "CONFESSION_LIKED"
  | "CONFESSION_COMMENTED"
  | "NEWS_LIKED"
  | "NEWS_COMMENTED"
  | "FOLLOWED"
  | "MENTIONED";

export interface Notification {
  _id: string; 
  from: string; 
  to: string;   
  type: NotificationType;
  message: string;
  refModel?: string;
  refId?: string; 
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: string; 
}
