const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // Check karte hain ki headers me Authorization hai aur wo 'Bearer' se start hota hai
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 1. Token nikalna
            token = req.headers.authorization.split(' ')[1];

            // 2. Token verify karna
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. User find karna (bina password ke)
            req.user = await User.findById(decoded.id).select('-password');

            // 4. Agar user database me ab nahi hai (maan lo delete ho gaya ho)
            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user no longer exists' });
            }

            // 5. Sab theek hai, aage controller tak bhejo
            return next(); 

        } catch (error) {
            // 🔥 DEBUGGING: Terminal me exact error print karega
            console.error("JWT Verification Error:", error.message);
            
            return res.status(401).json({ 
                message: 'Not authorized, token failed',
                error: error.message // Frontend ko bhi pata chal jayega ki error kya hai
            });
        }
    }

    // Agar request me token bheja hi nahi gaya
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token provided' });
    }
};

// Yahan curly braces {} lagana zaroori tha jo ab laga hua hai
module.exports = { protect };
