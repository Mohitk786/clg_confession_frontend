// lib/dbConnect.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://kumarmohit08004:tdor0421@cluster0.tbbon.mongodb.net/clg567" ;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const dbConnect = async () => {
  if (cached.conn) return cached.conn;

  try {
    if (!cached.promise) {
     
      cached.promise = mongoose.connect(MONGODB_URI, {
        bufferCommands: false,
      });
    }
  
    cached.conn = await cached.promise;
    console.log("✅ MongoDB connected successfully.");
    return cached.conn;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    throw new Error(error);
  }
};
