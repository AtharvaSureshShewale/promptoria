import mongoose from "mongoose";
import 'dotenv/config';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Connected");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1); 
  }
};

export default connectDB;
