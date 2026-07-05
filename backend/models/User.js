const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    address: {
        type: String,
        required: [true, 'Please add your hostel/room address']
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    profileImage: { 
        type: String, 
        // Default mein wahi image daal di hai jo HTML mein thi
        // Taaki jab naya account bane, toh default blank na dikhe
        default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    }
}, {
    timestamps: true // Kab account bana, uska time save karega
});

module.exports = mongoose.model('User', userSchema);
