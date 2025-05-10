import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  year: {
    type: String,
    enum: ["1", "2", "3", "4", "5"],
  },
  course: {
    type: String,
    enum: [
      "BTECH",
      "MTECH",
      "MBA",
      "MSC",
      "BSC",
      "BCA",
      "MCA",
      "BBA",
      "MA",
      "BA",
      "PHD",
      "OTHER",
    ],
  },

  Branch: { type: String},
  section: { type: String},
  profileImage: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: { type: Date, default: Date.now },
});

const Profile = mongoose.models.Profile || mongoose.model('Profile', profileSchema);;
export default Profile;