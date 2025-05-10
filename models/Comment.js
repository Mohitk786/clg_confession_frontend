import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    confession: { type: mongoose.Schema.Types.ObjectId, ref: 'Confession' },
    content: { type: String, required: true },
  
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    createdAt: { type: Date, default: Date.now }
  });
  
const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);
export default Comment;  