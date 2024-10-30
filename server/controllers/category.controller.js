import Category from '../models/user.model.js';
import extend from 'lodash/extend.js';
import errorHandler from './error.controller.js';

const create = async (req, res) => {
    const category = new Category(req.body);
    try {
        await category.save();
        return res.status(200).json({
            message: "Successfully created category",
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
};

const categoryByID = async (req, res, next, id) => {
    try {
        let category = await Category.findById(id);
        if (!category) {
            return res.status(400).json({
                error: "Category not found",
            });
        }
        req.profile = category;
        next();
    } catch (err) {
        return res.status(400).json({
            error: "Could not retrieve category",
        });
    }
};

const list = async (req, res) => {
    try {
        let categories = await Category.find().select('name description parentCategory');
        res.json(categories);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
};

const update = async (req, res) => {
    try {
        let category = req.profile;
        category = extend(category, req.body);
        await category.save();
        res.json(category);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
};

const remove = async (req, res) => {
    try {
        let category = req.profile;
        let deletedCategory = await category.remove();
        res.json(deletedCategory);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
};

export default { create, categoryByID, list, update, remove };