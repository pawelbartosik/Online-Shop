const express = require("express");

const authController = require("../controllers/auth-controllers");

const router = express.Router();

router.get("/signup", authController.getSignup);

router.post("/signup", authController.signup);

router.get("/login", authController.getLogin);

router.post("/login", authController.login);

router.get("/logout", authController.logout);

module.exports = router;
