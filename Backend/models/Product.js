const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Category = require("./Category");

const Product = sequelize.define("Product", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    uniqueId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    image: {
        type: DataTypes.STRING
    },

    price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },

    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "CategoryId"   // Maps JS property to DB column
    }

}, {
    timestamps: true
});

Category.hasMany(Product, {
    foreignKey: {
        name: "categoryId",
        field: "CategoryId"
    }
});

Product.belongsTo(Category, {
    foreignKey: {
        name: "categoryId",
        field: "CategoryId"
    }
});

module.exports = Product;