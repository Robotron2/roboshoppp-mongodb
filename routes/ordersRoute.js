import { Router } from "express"
import {
	createOrderController,
	deleteOrderController,
	getAllOrdersController,
	getSingleOrderController,
	updateOrderController,
} from "../controllers/ordersController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"

const router = Router()

// Create Order
router.post("/", requireSignIn, createOrderController)

// Fetch all orders
router.get("/", requireSignIn, isAdmin, getAllOrdersController)

//Fetch single order
router.get("/:id", requireSignIn, getSingleOrderController)

//Fetch single order
router.put("/:id", requireSignIn, isAdmin, updateOrderController)

//Delete Order
router.delete("/:id", requireSignIn, isAdmin, deleteOrderController)

export default router
