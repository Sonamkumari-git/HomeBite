const express = require('express');
const router = express.Router();
const multer = require('multer');

// Controller import karo
const { registerUser, loginUser } = require('../controllers/authController');

// Multer Setup (Memory Storage for Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 🔥 YAHAN upload.single('profileImage') LAGANA ZAROORI HAI
// Yeh multer middleware req.body aur req.file ko populate kar dega
router.post('/register', upload.single('profileImage'), registerUser);

// Login route
router.post('/login', loginUser);

module.exports = router;
