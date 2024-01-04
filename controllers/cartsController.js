import { User } from "../models/usersModel.js"
import { Cart } from "../models/cartsModel.js"
import { CartItem } from "../models/cartItemModel.js"

// export const addToCartController = async (req, res) => {
// 	const { userId } = req.user
// 	const { productId, quantity } = req.body

// 	try {
// 		let user = await User.findById(userId).populate("cart")
// 		// let user = await User.findById(userId)

// 		if (!user.cart) {
// 			const cart = new Cart({ user: userId, cartItems: [] })
// 			user.cart = cart._id
// 			await cart.save()
// 		}
// 		console.log(user)

// 		const existingCart = await Cart.findOne({ user: userId })

// 		if (existingCart) {
// 			// Update existing cart
// 			existingCart.cartItems.push(newCartItem)
// 			await existingCart.save()
// 		} else {
// 			// Create a new cart
// 			const cart = new Cart({ user: userId, cartItems: [newCartItem] })
// 			await cart.save()
// 			user.cart = cart._id
// 			await user.save()
// 		}

// 		await user.cart.save()
// 		await user.save()

// 		res.status(200).json({ success: true, message: "Product added to cart successfully" })
// 	} catch (error) {
// 		console.error(error)
// 		res.status(500).json({ error: "Internal Server Error", success: false })
// 	}
// }

// export const addToCartController = async (req, res) => {
// 	const { userId } = req.user
// 	const { productId, quantity } = req.body

// 	try {
// 		// Find user and populate cart
// 		let user = await User.findOne({ _id: userId }).populate("cart")

// 		// If user does not have a cart, create a new one
// 		if (!user.cart) {
//             // Create a new cart
// 			const cart = new Cart({ user: userId, cartItems: [] })
// 			user.cart = cart._id
// 			await cart.save()
// 			await user.save()
// 		}

// 		// Check for existing cart
// 		const existingCart = await Cart.findOne({ user: userId })

// 		// Create a new cart item
// 		const newCartItem = new CartItem({
// 			quantity,
// 			product: productId,
// 		})

// 		if (existingCart) {
// 			existingCart.cartItems.push(newCartItem)
// 			await existingCart.save()
// 		} else {
// 			// Create a new cart
// 			const cart = new Cart({ user: userId, cartItems: [newCartItem] })
// 			await cart.save()
// 			user.cart = cart._id
// 			await user.save()
// 		}

// 		res.status(200).json({ success: true, message: "Product added to cart successfully" })
// 	} catch (error) {
// 		console.error(error)
// 		res.status(500).json({ error: "Internal Server Error", success: false })
// 	}
// }

// export const addToCartController = async (req, res) => {
// 	const { userId } = req.user
// 	const { productId, quantity } = req.body

// 	try {
// 		// Find user and populate cart
// 		let user = await User.findOne({ _id: userId }).populate("cart")

// 		// If user does not have a cart, create a new one
// 		if (!user.cart) {
// 			// Create a new cart
// 			const cart = new Cart({ user: userId, cartItems: [] })
// 			user.cart = cart._id
// 			await cart.save()
// 			await user.save()
// 		}

// 		// Check for existing cart item for the product
// 		const existingCartItem = user.cart.cartItems.find((item) => item.product.toString() === productId)

// 		if (existingCartItem) {
// 			// If the product already exists in the cart, update the quantity
// 			existingCartItem.quantity += quantity
// 			await user.cart.save()
// 		} else {
// 			// Create a new cart item
// 			const newCartItem = new CartItem({
// 				quantity,
// 				product: productId,
// 			})

// 			// Add the new cart item to the cart
// 			user.cart.cartItems.push(newCartItem)
// 			await user.cart.save()
// 		}

// 		res.status(200).json({ success: true, message: "Product added to cart successfully" })
// 	} catch (error) {
// 		console.error(error)
// 		res.status(500).json({ error: "Internal Server Error", success: false })
// 	}
// }

// export const addToCartController = async (req, res) => {
// 	const { userId } = req.user
// 	const { productId, quantity } = req.body

// 	try {
// 		// Find user and populate cart
// 		let user = await User.findOne({ _id: userId }).populate("cart")

// 		if (!user.cart) {
// 			// Create a new cart
// 			const cart = new Cart({ user: userId, cartItems: [] })
// 			user.cart = cart._id
// 			await cart.save()
// 			await user.save()
// 		}

// 		const existingCartItem = user.cart.cartItems.find((item) => item.product && item.product.toString() === productId)

// 		if (existingCartItem) {
// 			// If the product already exists in the cart, update the quantity
// 			console.log(existingCartItem.quantity)
// 			existingCartItem.quantity += quantity
// 			await user.cart.save()
// 		} else {
// 			// Create a new cart item
// 			const newCartItem = new CartItem({
// 				quantity,
// 				product: productId,
// 			})
// 			user.cart.cartItems.push(newCartItem)
// 			await newCartItem.save()
// 			await user.cart.save()
// 		}

// 		const updatedUser = await User.findOne({ _id: userId }).populate({
// 			path: "cart",
// 			populate: {
// 				path: "cartItems",
// 			},
// 		})

// 		res.status(200).json({ success: true, message: "Product added to cart successfully", cart: updatedUser.cart })
// 	} catch (error) {
// 		console.error(error)
// 		res.status(500).json({ error: "Internal Server Error", success: false })
// 	}
// }

// export const addToCartController = async (req, res) => {
// 	const { userId } = req.user
// 	const { productId, quantity } = req.body

// 	try {
// 		// Find user and populate cart
// 		const user = await User.findById(userId).populate("cart")

// 		// If user does not have a cart, create a new one
// 		if (!user.cart) {
// 			const cart = new Cart({ user: userId, cartItems: [] })
// 			user.cart = cart._id
// 			await cart.save()
// 			await user.save()
// 		}

// 		// Check for existing cart item for the product
// 		const existingCartItem = user.cart.cartItems.find((item) => item.product.toString() === productId)

// 		if (existingCartItem) {
// 			// If the product already exists in the cart, update the quantity
// 			existingCartItem.quantity += quantity
// 			await existingCartItem.save()
// 		} else {
// 			// Create a new cart item
// 			const newCartItem = new CartItem({
// 				quantity,
// 				product: productId,
// 			})
// 			user.cart.cartItems.push(newCartItem)
// 			await user.cart.save()
// 		}

// 		const updatedUser = await User.findById(userId).populate({
// 			path: "cart",
// 			populate: {
// 				path: "cartItems",
// 			},
// 		})

// 		res.status(200).json({
// 			success: true,
// 			message: "Product added to cart successfully",
// 			cart: updatedUser.cart,
// 		})
// 	} catch (error) {
// 		console.error(error)
// 		res.status(500).json({ error: "Internal Server Error", success: false })
// 	}
// }

// export const addToCartController = async (req, res) => {
// 	const { userId } = req.user
// 	const { productId, quantity } = req.body

// 	try {
// 		// Find user and populate cart
// 		const user = await User.findById(userId).populate("cart")

// 		// If user does not have a cart, create a new one
// 		if (!user.cart) {
// 			const cart = new Cart({ user: userId, cartItems: [] })
// 			user.cart = cart._id
// 			await cart.save()
// 			await user.save()
// 		}

// 		// Check for existing cart item for the product
// 		if (!user.cart.cartItems) {
// 			user.cart.cartItems = []
// 		}

// 		const existingCartItem = user.cart.cartItems.find((item) => item.product && item.product.toString() === productId)

// 		if (existingCartItem) {
// 			// If the product already exists in the cart, update the quantity
// 			existingCartItem.quantity += quantity
// 			await existingCartItem.save()
// 		} else {
// 			// Create a new cart item
// 			const newCartItem = new CartItem({
// 				quantity,
// 				product: productId,
// 			})
// 			user.cart.cartItems.push(newCartItem)
// 			await user.cart.save()
// 		}

// 		const updatedUser = await User.findById(userId).populate({
// 			path: "cart",
// 			populate: {
// 				path: "cartItems",
// 			},
// 		})

// 		res.status(200).json({
// 			success: true,
// 			message: "Product added to cart successfully",
// 			cart: updatedUser.cart,
// 		})
// 	} catch (error) {
// 		console.error(error)
// 		res.status(500).json({ error: "Internal Server Error", success: false })
// 	}
// }

// export const addToCartController = async (req, res) => {
// 	const { userId } = req.user
// 	const { productId, quantity } = req.body

// 	try {
// 		// Find user and populate cart
// 		let user = await User.findById(userId).populate("cart")

// 		// If user does not have a cart, create a new one
// 		if (!user.cart) {
// 			const cart = new Cart({ user: userId, cartItems: [] })
// 			user.cart = cart._id
// 			await cart.save()
// 			await user.save()
// 		}

// 		// Check for existing cart item for the product
// 		let existingCartItem = user.cart.cartItems.find((item) => item.product && item.product.toString() === productId)

// 		if (existingCartItem) {
// 			// If the product already exists in the cart, update the quantity
// 			existingCartItem.quantity += quantity
// 			await existingCartItem.save()
// 		} else {
// 			// Create a new cart item
// 			const newCartItem = new CartItem({
// 				quantity,
// 				product: productId,
// 			})
// 			await newCartItem.save()
// 			user.cart.cartItems.push(newCartItem)
// 			await user.cart.save()
// 		}

// 		// Populate cartItems before sending the response
// 		user = await User.findById(userId).populate({
// 			path: "cart",
// 			populate: {
// 				path: "cartItems",
// 			},
// 		})

// 		res.status(200).json({
// 			success: true,
// 			message: "Product added to cart successfully",
// 			cart: user.cart,
// 		})
// 	} catch (error) {
// 		console.error(error)
// 		res.status(500).json({ error: "Internal Server Error", success: false })
// 	}
// }
export const addToCartController = async (req, res) => {
	const { userId } = req.user
	const { productId, quantity } = req.body

	try {
		const user = await User.findById(userId)
		if (!user) {
			throw Error("Please login and try again.")
		}
		const userCart = user.cart

		const newCartItem = new CartItem({
			quantity,
			product: productId,
		})
		if (userCart.length === 0) {
			userCart.push(newCartItem)
			user.cart = userCart
			await user.save()
		}
		const existingCartItem = userCart.filter((item) => {
			return item.product.toString() === productId
		})
		if (!existingCartItem) {
			userCart.push(newCartItem)
			user.cart = userCart
			await user.save()
		}

		const updatedItemQuantity = (existingCartItem[0].quantity = quantity)
		userCart.push(updatedItemQuantity)
		user.cart = userCart
		await user.save()

		return res.status(200).json({
			success: true,
			message: "Product added to cart successfully",
			cart: user.cart,
		})
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: error.message, success: false })
	}
}
