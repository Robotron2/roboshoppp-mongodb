import { Router } from "express"
import { createCategoryController, getAllCategoriesController } from "../controllers/categoriesController.js"

const router = Router()

//Routes CRUD

//create
router.post(`/`, createCategoryController)

//update

//get all
router.get(`/`, getAllCategoriesController)

//single

//delete

export default router
