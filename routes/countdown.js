const express = require("express");
const router = express.Router();
const countdownController = require("../controllers/countdown");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now


router.get("/countdown", ensureAuth, countdownController.getCountdown);
router.post("/countdown", ensureAuth, countdownController.setCountdown);


module.exports = router;
