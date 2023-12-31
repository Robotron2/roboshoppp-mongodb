import { Router } from "express"
import {
	authorizeAdminController,
	authorizeUserController,
	getAllUsersController,
	getSingleUserController,
	loginUserController,
	registerUserController,
} from "../controllers/usersController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"

const router = Router()

//Register - Create
router.post("/register", registerUserController)
//Login
router.post("/login", loginUserController)

//Get Users - Read
router.get("/authorize-user", requireSignIn, authorizeUserController)
router.get("/authorize-admin", requireSignIn, isAdmin, authorizeAdminController)

router.get("/", requireSignIn, isAdmin, getAllUsersController)
router.get("/:id", getSingleUserController)

export default router
