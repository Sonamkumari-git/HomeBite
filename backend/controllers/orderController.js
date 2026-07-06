// backend/controllers/orderController.js
const Order = require('../models/orderModel'); // Aapka Order Model

// 1. Place New Order
const placeOrder = async (req, res) => {
    try {
        const { customerName, customerPhone, address, items, totalAmount, paymentMethod } = req.body;

        // Validation
        if (!customerName || !customerPhone || !address || !items || items.length === 0) {
            return res.status(400).json({ success: false, message: "All fields and items are required!" });
        }

        // Generate a Unique Order ID (e.g., #HB-45928)
        const orderId = '#HB-' + Math.floor(10000 + Math.random() * 90000);

        // Naya order create karna
        const newOrder = new Order({
            orderId,
            customerName,
            customerPhone,
            address,
            items,
            totalAmount,
            paymentMethod,
            paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid', // Cashfree aane pe isko change karenge
            status: 'new'
        });

        const savedOrder = await newOrder.save();

        res.status(201).json({ 
            success: true, 
            message: "Order Placed Successfully!", 
            order: savedOrder 
        });

    } catch (error) {
        console.error("Order Place Error:", error);
        res.status(500).json({ success: false, message: "Server error while placing order." });
    }
};

// 2. Get User Orders (Profile Page ke liye)
const getUserOrders = async (req, res) => {
    try {
        // Phone number ke basis pe orders laana
        const userOrders = await Order.find({ customerPhone: req.params.phone }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: userOrders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    placeOrder,
    getUserOrders
};
