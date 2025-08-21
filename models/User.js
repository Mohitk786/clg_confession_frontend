import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    sparse: true,
  },
  profileCompleted: { type: Boolean, default: false },
  gender: {
    type: String,
    enum: ["MALE", "FEMALE", "OTHER"],
  },
  email: { type: String, required: [true, "Email is required"], unique: true },
  password: { type: String, required: [true, "Password is required"] },
  name: { type: String },
  referCode: { type: String},
  username: { type: String, unique: true, sparse:true},
  profileImage: { type: String },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
  },
  relationshipStatus: {
    type: String,
    enum: ["SINGLE", "IN A RELATIONSHIP", "COMPLICATED"],
    default: "SINGLE",
  },

  sp: { type: Number, default: 75 },
  paidFor: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Confession",
  }],
  policyAccepted: {
    type: Boolean,
    default: false,
  },
  verificationToken: { type: String },
  verificationTokenExpires: { type: Date },
  isVerified: { type: Boolean, default: false },
  joinedAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);;
export default User;