const express = require('express');
const router = express.Router();
const multer = require('multer');

// Middleware import karein (Aapka JWT auth middleware)
const { protect } = require('../middleware/authMiddleware'); 

// Controller se saare functions import karein
const { 
    getUserProfile, 
    updateUserProfile, 
    changePassword,
    uploadProfilePic
} = require('../controllers/userController');

// --- Multer Configuration ---
// Memory storage use kar rahe hain taaki image direct buffer ke through Cloudinary pe chali jaye, disk pe save na ho.
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// --- Routes ---

// 1. Get User Profile Data
// @route GET /api/users/profile
router.get('/profile', protect, getUserProfile);

// 2. Update User Profile (First Name, Last Name, Phone, etc.)
// @route PUT /api/users/profile
router.put('/profile', protect, updateUserProfile);

// 3. Change Password
// @route PUT /api/users/change-password
router.put('/change-password', protect, changePassword);

// 4. Upload Profile Picture to Cloudinary
// @route PUT /api/users/profile-pic
// Note: 'profilePic' wahi name hai jo frontend me FormData me append kiya gaya hai
router.put('/profile-pic', protect, upload.single('profilePic'), uploadProfilePic);

module.exports = router;
