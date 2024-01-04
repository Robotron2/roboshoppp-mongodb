import { Schema, model } from "mongoose"

export const cartItemSchema = new Schema({
	quantity: {
		type: Number,
		required: true,
	},
	product: {
		type: Schema.Types.ObjectId,
		ref: "Product",
		required: true,
	},
})

cartItemSchema.virtual("id").get(function () {
	return this._id.toHexString()
})

cartItemSchema.set("toJSON", {
	virtuals: true,
})

export const CartItem = model("CartItem", cartItemSchema)
