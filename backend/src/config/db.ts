import mongoose from "mongoose";
import "dotenv/config";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL!);
    console.log("DB connection established");
  } catch (error) {
    console.log("DB connection error");
    console.log(error);
  }
}
