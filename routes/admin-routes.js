const express = require("express");

const adminController = require("../controllers/admin-controllers");
const imageUploadMiddleware = require("../middlewares/image-upload");

const router = express.Router();

router.get("/", adminController.adminProductsPage);

router.get("/products", adminController.adminProductsPage);

router.get("/new", adminController.getNewProduct);

router.post("/new", imageUploadMiddleware, adminController.createNewProduct);

module.exports = router;
