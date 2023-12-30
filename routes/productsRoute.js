import { Router } from "express"
import {
	createProductController,
	deleteProductController,
	getAllProductsController,
	getFeaturedProductCountController,
	getProductCountController,
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

		const destinationFolder = "public/uploads"

		if (!fs.existsSync(destinationFolder)) {
			fs.mkdirSync(destinationFolder, { recursive: true })
		}

		cb(uploadError, "public/uploads")
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
router.post(`/`, upload.single("image"), createProductController)

//update
router.put(`/`, requireSignIn, isAdmin, updateProductController)

//update product images
router.put("/multiple-images/:productId", upload.array("files", 5), uploadMultipleImagesController)

//get all
router.get(`/`, getAllProductsController)

//get single product
router.get(`/`, getSingleProductController)

//get product count
router.get(`/get-count`, requireSignIn, isAdmin, getProductCountController)

//get featured product
router.get(`/get-featured`, getFeaturedProductCountController)

//delete
router.delete(`/:id`, deleteProductController)

export default router
