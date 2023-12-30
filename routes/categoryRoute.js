import { Router } from "express"
import {
	createCategoryController,
	deleteCategoryController,
	getAllCategoriesController,
	updateCategoryController,
} from "../controllers/categoriesController.js"

const router = Router()

//Routes CRUD

//create
router.post(`/`, createCategoryController)

//update
router.put(`/`, updateCategoryController)

//get all
router.get(`/`, getAllCategoriesController)

//delete
router.delete(`/:id`, deleteCategoryController)

export default router
