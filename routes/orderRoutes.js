const { createOrder, getOrderById, getAllOrders, updateOrderStatus, getOrders } = require( '../controllers/orderController.js');
const  authenticate  = require( '../middleware/authMiddleware.js');
const express = require( 'express');
const roleMiddleware = require('../middleware/roleMiddleware.js')

const router = express.Router();

// Tạo đơn hàng (POST)
router.post('/', authenticate, createOrder);

// Lấy thông tin đơn hàng theo ID (GET)
router.get('/:orderId', authenticate, getOrderById);

router.get('/', authenticate, roleMiddleware, getAllOrders);
router.put('/:id/status', authenticate, roleMiddleware, updateOrderStatus);

router.get('/user/orders', authenticate, getOrders);

module.exports = router;
