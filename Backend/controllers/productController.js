const productService = require("../services/productService");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");
// Create Product
const createProduct = async (req, res) => {
    try {

         console.log("========== DEBUG ==========");
         console.log("Headers:", req.headers);
         console.log("Body:", req.body);
         console.log("File:", req.file);
         console.log("===========================");

        const data = {
            name: req.body.name,
            price: req.body.price,
            categoryId: req.body.categoryId,
            image: req.file ? req.file.filename : null
        };

        const product = await productService.createProduct(data);

        res.status(201).json({
            message: "Product Created Successfully",
            product
        });

    } catch (err) {

        res.status(400).json({
            message: err.message
        });

    }
};

// Get All Products
const getAllProducts = async (req, res) => {

    try {

       const products = await productService.getAllProducts(req.query);

        res.status(200).json(products);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// Get Product By Id
const getProductById = async (req, res) => {

    try {

        const product = await productService.getProductById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(product);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// Update Product
const updateProduct = async (req, res) => {

    try {

        const data = {
            name: req.body.name,
            price: req.body.price,
            categoryId: req.body.categoryId,
            image: req.file ? req.file.filename : req.body.image
        };

        const product = await productService.updateProduct(
            req.params.id,
            data
        );

        res.status(200).json({
            message: "Product Updated Successfully",
            product
        });

    } catch (err) {

        res.status(400).json({
            message: err.message
        });

    }

};

// Delete Product
const deleteProduct = async (req, res) => {

    try {

        await productService.deleteProduct(req.params.id);

        res.status(200).json({
            message: "Product Deleted Successfully"
        });

    } catch (err) {

        res.status(400).json({
            message: err.message
        });

    }

};
const exportProducts = async (req, res) => {

    try {

        const products = await productService.getProductsForExport();

        const data = products.map(product => ({

            ID: product.id,

            Name: product.name,

            Price: product.price,

            Category: product.Category
                ? product.Category.name
                : "",

            Image: product.image

        }));

        const workbook = XLSX.utils.book_new();

        const worksheet = XLSX.utils.json_to_sheet(data);

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Products"
        );

        const exportPath = path.join(
            __dirname,
            "../exports/products.xlsx"
        );

        if (!fs.existsSync(path.join(__dirname, "../exports"))) {

            fs.mkdirSync(path.join(__dirname, "../exports"));

        }

        XLSX.writeFile(workbook, exportPath);

        res.download(exportPath);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};
const exportProductsCSV = async (req, res) => {

    try {

        const products = await productService.getProductsForExport();

        const exportFolder = path.join(__dirname, "../exports");

        if (!fs.existsSync(exportFolder)) {

            fs.mkdirSync(exportFolder);

        }

        const csvWriter = createCsvWriter({

            path: path.join(exportFolder, "products.csv"),

            header: [

                { id: "id", title: "ID" },

                { id: "name", title: "NAME" },

                { id: "price", title: "PRICE" },

                { id: "category", title: "CATEGORY" },

                { id: "image", title: "IMAGE" }

            ]

        });

        const records = products.map(product => ({

            id: product.id,

            name: product.name,

            price: product.price,

            category: product.Category
                ? product.Category.name
                : "",

            image: product.image

        }));

        await csvWriter.writeRecords(records);

        res.download(path.join(exportFolder, "products.csv"));

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};
module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    exportProducts,
    exportProductsCSV
};