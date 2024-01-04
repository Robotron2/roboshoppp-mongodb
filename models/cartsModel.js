import { Schema, model } from "mongoose"

const cartSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		unique: true,
	},
	cartItems: [
		{
			type: Schema.Types.ObjectId,
			ref: "CartItem",
		},
	],
})

cartSchema.virtual("id").get(function () {
	return this._id.toHexString()
})

cartSchema.set("toJSON", {
	virtuals: true,
})

export const Cart = model("Cart", cartSchema)
