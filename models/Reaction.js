import mongoose from "mongoose";

const ReactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  confession: { type: mongoose.Schema.Types.ObjectId, ref: "Confession", required: true },
  
  // Either a "like" or "dislike"
  reactionType: {
    type: String,
    enum: ["like", "emoji"],
    default: null,
  },

  emoji: {
    type: String,
    default: null,
  },
  isLike: {
    type: Boolean,
    default: false,
  },

  createdAt: { type: Date, default: Date.now },
});


const Reaction = mongoose.models.Reaction || mongoose.model("Reaction", ReactionSchema);
export default Reaction;
