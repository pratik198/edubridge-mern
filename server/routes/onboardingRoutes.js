const express = require("express");
const auth = require("../middleware/authMiddleware");
const {
  saveOnboarding,
  getMyOnboarding,
} = require("../controllers/onboardingController");

const router = express.Router();

// Save / Update onboarding data
router.post("/", auth, saveOnboarding);

// Get logged-in user's onboarding
router.get("/", auth, getMyOnboarding);

module.exports = router;
