import mongoose from "mongoose"
import { OrderItem } from "../models/orderItem.js"
import { Order } from "../models/ordersModel.js"

export const createOrderController = async (req, res) => {
	const { orderItems } = req.body
	const orderItemIds = Promise.all(
		orderItems.map(async (orderItem) => {
			let newOrderItem = new OrderItem({
				quantity: orderItem.quantity,
				product: orderItem.product,
			})
			newOrderItem = await newOrderItem.save()
			return newOrderItem._id
		})
	)
	const orderItemsIdsResolved = await orderItemIds

	let order = new Order({
		orderItems: orderItemsIdsResolved,
		shippingAddress1: req.body.shippingAddress1,
		shippingAddress2: req.body.shippingAddress2,
		city: req.body.city,
		zip: req.body.zip,
		country: req.body.country,
		phone: req.body.phone,
		status: req.body.status,
		user: req.body.user,
	})
	order = await order.save()

	if (!order)
		return res.status(400).json({
			success: false,
			message: "Order could not be created.",
		})

	res.status(200).json({ success: true, order })
}

export const getAllOrdersController = async (req, res) => {
	// fetch all order including the users doc (name field only) newest to oldest
	try {
		const orderList = await Order.find({}).populate("user", "name").sort({ dateOrdered: -1 })
		if (!orderList) {
			return res.status(500).json({ success: false, message: "Cannot get orders" })
		}
		res.status(200).json({ success: true, orderList })
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message })
	}
}

export const getSingleOrderController = async (req, res) => {
	const { id } = req.params
	try {
		if (!id || !mongoose.isValidObjectId(id)) {
			throw Error("Enter a valid id")
		}

		const order = await Order.findById(id)
			.populate("user", "name")
			.populate({
				path: "orderItems",
				populate: { path: "product", populate: "category" },
			})
		if (!order) {
			return res.status(500).json({ success: false, message: "Cannot get order" })
		}
		return res.status(200).json({ success: true, order })
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message })
	}
}

export const updateOrderController = async (req, res) => {
	const { id } = req.params
	const { status } = req.body
	try {
		if (!id || !mongoose.isValidObjectId(id)) {
			throw Error("Enter a valid id")
		}

		const order = await Order.findByIdAndUpdate(
			id,
			{
				status,
			},
			{ new: true }
		)
		if (!order) {
			return res.status(500).json({ success: false, message: "Cannot get order" })
		}
		return res.status(200).json({ success: true, order })
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message })
	}
}

export const deleteOrderController = async (req, res) => {
	const { id } = req.params

	try {
		if (!id || !mongoose.isValidObjectId(id)) {
			throw Error("Enter a valid id")
		}

		const order = await Order.findById(id)
		if (!order) {
			return res.status(500).json({ success: false, message: "Cannot get order" })
		}
		const deletedOrderItem = order.orderItems.map(async (orderItemId) => {
			await OrderItem.findByIdAndDelete(orderItemId)
			return true
		})

		if (!deletedOrderItem) {
			return res.status(500).json({ success: false, message: "Error deleting product" })
		}
		// return res.status(200).json({ success: true, order })
		await Order.findByIdAndDelete(id)
		return res.status(200).json({ success: true, message: "Order canceled" })
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message })
	}
}

// {
//     "orderItems" : [
//         {
//             "quantity": 3,
//             "product" : "5fcfc406ae79b0a6a90d2585"
//         },
//         {
//             "quantity": 2,
//             "product" : "5fd293c7d3abe7295b1403c4"
//         }
//     ],
//     "shippingAddress1" : "Flowers Street , 45",
//     "shippingAddress2" : "1-B",
//     "city": "Prague",
//     "zip": "00000",
//     "country": "Czech Republic",
//     "phone": "+420702241333",
//     "user": "5fd51bc7e39ba856244a3b44"
// }
