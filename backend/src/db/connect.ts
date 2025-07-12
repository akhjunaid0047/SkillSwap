import { connect,disconnect } from "mongoose"
const connectDB = async()=>{
    try {
        await connect(process.env.MONGO_URI as string, );
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
}

export default connectDB;