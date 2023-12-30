import { Schema, model } from "mongoose"

const cartSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: "User", required: true },
	items: [{ type: Schema.Types.ObjectId, ref: "CartItem" }],
})

cartSchema.virtual("id").get(function () {
	return this._id.toHexString()
})
cartSchema.set("toJSON", {
	virtuals: true,
})

const Cart = model("Cart", cartSchema)
