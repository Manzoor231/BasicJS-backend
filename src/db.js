import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      process.env.MONG_URL
    );
    console.log(
      `database has been connected succesfully at ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`database connection Error: ${error}`);
    process.exit(1);
  }
};
export default dbConnect;
