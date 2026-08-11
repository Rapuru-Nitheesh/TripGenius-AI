const express = require("express");

const router = express.Router();

const {
    searchDestination
} = require("../controllers/exploreController");

router.get("/", searchDestination);

module.exports = router;