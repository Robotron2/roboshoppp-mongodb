import JWT from "jsonwebtoken"

export const requireSignIn = async (req, res, next) => {
	try {
		const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
		if (decode.userId) {
			req.user = decode
			next()
		} else {
			return res.status(403).json({ success: false, message: "You're not logged in" })
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		})
		// console.log(error)
	}
}

export const isAdmin = async (req, res, next) => {
	try {
		const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
		if (decode.isAdmin) {
			next()
		} else {
			return res.status(403).json({ success: false, message: "You're not authorized" })
		}
	} catch (error) {
		// console.log(error)
		res.status(401).json({
			success: false,
			message: error.message,
		})
	}
}
