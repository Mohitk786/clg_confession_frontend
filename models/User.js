import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  profileCompleted: { type: Boolean, default: false },
  isPhoneVerified: { type: Boolean, default: false },
  gender: {
    type: String,
    enum: ["MALE", "FEMALE"],
    required: [true, "Gender is required"],
  },
  name: { type: String },
  username: { type: String, unique: true ,sparse:true},
  profileImage: { type: String },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
  },
  interestedInHookup: { type: Boolean, default: false },

  sp: { type: Number, default: 75 },
  joinedAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);;
export default User;