const express = require('express');
const router = express.Router();

// Controller se dono functions import kiye
const { placeOrder, getMyOrders } = require('../controllers/orderController');

// Auth middleware import kiya
const { protect } = require('../middlewares/authMiddleware');

// 1. Order place karne ka route
router.post('/place', protect, placeOrder);

// 2. 🔥 YAHAN JODNA HAI: Profile page ke orders ka route
router.get('/my-orders', protect, getMyOrders);

module.exports = router;
