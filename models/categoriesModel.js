import { Schema, model } from "mongoose"

const categorySchema = Schema({
	name: {
		type: String,
		required: true,
	},
	icon: {
		type: String,
	},
	color: {
		type: String,
		default: "#00000",
	},
})

export const Category = model("Category", categorySchema)
