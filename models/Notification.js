import mongoose from "mongoose";


const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String },
    message: { type: String },
    data: { type: mongoose.Schema.Types.Mixed },
  
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  });
  
 const Notification = mongoose.model('Notification', notificationSchema);
    export default Notification;