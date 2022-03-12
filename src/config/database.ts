import mongoose from "mongoose";
import server from "./server";

const connectDB = async () => {
  const uri = server.db.uri;

  try {
    const {
      connection: { name },
    } = await mongoose.connect(uri);

    console.log("Database connected to", name);
  } catch {
    return;
  }
};

export default connectDB;
