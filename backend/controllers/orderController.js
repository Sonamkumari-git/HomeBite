const Order = require('../models/Order');

// Function 1: Naya Order Place karne ke liye
const placeOrder = async (req, res) => {
    try {
        const { customerName, customerPhone, address, items, totalAmount, paymentMethod } = req.body;
        const orderId = '#HB-' + Math.floor(100000 + Math.random() * 900000);

        const newOrder = new Order({
            user: req.user._id, // 🔥 Auth Middleware se user ID mil gayi
            orderId,
            customerName,
            customerPhone,
            address,
            items,
            totalAmount,
            paymentMethod,
            paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
            status: 'new'
        });

        const savedOrder = await newOrder.save();
        res.status(201).json({ success: true, message: "Order Placed Successfully!", order: savedOrder });

    } catch (error) {
        console.error("Order Place Error:", error);
        res.status(500).json({ success: false, message: "Server error placing order" });
    }
};

// 🔥 Function 2: NEW! Logged-in user ke saare orders frontend (profile page) par dikhane ke liye
const getMyOrders = async (req, res) => {
    try {
        // req.user._id se database me sirf is user ke orders filter karenge
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        console.error("Fetch Orders Error:", error);
        res.status(500).json({ success: false, message: "Server error fetching orders" });
    }
};

// Dono functions ko export kar diya
module.exports = { placeOrder, getMyOrders };
