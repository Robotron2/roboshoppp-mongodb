import { Router } from "express"
import { requireSignIn } from "../middlewares/authMiddleware.js"
import { addToCartController, getCartInfoController, removeItemFromCartController } from "../controllers/cartsController.js"

const router = Router()

router.get("/cart-info", requireSignIn, getCartInfoController)

router.post("/add", requireSignIn, addToCartController)

router.delete("/remove/:id", requireSignIn, removeItemFromCartController)

export default router
