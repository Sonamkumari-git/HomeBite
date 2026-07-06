const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('../config/cloudinary'); 
const streamifier = require('streamifier');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// ==========================================
// REGISTER USER CONTROLLER
// ==========================================
const registerUser = async (req, res) => {
    try {
        // 🔥 AB REQ.BODY UNDEFINED NAHI AAYEGA!
        // HTML form se jo naam bheje the, wahi use kar rahe hain
        const { fullName, email, phone, address, password } = req.body;

        // Validation
        if (!fullName || !email || !password || !address || !phone) {
            return res.status(400).json({ message: 'Please add all required fields' });
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let profileImageUrl = "";

        // 🔥 AGAR USER NE PROFILE PICTURE BHI UPLOAD KI HAI TOH CLOUDINARY PE BHEJO
        if (req.file) {
            let streamUpload = (req) => {
                return new Promise((resolve, reject) => {
                    let stream = cloudinary.uploader.upload_stream(
                        { folder: "homebite/profiles", resource_type: "auto" },
                        (error, result) => {
                            if (result) resolve(result);
                            else reject(error);
                        }
                    );
                    streamifier.createReadStream(req.file.buffer).pipe(stream);
                });
            };
            const cloudinaryResult = await streamUpload(req);
            profileImageUrl = cloudinaryResult.secure_url;
        }

        // 🔥 CREATE USER IN DATABASE
        const user = await User.create({
            fullName: fullName,
            email: email,
            phoneNumber: phone, // HTML se 'phone' aaya, DB me 'phoneNumber' save hoga
            address: address,
            password: hashedPassword,
            profileImage: profileImageUrl // Cloudinary image link
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                fullName: user.fullName,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }

    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

// ==========================================
// LOGIN USER CONTROLLER (Waise hi rahega)
// ==========================================
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                fullName: user.fullName,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

module.exports = {
    registerUser,
    loginUser
};
