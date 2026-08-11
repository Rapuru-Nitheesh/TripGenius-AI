const express = require("express");

const router = express.Router();

const {
  getProfile,
  updateProfile,
  changePassword,
} = require("../controllers/profileController");

// Get Profile
router.get("/:id", getProfile);

// Update Profile
router.put("/:id", updateProfile);

// Change Password
router.put("/password/:id", changePassword);

module.exports = router;