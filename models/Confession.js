import mongoose from 'mongoose';

const confessionSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  college: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
  targetUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  hasTargetUser: {
    type:Boolean,
    default:false
  },
  
  tags: [{
    type: String,
  }],

  isAnonymous: { type: Boolean, default: false },
  spForRevealIdentity: { type: Number, default: 0 },

  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  
  reactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reaction" }],
  likes : [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
  likesCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
  isTrending: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Confession = mongoose.models.Confession || mongoose.model('Confession', confessionSchema);

export default Confession;
