const express = require("express");

const authController = require("../controllers/auth-controllers");

const router = express.Router();

router.get("/signup", authController.getSignup);

module.exports = router;
