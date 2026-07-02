const Product = require("../models/Product");
const Category = require("../models/Category");

// Create Product
const createProduct = async (data) => {

    const category = await Category.findByPk(data.categoryId);

    if (!category) {
        throw new Error("Category not found");
    }

    const product = await Product.create({
        name: data.name,
        price: data.price,
        image: data.image,
        categoryId: data.categoryId
    });

    return product;
};

const { Op } = require("sequelize");

const getAllProducts = async (query) => {

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 5;
    const offset = (page - 1) * limit;

    const where = {};

    if (query.search) {

        where.name = {
            [Op.iLike]: `%${query.search}%`
        };

    }

    if (query.categoryId) {

        where.categoryId = query.categoryId;

    }

    const sortField = query.sort || "id";
    const sortOrder = query.order || "ASC";

    const products = await Product.findAndCountAll({

        where,

        include: Category,

        limit,

        offset,

        order: [[sortField, sortOrder]]

    });

    return {

        totalRecords: products.count,

        totalPages: Math.ceil(products.count / limit),

        currentPage: page,

        data: products.rows

    };

};

// Get Product By Id
const getProductById = async (id) => {

    return await Product.findByPk(id, {
        include: Category
    });

};

// Update Product
const updateProduct = async (id, data) => {

    const product = await Product.findByPk(id);

    if (!product) {
        throw new Error("Product not found");
    }

    await product.update(data);

    return product;

};

// Delete Product
const deleteProduct = async (id) => {

    const product = await Product.findByPk(id);

    if (!product) {
        throw new Error("Product not found");
    }

    await product.destroy();

};
const getProductsForExport = async () => {

    return await Product.findAll({
        include: Category
    });

};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductsForExport
};