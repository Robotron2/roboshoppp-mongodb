import { Router } from "express"
import {
	createProductController,
	deleteProductController,
	getAllProductsController,
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

//delete
router.delete(`/:id`, deleteProductController)

export default router
