import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    phone: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    verified: { type: Boolean, default: false }
  });
  
  const  OTPVerification = mongoose.models.OTPVerification || mongoose.model('OTPVerification', otpSchema);
  export default OTPVerification;