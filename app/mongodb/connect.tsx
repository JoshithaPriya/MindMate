import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

async function connectDB() {
  return mongoose.connect(MONGODB_URI);
}



export default connectDB