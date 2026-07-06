const Order = require('../models/Order');
const Cashfree = require('../config/cashfree');

// 1. Order Place & Initiate Payment
const placeOrder = async (req, res) => {
    try {
        const { customerName, customerPhone, address, items, totalAmount, paymentMethod } = req.body;
        
        // Cashfree mein '#' allow nahi hota, isliye order ID format thoda change kiya hai (HB_ lagaya hai)
        const orderId = 'HB_' + Date.now() + Math.floor(Math.random() * 1000);

        // Pehle database me order save karo (Pending status ke sath)
        const newOrder = new Order({
            user: req.user._id, 
            orderId,
            customerName,
            customerPhone,
            address,
            items,
            totalAmount,
            paymentMethod,
            paymentStatus: 'pending',
            status: 'new'
        });
        await newOrder.save();

        // Agar COD hai, to seedha success bhej do
        if (paymentMethod === 'cod') {
            return res.status(201).json({ success: true, message: "Order Placed Successfully!", order: newOrder });
        }

        // Agar ONLINE payment hai, to Cashfree ka session create karo
        const request = {
            order_amount: totalAmount,
            order_currency: "INR",
            order_id: orderId,
            customer_details: {
                customer_id: req.user._id.toString(),
                customer_phone: customerPhone || "9999999999",
                customer_name: customerName || "Customer",
                customer_email: req.user.email || "test@homebite.com" // Email optional par best practice hai
            },
            order_meta: {
                // Ye return_url zaroori hota hai SDK ke liye
                return_url: "https://homebite-aecl.onrender.com/cart?order_id={order_id}"
            }
        };

        // Cashfree API call
        const response = await Cashfree.PGCreateOrder("2023-08-01", request);
        
        // Frontend ko payment session id bhej do
        res.status(200).json({ 
            success: true, 
            payment_session_id: response.data.payment_session_id, 
            order_id: orderId 
        });

    } catch (error) {
        console.error("Order Place Error:", error.response?.data || error.message);
        res.status(500).json({ success: false, message: "Server error initiating payment" });
    }
};

// 2. NAYA FUNCTION: Payment Verify aur Transaction ID Save karne ke liye
const verifyPayment = async (req, res) => {
    try {
        const { order_id } = req.body;
        
        // Cashfree se order ka real status check karo
        const response = await Cashfree.PGFetchOrder("2023-08-01", order_id);

        if (response.data.order_status === "PAID") {
            // Database me order ko 'paid' karo aur transaction id save karo
            const updatedOrder = await Order.findOneAndUpdate(
                { orderId: order_id },
                { 
                    paymentStatus: 'paid',
                    transactionId: response.data.cf_order_id // 🔥 CASHFREE TRANSACTION ID SAVE HO GAYI
                },
                { new: true }
            );
            res.status(200).json({ success: true, message: "Payment Successful", order: updatedOrder });
        } else {
            res.status(400).json({ success: false, message: "Payment not completed" });
        }
    } catch (error) {
        console.error("Verification Error:", error);
        res.status(500).json({ success: false, message: "Payment verification failed" });
    }
};

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error fetching orders" });
    }
};

module.exports = { placeOrder, verifyPayment, getMyOrders };
