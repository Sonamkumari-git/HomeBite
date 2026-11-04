const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
   
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    },
   
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
    timestamps: true 
});

module.exports = mongoose.model('Order', orderSchema);
