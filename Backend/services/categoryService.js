const Category = require("../models/Category");

const createCategory = async (name) => {

    const existingCategory = await Category.findOne({
        where: { name }
    });

    if (existingCategory) {
        throw new Error("Category already exists");
    }

    const category = await Category.create({
        name
    });

    return category;
};

const getAllCategories = async () => {
    return await Category.findAll({
        order: [["id", "ASC"]]
    });
};

const getCategoryById = async (id) => {

    const category = await Category.findByPk(id);

    if (!category) {
        throw new Error("Category not found");
    }

    return category;
};

const updateCategory = async (id, name) => {

    const category = await Category.findByPk(id);

    if (!category) {
        throw new Error("Category not found");
    }

    const existingCategory = await Category.findOne({
        where: { name }
    });

    if (existingCategory && existingCategory.id != category.id) {
        throw new Error("Category name already exists");
    }

    category.name = name;

    await category.save();

    return category;
};

const deleteCategory = async (id) => {

    const category = await Category.findByPk(id);

    if (!category) {
        throw new Error("Category not found");
    }

    await category.destroy();

    return true;
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};