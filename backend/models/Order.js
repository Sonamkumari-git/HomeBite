const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true }, // #HB-4095
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    address: { type: String, required: true },
    items: { type: Array, required: true }, // Cart items
    totalAmount: { type: Number, required: true },
    
    // --- PAYMENT DETAILS (Cashfree Ready) ---
    paymentMethod: { type: String, required: true }, // 'cod' ya 'online'
    paymentStatus: { type: String, default: 'pending' }, // 'pending', 'paid', 'failed', 'refunded'
    transactionId: { type: String, default: null }, // Cashfree se jo ID milegi
    
    // --- ORDER TRACKING ---
    // Status flow: new -> accepted -> preparing -> out_for_delivery -> delivered
    status: { type: String, default: 'new' }, 
    
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
