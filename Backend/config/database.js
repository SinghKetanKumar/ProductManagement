const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres",
        logging: false
    }
);

// Connect to PostgreSQL
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ PostgreSQL Connected Successfully");
    } catch (error) {
        console.error("❌ Database Connection Failed");
        console.error(error.message);
    }
};

// Create tables if they don't exist
const syncDB = async () => {
    try {
        await sequelize.sync();
        console.log("✅ All Tables Created Successfully");
    } catch (error) {
        console.error("❌ Error Creating Tables");
        console.error(error.message);
    }
};

module.exports = {
    sequelize,
    connectDB,
    syncDB
};