import twilio from 'twilio';
import OTPVerification from '../models/Otp'; 
import { dbConnect } from '@/lib/dbConnect';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendOTP(phoneNumber) {
    await dbConnect();
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); 
    const expirationTime = new Date(new Date().getTime() + 5 * 60 * 1000); 
    
    // Save OTP and expiration time in database
    const otpRecord = new OTPVerification({
      phone: phoneNumber,
      otp: otp,
      expiresAt: expirationTime
    });
    
    
    await otpRecord.save();
  
    await client.messages.create({
      body: `Your OTP for login is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });
  
    return { message: "OTP sent successfully!" };
  }
  
  module.exports = { sendOTP };