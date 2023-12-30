import { Schema, model } from "mongoose"

const orderItemSchema = Schema({
	quantity: {
		type: Number,
		required: true,
	},
	product: {
		type: Schema.Types.ObjectId,
		ref: "Product",
	},
})

orderItemSchema.virtual("id").get(function () {
	return this._id.toHexString()
})
orderItemSchema.set("toJSON", {
	virtuals: true,
})

export const OrderItem = model("OrderItem", orderItemSchema)
