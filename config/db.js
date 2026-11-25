
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is missing from the .env file");
        }

        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB Atlas connected successfully!");
        console.log("Connected database name:", mongoose.connection.name);
        console.log("Connected collection for Movie:", mongoose.connection.collection("movies").collectionName);

    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
