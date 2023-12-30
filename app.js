import dotenv from "dotenv"
dotenv.config()

import express from "express"
import morgan from "morgan"
import cors from "cors"
import connectDB from "./config/db.js"

const app = express()

app.use(express.json())
app.use(morgan("dev"))

app.use(cors())
app.options("*", cors())

connectDB()

app.get("/", (req, res) => {
	res.status(200).json({
		success: true,
		message: "server working properly",
	})
})

const api = process.env.API_URL
import userRoute from "./routes/userRoute.js"
import productsRoute from "./routes/productsRoute.js"
import categoriesRoute from "./routes/categoryRoute.js"
import ordersRoute from "./routes/ordersRoute.js"

app.use(`${api}/user`, userRoute)
app.use(`${api}/products`, productsRoute)
app.use(`${api}/categories`, categoriesRoute)
app.use(`${api}/orders`, ordersRoute)

const port = process.env.PORT || 4000
app.listen(port, () => {
	console.log(`Roboshoppp server is running on port ${port}`)
})
