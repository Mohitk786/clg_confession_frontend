import mongoose from "mongoose";


const ReactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    post: {type: mongoose.Schema.Types.ObjectId},
    createdAt: { type: Date, default: Date.now },
});

const Reaction = mongoose.model.Reaction || mongoose.model("Reaction", ReactionSchema);
export default Reaction;