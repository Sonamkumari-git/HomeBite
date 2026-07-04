const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Token Generate Karne ka function
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token 30 din tak valid rahega
    });
};

// @desc    Register new user (Sign Up)
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
    try {
        const { fullName, email, address, password } = req.body;

        // Check agar user pehle se hai
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Password Hash (Encrypt) karna
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Naya User create karna
        const user = await User.create({
            fullName,
            email,
            address,
            password: hashedPassword
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                fullName: user.fullName,
                email: user.email,
                address: user.address,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Authenticate a user (Login)
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Email se user dhoondo
        const user = await User.findOne({ email });

        // Agar user mila aur password match hua
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                fullName: user.fullName,
                email: user.email,
                address: user.address,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser
};