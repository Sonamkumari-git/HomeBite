const express = require('express');
const router = express.Router();
const { placeOrder, getMyOrders, verifyPayment } = require('../controllers/orderController');

// 🔥 YAHAN CHANGE KIYA HAI: 'middlewares' ki jagah 'middleware' (bina 's' ke) kar diya hai
const { protect } = require('../middleware/authMiddleware'); 

router.post('/place', protect, placeOrder);
router.post('/verify', protect, verifyPayment); 
router.get('/my-orders', protect, getMyOrders);

module.exports = router;
