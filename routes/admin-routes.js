const express = require("express");

const adminController = require("../controllers/admin-controllers");

const router = express.Router();

router.get("/", adminController.adminProductsPage);

router.get("/products", adminController.adminProductsPage);

module.exports = router;
