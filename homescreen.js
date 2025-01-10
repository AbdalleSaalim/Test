const express = require("express");
const { getCategories, getPopularItems } = require("../controllers/controllers");

const router = express.Router();

// API Routes
router.get("/categories", getCategories);
router.get("/popular-items", getPopularItems);

module.exports = router;
