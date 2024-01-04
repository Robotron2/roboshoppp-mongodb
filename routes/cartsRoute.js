import { Router } from "express"
import { requireSignIn } from "../middlewares/authMiddleware.js"
import { addToCartController } from "../controllers/cartsController.js"

const router = Router()

router.post("/add", requireSignIn, addToCartController)

export default router
