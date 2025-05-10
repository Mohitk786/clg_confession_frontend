import mongoose from "mongoose";


const likeSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  
    
    createdAt: { type: Date, default: Date.now }
  });
  
const Like = mongoose.models.Like || mongoose.model('Like', likeSchema);
export default Like;  