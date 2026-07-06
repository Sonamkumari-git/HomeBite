// backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { placeOrder, getUserOrders } = require('../controllers/orderController');

// Route to place a new order
router.post('/place', placeOrder);

// Route to fetch orders for a specific user via phone number
router.get('/my-orders/:phone', getUserOrders);

module.exports = router;
