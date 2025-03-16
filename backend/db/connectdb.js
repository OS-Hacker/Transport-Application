import mongoose from "mongoose";

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("database connected successfully");
  } catch (error) {
    console.log(error);
  }
};

export default connectdb;
