import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

async function connectDB() {
  return mongoose.connect("mongodb+srv://RAMPRASANNA:rockyy@project.26nbhxz.mongodb.net/?retryWrites=true&w=majority&appName=project");
}



export default connectDB