import mongoose from "mongoose";

const ReactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, required: true },
  
  emoji: {
    type: String,
    default: null,
  },
  createdAt: { type: Date, default: Date.now },
});


const Reaction = mongoose.models.Reaction || mongoose.model("Reaction", ReactionSchema);
export default Reaction;

