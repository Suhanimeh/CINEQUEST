
require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const resourceRoutes = require("./routes/resourceRoutes");

const app = express();

// Middleware to read JSON request bodies
app.use(express.json());
app.use("/api/resources", resourceRoutes);

// Health check route
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "CineQuest API is running"
    });
});

// Start server after connecting to MongoDB
const startServer = async () => {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`CineQuest server running on port ${PORT}`);
    });
};

startServer();
