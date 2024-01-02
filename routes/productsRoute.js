import { Router } from "express"
import {
	createProductController,
	deleteProductController,
	getAllProductsController,
	getFeaturedProductCountController,
	getProductCountController,
	getProductsByCategoryController,
	getSingleProductController,
	updateProductController,
	uploadMultipleImagesController,
} from "../controllers/productsController.js"
import multer from "multer"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"
import fs from "fs"

const router = Router()

const FILE_TYPE_MAP = {
	"image/png": "png",
	"image/jpeg": "jpeg",
	"image/jpg": "jpg",
}

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const isValid = FILE_TYPE_MAP[file.mimetype]
		let uploadError = new Error("invalid image type")

		if (isValid) {
			uploadError = null
		}

		const destinationFolder = "public/upload"

		if (!fs.existsSync(destinationFolder)) {
			fs.mkdirSync(destinationFolder, { recursive: true })
		}

		cb(uploadError, "public/upload")
	},
	filename: function (req, file, cb) {
		const fileName = file.originalname.split(" ").join("-")
		const extension = FILE_TYPE_MAP[file.mimetype]
		cb(null, `${fileName}-${Date.now()}.${extension}`)
	},
})

const upload = multer({ storage: storage })

//Routes CRUD

//create
router.post(`/`, requireSignIn, isAdmin, upload.single("image"), createProductController)

//update
router.put(`/`, requireSignIn, isAdmin, upload.single("image"), updateProductController)

//update product images
router.put("/multiple-images/:productId", requireSignIn, isAdmin, upload.array("files", 5), uploadMultipleImagesController)

//get all
router.get(`/`, getAllProductsController)

//get single product
router.get(`/product`, getSingleProductController)

//get product count
router.get(`/get-count`, requireSignIn, isAdmin, getProductCountController)

//get featured product
router.get(`/get-featured`, getFeaturedProductCountController)

//get products in a particular category
router.get(`/category`, getProductsByCategoryController)

//delete
router.delete(`/:id`, requireSignIn, isAdmin, deleteProductController)

export default router
