const express = require("express");

const cartController = require("../controllers/cart-controllers");

const router = express.Router();

router.get("/", cartController.getCartPage);

router.post("/items", cartController.addCartItem);

router.patch("/increase", cartController.increaseCartItem);

router.patch("/decrease", cartController.decreaseCartItem);

router.patch("/remove", cartController.removeCartItem);

module.exports = router;
