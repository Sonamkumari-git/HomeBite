// backend/controllers/userController.js
const User = require('../models/User');
const cloudinary = require('../config/cloudinary'); 
const bcrypt = require('bcryptjs'); // Password hash karne ke liye zaroori hai

// 1. Get User Profile Data
const getUserProfile = async (req, res) => {
    try {
        // req.user.id middleware se aayega, -password matlab password hide kar do
        const user = await User.findById(req.user.id).select('-password');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error("Get Profile Error:", error);
        res.status(500).json({ message: 'Server error while fetching profile' });
    }
};

// 2. Update User Profile Data
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (user) {
            // Agar request me naya data hai toh update karo, warna purana hi rehne do
            user.fullName = req.body.fullName || user.fullName;
            user.email = req.body.email || user.email;
            user.address = req.body.address || user.address;

            const updatedUser = await user.save();
            
            res.json({
                _id: updatedUser._id,
                fullName: updatedUser.fullName,
                email: updatedUser.email,
                address: updatedUser.address,
                profileImage: updatedUser.profileImage // FIXED: Schema ke mutabik profileImage kiya
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error("Update Profile Error:", error);
        res.status(500).json({ message: 'Server error while updating profile' });
    }
};

// 3. Change Password
const changePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (user) {
            // Frontend se aane wale old aur new password ko check karna
            const { oldPassword, newPassword } = req.body;

            // Database ke password se purana password match karein
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Old password is incorrect' });
            }

            // Naye password ko encrypt (hash) karein
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);

            await user.save();
            res.json({ message: 'Password updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error("Change Password Error:", error);
        res.status(500).json({ message: 'Server error while changing password' });
    }
};

// 4. Upload Profile Picture
const uploadProfilePic = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No image file provided" });
        }

        // Buffer ko Base64 me convert karke Cloudinary par upload karna
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        
        // Yahan 'cloudinary' humare config file se aa raha hai
        const cloudinaryResponse = await cloudinary.uploader.upload(dataURI, {
            folder: "homebite/profiles", 
            resource_type: "auto",
        });

        // MongoDB me user ka profileImage URL update karna
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { profileImage: cloudinaryResponse.secure_url }, // FIXED: profileImage variable map kiya
            { new: true }
        ).select('-password');

        res.status(200).json({ 
            message: "Profile picture updated successfully!", 
            profileImage: updatedUser.profileImage // FIXED: Response me sahi field bheja
        });

    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ message: "Image upload failed", error: error.message });
    }
};

// ==========================================
// SABSE ZAROORI HISA (Export All Functions)
// ==========================================
module.exports = {
    getUserProfile,
    updateUserProfile,
    changePassword,
    uploadProfilePic
};
