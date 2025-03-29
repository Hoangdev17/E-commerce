const express = require("express");
const router = express.Router();
const authenticate = require('../middleware/authMiddleware.js');
const cartController = require("../controllers/cartController");

router.post("/add",authenticate, cartController.addToCart);
router.put("/update",authenticate, cartController.updateQuantity);
router.delete('/remove/:productId',authenticate, cartController.removeFromCart);
router.get("/:userId",authenticate, cartController.getCart);
router.get("/",authenticate, cartController.getAllCart);
router.get("/:userId/total",authenticate, cartController.getCartTotal);
router.post("/checkout", authenticate, cartController.checkOut);
router.post("/cod", authenticate, cartController.checkOutByCOD);

module.exports = router;
