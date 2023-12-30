require("dotenv").config()

const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const { connectDB } = require("./config/db")
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
const userRoute = require("./routes/userRoute")
const productsRoute = require("./routes/productsRoute")
const categoriesRoute = require("./routes/categoriesRoute")
const ordersRoute = require("./routes/ordersRoute")

app.use(`${api}/user`, userRoute)
app.use(`${api}/products`, productsRoute)
app.use(`${api}/categories`, categoriesRoute)
app.use(`${api}/orders`, ordersRoute)

const port = process.env.PORT || 4000
app.listen(port, () => {
	console.log(`Roboshoppp server is running on port ${port}`)
})
