import mongoose from "mongoose"
import { Category } from "../models/categoriesModel.js"
import { Product } from "../models/productsModel.js"
import _ from "lodash"

export const createProductController = async (req, res) => {
	const { name, description, richDescription, brand, price, categoryId, countInStock, rating, numReviews, isFeatured } = req.body
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

		const { file } = req
		if (!file) {
			return res.status(400).json({
				success: false,
				message: "You must provide a product image",
			})
		}
		const { filename } = req.file
		const baseUrl = `${req.protocol}://${req.get("host")}/public/upload`
		let newProduct = await Product({
			name,
			description,
			richDescription,
			image: `${baseUrl}/${filename}`,
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

// export const getAllProductsController = async (req, res) => {
// 	try {
// 		const allProducts = await Product.find({}).select("name image ").populate("category") // select the  name, image and exclude image
// 		if (!allProducts) {
// 			return res.status(400).json({
// 				success: false,
// 				message: "Could not fetch all products",
// 			})
// 		}

// 		return res.status(200).json({
// 			success: true,
// 			allProducts,
// 		})
// 	} catch (error) {
// 		return res.status(500).json({
// 			success: false,
// 			message: error.message,
// 		})
// 	}
// }

export const getAllProductsController = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1
		const pageSize = parseInt(req.query.pageSize) || 4

		const skip = (page - 1) * pageSize

		const allProducts = await Product.find({}).select("name image description price countInStock").populate("category").skip(skip).limit(pageSize)

		if (!allProducts) {
			return res.status(400).json({
				success: false,
				message: "Could not fetch all products",
			})
		}
		if (allProducts.length === 0) {
			return res.status(200).json({
				success: true,
				allProducts,
				message: "All products fetched",
			})
		}

		return res.status(200).json({
			success: true,
			allProducts,
			currentPage: page,
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}

export const getProductCountController = async (req, res) => {
	try {
		const productCount = await Product.countDocuments()

		if (!productCount) {
			return res.status(500).json({
				success: false,
			})
		}
		return res.status(200).json({
			success: true,
			productCount,
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}

const getRandomProductByCategoryController = async (id) => {
	const allCategories = await Category.find({}).select("id name")

	const randomId = Math.floor(Math.random() * allCategories.length)
	// console.log(allCategories[randomId])

	const randomCategoryProducts = await Product.find({ category: id }).select("name description image price countInStock")
	const randomCategoryData = await Category.findById(id).select("name")
	// console.log(randomCategoryProducts)
	return { randomCategoryProducts, randomCategoryData }
}

export const getFeaturedProductCountController = async (req, res) => {
	// const limit = 4
	const limit = req.query.limit || 4

	const allCategories = await Category.find({}).select("id")
	const randomId = Math.floor(Math.random() * allCategories.length)
	// console.log(allCategories[randomId])

	try {
		const featuredProduct = await Product.find({ isFeatured: true }).populate("category").limit(+limit) //+sign coonverts the limit to an int.
		const { randomCategoryProducts, randomCategoryData } = await getRandomProductByCategoryController(allCategories[randomId])
		// console.log(randomCategoryProducts)
		if (!featuredProduct) {
			return res.status(500).json({
				success: false,
			})
		}
		res.status(200).json({
			success: true,
			featuredProduct,
			randomCategoryProducts,

			randomCategoryData,
		})
	} catch (error) {
		// console.log(error)
		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}
// getFeaturedProductCountController()

export const updateProductController = async (req, res) => {
	const { richDescription, price, countInStock, isFeatured } = req.body
	let newImageUrl = null
	const { productId } = req.query
	try {
		if (!productId) {
			throw Error("Provide a valid product id")
		}

		const { file } = req
		if (file) {
			const { filename } = req.file
			const baseUrl = `${req.protocol}://${req.get("host")}/public/upload`
			newImageUrl = `${baseUrl}/${filename}`
		}

		const product = await Product.findById(productId)

		const updatedProduct = await Product.findByIdAndUpdate(
			{
				_id: productId,
			},
			{
				richDescription,
				image: !_.isNull(newImageUrl) ? newImageUrl : product.image,
				price,
				countInStock,
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
		console.log(error)
		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}

export const uploadMultipleImagesController = async (req, res) => {
	const { productId } = req.params
	try {
		if (!productId || !mongoose.isValidObjectId(productId)) {
			return res.status(400).json({
				success: false,
				message: "Invalid product Id",
			})
		}
		const files = req.files
		let imagesPaths = []
		const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`

		if (files) {
			files.map((file) => {
				imagesPaths.push(`${basePath}${file.filename}`)
			})
		}

		const product = await Product.findByIdAndUpdate(
			productId,
			{
				images: imagesPaths,
			},
			{ new: true }
		)

		if (!product) {
			return res.status(500).json({ message: "The gallery cannot be updated!", success: false })
		}

		res.status(200).json({ success: true, product })
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
