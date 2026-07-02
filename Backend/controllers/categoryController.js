const categoryService = require("../services/categoryService");

const create = async (req, res) => {

    try {

        const { name } = req.body;
       

        if (!name || name.trim() === "") {
            return res.status(400).json({
                message: "Category name is required"
            });
        }
        const category = await categoryService.createCategory(name);

        res.status(201).json({
            message: "Category Created Successfully",
            category
        });

    } catch (err) {

        res.status(400).json({
            message: err.message
        });

    }

};

const getAll = async (req, res) => {

    try {

        const categories = await categoryService.getAllCategories();

        res.json(categories);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

const getById = async (req, res) => {

    try {

        const category = await categoryService.getCategoryById(req.params.id);

        res.json(category);

    } catch (err) {

        res.status(404).json({
            message: err.message
        });

    }

};

const update = async (req, res) => {

    try {
        const { name } = req.body;

        if (!name || name.trim() === "") {
            return res.status(400).json({
                message: "Category name is required"
            });
        }
        const category = await categoryService.updateCategory(
            req.params.id,
            req.body.name
        );

        res.json({
            message: "Category Updated Successfully",
            category
        });

    } catch (err) {

        res.status(400).json({
            message: err.message
        });

    }

};

const remove = async (req, res) => {

    try {

        await categoryService.deleteCategory(req.params.id);

        res.json({
            message: "Category Deleted Successfully"
        });

    } catch (err) {

        res.status(400).json({
            message: err.message
        });

    }

};

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
};