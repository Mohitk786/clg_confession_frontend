import mongoose from "mongoose";


const NewsSchema = new mongoose.Schema({
    content: { type: String },
    title: { type: String, required: true },
    tags: [{ type: String, required: true }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    college: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
    likes: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    image:{ type:String},
    reactions: [{type: mongoose.Schema.Types.ObjectId, ref: "Reaction"}],
    commentsCount: { type: Number, default: 0 }, 
    isTrending: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  });
  
const News = mongoose.models.News ||  mongoose.model('News', NewsSchema);
  export default News;