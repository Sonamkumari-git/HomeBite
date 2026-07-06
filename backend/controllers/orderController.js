const Order = require('../models/Order');

const placeOrder = async (req, res) => {
    try {
        const { customerName, customerPhone, address, items, totalAmount, paymentMethod } = req.body;
        const orderId = '#HB-' + Math.floor(100000 + Math.random() * 900000);

        const newOrder = new Order({
            user: req.user._id, // 🔥 YAHAN DIKKAT THI: Ye line add karni hai (Logged-in user ki ID save karne ke liye)
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

module.exports = { placeOrder };
