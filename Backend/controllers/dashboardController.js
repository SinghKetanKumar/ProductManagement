const Product = require("../models/Product");
const Category = require("../models/Category");
const { Sequelize } = require("sequelize");

const getDashboard = async (req, res) => {

    try {

        const totalProducts = await Product.count();

        const totalCategories = await Category.count();

        const totalValue = await Product.sum("price");

        const latestProducts = await Product.findAll({

            limit: 5,

            order: [["createdAt", "DESC"]],

            include: Category

        });

        res.json({

            totalProducts,

            totalCategories,

            totalValue,

            latestProducts

        });

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

module.exports = {

    getDashboard

};