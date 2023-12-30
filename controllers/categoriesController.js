import _ from "lodash"
import { Category } from "../models/categoriesModel.js"

export const createCategoryController = async (req, res) => {
	const { name, icon, color } = req.body

	try {
		if (!name) {
			throw Error("Category name must be provided!")
		}

		let category = new Category({
			name: _.toLower(name),
			icon,
			color,
		})

		const existingCategory = await Category.findOne({ name: _.toLower(name) })
		if (existingCategory) {
			return res.status(200).json({
				success: false,
				message: "Category exists!",
			})
		}

		category = await category.save()

		if (!category) {
			return res.status(404).json({
				success: false,
				message: "Category not created.",
			})
		}

		return res.status(201).json({
			success: true,
			message: "Category created successfully",
			id: category._id,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}

export const getAllCategoriesController = async (req, res) => {
	try {
		const allCategories = await Category.find({})

		if (!allCategories) {
			throw Error("Error fetching all categories")
		}
		res.status(200).send({
			success: true,
			message: "All categories list",
			allCategories,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}

export const updateCategoryController = async (req, res) => {
	const { id } = req.query
	const { name, color, icon } = req.body
	try {
		if (!id) {
			throw Error("You must provide a valid id.")
		}

		if (!name) {
			console.log(true)
			throw Error("Category name must be provided!")
		}

		const category = await Category.findByIdAndUpdate(id, { name: _.toLower(name), color, icon }, { new: true })
		res.status(200).json({
			success: true,
			message: "Category was updated successfully.",
			category,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}

export const deleteCategoryController = async (req, res) => {
	const { id } = req.params
	try {
		if (!id) {
			throw Error("You must provide a valid id.")
		}

		const deletedCategory = await Category.findByIdAndDelete(id)

		return res.status(200).json({
			success: true,
			message: "Category deleted successfully",
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}
