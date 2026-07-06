const express = require('express');
const router = express.Router();
const { placeOrder } = require('../controllers/orderController');

// Ye API frontend call karega
router.post('/place', placeOrder);

module.exports = router;
