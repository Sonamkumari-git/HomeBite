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
    phoneNumber: { // 🔥 YEH NAYA FIELD HAI
        type: String,
        required: [true, 'Please add a phone number']
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
        // Default blank ya default image url rakh sakte ho
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('User', userSchema);
