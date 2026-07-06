const Order = require('../models/Order'); // Apne order model ka sahi path/naam check kar lena

const placeOrder = async (req, res) => {
    try {
        // Frontend se jo data aa raha hai
        const { customerName, customerPhone, address, items, totalAmount, paymentMethod } = req.body;

        // Unique Order ID generate karna
        const orderId = '#HB-' + Math.floor(100000 + Math.random() * 900000);

        const newOrder = new Order({
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
