import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  location: String, 
  logoUrl: String,
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  confessions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Confession',
    required: true
  }],
  news: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'News',
    required: true
  }],
  totalUsers: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const College= mongoose.models.College || mongoose.model('College', collegeSchema);
export default College