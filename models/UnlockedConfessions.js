import mongoose from "mongoose";

const unlockedConfessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  canView: {
    type: Boolean,
    default: false,
  },
  confessionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Confession",
  },
  unlockedAt: {
    type: Date,
    default: Date.now,
  },
});


unlockedConfessionSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const UnlockedConfession =
  mongoose.models.UnlockedConfession ||
  mongoose.model("UnlockedConfession", unlockedConfessionSchema);