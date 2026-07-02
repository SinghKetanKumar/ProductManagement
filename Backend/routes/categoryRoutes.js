const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");
const verifyToken = require("../middleware/authMiddleware");

// Protected Routes
router.post("/", verifyToken, categoryController.create);
router.put("/:id", verifyToken, categoryController.update);
router.delete("/:id", verifyToken, categoryController.remove);

// Public Routes
router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getById);

module.exports = router;