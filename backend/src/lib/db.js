import mongoose from "mongoose";
import { ENV } from "./env.js";

let isConnected = false;

export const connectDB = async () => {
  try {
    if (isConnected) {
      console.log("Using existing database connection");
      return;
    }

    const conn = await mongoose.connect(ENV.DB_URL);

    isConnected = true;

    console.log("Connected to MongoDB:", conn.connection.host);

  } catch (error) {
    console.error("Error connecting to MongoDB", error);

    throw error;
  }
};