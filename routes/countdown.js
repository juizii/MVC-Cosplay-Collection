const express = require("express");
const router = express.Router();
const countdownController = require("../controllers/countdown");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now


// GET route to retrieve the countdown information
router.get("/countdown", ensureAuth, countdownController.getCountdown);

// POST route to set the countdown date
router.post("/countdown", ensureAuth, countdownController.setCountdown);

router.delete("/profile/countdown", ensureAuth, countdownController.resetCountdown);

module.exports = router;
