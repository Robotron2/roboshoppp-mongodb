import { User } from "../models/usersModel.js"
import { CartItem } from "../models/cartItemModel.js"

export const addToCartController = async (req, res) => {
	const { userId } = req.user
	const { productId, quantity } = req.body

	try {
		const user = await User.findById(userId)
		if (!user) {
			throw Error("Please login and try again.")
		}
		let userCart = user.cart

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

		const nonExistingCartItem = userCart.filter((item) => {
			return item.product.toString() !== productId
		})

		if (existingCartItem.length === 0) {
			userCart.push(newCartItem)
			user.cart = userCart
			await user.save()
		} else {
			const updatedItemQuantity = (existingCartItem[0].quantity = quantity)
			const updatedCartItem = new CartItem({ quantity: updatedItemQuantity, product: productId })
			userCart = [...nonExistingCartItem, updatedCartItem]
			user.cart = userCart
			await user.save()
		}

		// const userCartContents = await User.findById(userId).populate({ path: "cart", populate: "product" })
		// const userCartContents = await User.findById(userId)
		// 	.populate({
		// 		path: "cart",
		// 		populate: {
		// 			path: "cartItems",
		// 			populate: {
		// 				path: "product",
		// 				select: "name description price",
		// 			},
		// 		},
		// 	})
		// 	.select("id")

		return res.status(200).json({
			success: true,
			message: "Product added to cart successfully",
			cart: user.cart,
			cartLength: user.cart.length,
			userCartContents,
		})
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: error.message, success: false })
	}
}
