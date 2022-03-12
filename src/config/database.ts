import mongoose from "mongoose";

const connectDB = async () => {
  const uri = `mongodb+srv://admin:AAvfbMtvgDKJuNwo@cluster0.8csye.mongodb.net/ox-test?retryWrites=true&w=majority`;

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
