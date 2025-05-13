import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  type: {
    type: String,
    enum: [
      'CONFESSION_POSTED',
      'CONFESSION_LIKED',
      'CONFESSION_COMMENTED',
      'NEWS_LIKED',
      'NEWS_COMMENTED',
      'FOLLOWED',
      'MENTIONED',
    ],
    required: true,
  },
  message: { type: String, required: true },
  refModel: { type: String },
  refId: { type: mongoose.Schema.Types.ObjectId }, 
  data: { type: Object }, 
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Notification = mongoose.models.Notification ||  mongoose.model('Notification', notificationSchema);
export default Notification;
