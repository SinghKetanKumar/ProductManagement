const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const productController = require("../controllers/productController");

router.post(
    "/",
    authMiddleware,
    upload.single("image"),
    productController.createProduct
);
router.get(
    "/export",
    authMiddleware,
    productController.exportProducts
);
router.get(
    "/exportcsv",
    authMiddleware,
    productController.exportProductsCSV
);
router.post("/", authMiddleware, upload.single("image"), productController.createProduct);
router.get("/export", authMiddleware, productController.exportProducts);
router.get("/exportcsv", authMiddleware, productController.exportProductsCSV);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", authMiddleware, upload.single("image"), productController.updateProduct);
router.delete("/:id", authMiddleware, productController.deleteProduct);

module.exports = router;