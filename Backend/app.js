const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const { connectDB, syncDB } = require("./config/database");
const dashboardRoutes = require("./routes/dashboardRoutes");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
// Import models BEFORE sync()
require("./models/User");
require("./models/Category");
require("./models/Product");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
const startServer = async () => {
    await connectDB();
    await syncDB();
};

startServer();

app.get("/", (req, res) => {
    res.send("Product Management API Running...");
});

const PORT = process.env.PORT || 3000;
const verifyToken = require("./middleware/authMiddleware");

app.get("/api/profile", verifyToken, (req, res) => {

    res.json({
        message: "Welcome",
        user: req.user
    });

});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});