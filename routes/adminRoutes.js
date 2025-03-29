const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controllers/adminController");
const authenticate = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/dashboard", authenticate, roleMiddleware, getDashboardStats);

module.exports = router;
