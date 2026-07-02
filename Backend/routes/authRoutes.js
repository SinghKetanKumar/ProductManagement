const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// Test Route
router.get("/test", (req, res) => {
    res.send("Auth Route Working");
});

// Register Route
router.post("/register", authController.register);
router.post("/login", authController.login);
module.exports = router;