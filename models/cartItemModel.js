import { Schema, model } from "mongoose"

const cartItemSchema = new Schema({
	product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
	quantity: { type: Number, required: true },
})

cartItemSchema.virtual("id").get(function () {
	return this._id.toHexString()
})
cartItemSchema.set("toJSON", {
	virtuals: true,
})

const CartItem = model("CartItem", cartItemSchema)
