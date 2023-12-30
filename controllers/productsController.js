import { Category } from "../models/categoriesModel.js"
import { Product } from "../models/productsModel.js"

export const createProductController = async (req, res) => {
	const { name, description, richDescription, image, brand, price, categoryId, countInStock, rating, numReviews, isFeatured } = req.body

	try {
		if (!name) {
			throw Error("You must provide a name")
		}
		const category = await Category.findById(categoryId)
		if (!category) {
			return res.status(400).json({
				success: false,
				message: "Invalid category",
			})
		}

		let newProduct = await Product({
			name,
			description,
			richDescription,
			image,
			brand,
			price,
			category: categoryId,
			countInStock,
			rating,
			numReviews,
			isFeatured,
		})

		newProduct = await newProduct.save()

		if (!newProduct) {
			return res.status(500).json({
				success: false,
				message: "The product cannot be created.",
			})
		}

		return res.status(200).json({
			success: true,
			message: "Product created successfully",
			newProduct,
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}

export const getSingleProductController = async (req, res) => {
	const { id } = req.query
	try {
		if (!id) {
			throw Error("Provide a valid id")
		}
		const product = await Product.findById(id).populate("category") //include the category document

		if (!product) {
			return res.status(404).json({
				success: false,
				message: "Could not fetch product",
			})
		}

		return res.status(200).json({
			success: true,
			product,
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}

export const getAllProductsController = async (req, res) => {
	try {
		const allProducts = await Product.find({}).select("name image ").populate("category") // select the  name, image and exclude image
		if (!allProducts) {
			return res.status(400).json({
				success: false,
				message: "Could not fetch all products",
			})
		}

		return res.status(200).json({
			success: true,
			allProducts,
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}

export const updateProductController = async (req, res) => {
	const { name, description, richDescription, image, brand, price, categoryId, countInStock, rating, numReviews, isFeatured } = req.body

	const { productId } = req.query
	try {
		if (!productId) {
			throw Error("Provide a valid product id")
		}

		const validCategory = await Category.findById(categoryId)
		if (!validCategory) {
			throw Error("Enter a valid category")
		}

		const updatedProduct = await Product.findByIdAndUpdate(
			{
				_id: productId,
			},
			{
				name,
				description,
				richDescription,
				image,
				brand,
				price,
				categoryId,
				countInStock,
				rating,
				numReviews,
				isFeatured,
			},
			{ new: true }
		)
		if (!updatedProduct) {
			return res.status(500).json({
				success: false,
				message: "Cannot update product.",
			})
		}
		return res.status(200).json({
			success: true,
			message: "Product updated successfully.",
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}

export const deleteProductController = async (req, res) => {
	const { id } = req.params
	try {
		if (!id) {
			throw Error("You must provide a valid product id.")
		}

		await Product.findByIdAndDelete(id)

		return res.status(200).json({
			success: true,
			message: "Product deleted successfully",
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}
