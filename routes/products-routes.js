const express = require("express");

const productsController = require("../controllers/products-controllers");

const router = express.Router();

router.get("/products", productsController.allProductsPage);

module.exports = router;
