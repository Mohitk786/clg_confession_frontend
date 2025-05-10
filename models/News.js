import mongoose from "mongoose";


const NewsSchema = new mongoose.Schema({
    content: { type: String },
    title: { type: String, required: true },
    tags: [{ type: String}],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    college: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    image:{ type:String},
    reactions: [{type: mongoose.Schema.Types.ObjectId, ref: "Reaction"}],
    isTrending: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  });
  
const News = mongoose.models.News ||  mongoose.model('News', NewsSchema);
  export default News;