import { Router } from "express"
import {
	createProductController,
	deleteProductController,
	getAllProductsController,
	getFeaturedProductCountController,
	getProductCountController,
	getSingleProductController,
	updateProductController,
} from "../controllers/productsController.js"

const router = Router()

//Routes CRUD

//create
router.post(`/`, createProductController)

//update
router.put(`/`, updateProductController)

//get all
router.get(`/`, getAllProductsController)

//get single product
router.get(`/`, getSingleProductController)

//get product count
router.get(`/get-count`, getProductCountController)

//get featured product
router.get(`/get-featured`, getFeaturedProductCountController)

//delete
router.delete(`/:id`, deleteProductController)

export default router
