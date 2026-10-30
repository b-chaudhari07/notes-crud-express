import mongoose from "mongoose";
export async function connectDb() {

    try {
        const connected = await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected Sucessfully");
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}