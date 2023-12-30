import { Router } from "express"
import {
	createOrderController,
	deleteOrderController,
	getAllOrdersController,
	getOrdersCountController,
	getSingleOrderController,
	getSingleUserOrderController,
	getTotalSalesController,
	updateOrderController,
} from "../controllers/ordersController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"

const router = Router()

// Create Order
router.post("/", requireSignIn, createOrderController)

// Fetch all orders
router.get("/", requireSignIn, isAdmin, getAllOrdersController)

//Fetch total sales
router.get("/get-sales", requireSignIn, isAdmin, getTotalSalesController)

//Fetch total sales
router.get("/get-count", requireSignIn, isAdmin, getOrdersCountController)

//Fetch specific user order
router.get("/user/:id", requireSignIn, isAdmin, getSingleUserOrderController)

//Fetch single order
router.get("/:id", requireSignIn, getSingleOrderController)

//Update order
router.put("/:id", requireSignIn, isAdmin, updateOrderController)

//Delete Order
router.delete("/:id", requireSignIn, isAdmin, deleteOrderController)

export default router
