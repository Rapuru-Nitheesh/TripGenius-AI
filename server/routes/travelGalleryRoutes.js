const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");

const {
  getGallery,
  addImage,
  deleteImage,
} = require("../controllers/travelGalleryController");

// Get Gallery
router.get("/:userId", getGallery);

// Upload Image
router.post(
  "/",
  upload.single("image"),
  addImage
);

// Delete Image
router.delete("/:id", deleteImage);

module.exports = router;