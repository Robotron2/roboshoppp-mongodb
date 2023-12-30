import { User } from "../models/usersModel.js"
import bcrypt from "bcrypt"
import _ from "lodash"
import mongoose from "mongoose"
import JWT from "jsonwebtoken"

export const registerUserController = async (req, res) => {
	const { name, email, password, phone, isAdmin, street, apartment, zip, city, country } = req.body
	const saltRounds = 10
	try {
		if (!name || !email || !password || !phone || !street || !apartment || !zip || !city || !country) {
			throw Error("All fields must be filled")
		}

		const existingUser = await User.findOne({ email })
		if (existingUser) {
			return res.status(400).json({ success: false, message: "User already registered. Please login" })
		}

		const passwordHash = bcrypt.hashSync(password, saltRounds)
		let user = new User({
			name: _.toLower(name),
			email: _.toLower(email),
			passwordHash,
			phone,
			isAdmin,
			street: _.toLower(street),
			apartment: _.toLower(apartment),
			zip,
			city: _.toLower(city),
			country: _.toLower(country),
		})
		user = await user.save()
		if (!user) {
			return res.status(400).json({ success: false, message: "The user cannot be created!" })
		}
		return res.status(200).json({ success: true, message: "User registered successfully." })
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}

	res.send(user)
}

export const getSingleUserController = async (req, res) => {
	const { id } = req.params
	try {
		if (!id) {
			throw Error("Provide a user id")
		}
		if (!mongoose.isValidObjectId(id)) {
			throw Error("Provide a valid user id")
		}
		const user = await User.findById(id).select("-passwordHash")
		if (!user) {
			return res.status(400).json({ success: false, message: "Cannot fetch user" })
		}
		return res.status(200).json({ success: true, user })
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}

export const getAllUsersController = async (req, res) => {
	try {
		const allUsers = await User.find({}).select("name email phone")
		if (!allUsers) {
			return res.status(400).json({ success: false, message: "Cannot fetch users" })
		}
		return res.status(200).json({ success: true, allUsers })
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}

export const loginUserController = async (req, res) => {
	const { email, password } = req.body

	try {
		if (!email || !password) {
			throw Error("All fields must be filled")
		}
		const user = await User.findOne({ email })
		if (!user) {
			return res.status(400).json({
				success: false,
				message: "User not found",
			})
		}
		const passwordHash = user.passwordHash
		const secret = process.env.JWT_SECRET

		if (bcrypt.compareSync(password, passwordHash)) {
			const token = JWT.sign({ userId: user.id, isAdmin: user.isAdmin }, secret, { expiresIn: "1d" })
			return res.status(200).json({
				success: true,
				token,
				user: { email: user.email, id: user.id, isAdmin: user.isAdmin },
			})
		}
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}
