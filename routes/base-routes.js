const express = require("express");

const baseController = require("../controllers/base-controllers");

const router = express.Router();

router.get("/", baseController.mainPage);

router.get("/401", baseController.render401);

router.get("/403", baseController.render403);

module.exports = router;
