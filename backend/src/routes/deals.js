const express = require("express");

const verifyToken = require("../middleware/authMiddleware");

const {
    getDeals,
    createDeal
} = require("../controllers/dealsController");

const router = express.Router();

router.get("/", verifyToken, getDeals);

router.post("/", verifyToken, createDeal);

module.exports = router;