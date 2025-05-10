import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' 
  },
  confessionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Confession' 
  },
  amount: {
    type: Number,
    required: true
  },
  orderId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  receipt: {
    type: String,
    required: true
  },
  notes: {
    type: mongoose.Schema.Types.Mixed, 
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now 
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to auto-update `updatedAt`
paymentSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const Payment = mongoose.models.Payment || mongoose.model('Payment', paymentSchema);
export default Payment;
