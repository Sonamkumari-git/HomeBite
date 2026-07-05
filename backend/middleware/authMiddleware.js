const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // Check karte hain ki headers me Authorization hai aur wo 'Bearer' se start hota hai
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Token ko extract karna (e.g., "Bearer eyJhbGciOi...")
            token = req.headers.authorization.split(' ')[1];

            // Token ko verify karna secret key ke saath
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Token se user ki ID nikal kar database se user find karna (password hata kar)
            req.user = await User.findById(decoded.id).select('-password');

            // Sab sahi hai, toh next() call karke request ko controller tak bhej do
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    // Agar token mila hi nahi
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
