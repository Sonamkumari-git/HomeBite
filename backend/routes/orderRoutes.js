const express = require('express');
const router = express.Router();
const { placeOrder, getMyOrders, verifyPayment } = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/place', protect, placeOrder);
router.post('/verify', protect, verifyPayment); // 🔥 NAYA ROUTE
router.get('/my-orders', protect, getMyOrders);

module.exports = router;
