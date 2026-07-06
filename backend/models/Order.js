const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    // 🔥 YEH LINE ADD KARNI HAI (Agar pehle se nahi hai)
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Ye batata hai ki ye ID User collection se judi hai
    },
    // Baaki ki fields jo aapke paas pehle se hongi
    orderId: { type: String, required: true },
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    address: { type: String, required: true },
    items: { type: Array, required: true },
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, default: 'pending' },
    transactionId: { type: String, default: null },
    status: { type: String, default: 'new' }
}, {
    timestamps: true // Ye createdAt aur updatedAt khud bana dega
});

module.exports = mongoose.model('Order', orderSchema);
