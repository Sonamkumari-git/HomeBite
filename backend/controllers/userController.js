// backend/controllers/userController.js
const User = require('../models/User');
const cloudinary = require('../config/cloudinary'); 
const bcrypt = require('bcryptjs'); 

// 1. Get User Profile Data
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (user) {
            return res.json(user);
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error("Get Profile Error:", error);
        return res.status(500).json({ message: 'Server error while fetching profile' });
    }
};

// 2. Update User Profile Data
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (user) {
            user.fullName = req.body.fullName || user.fullName;
            user.email = req.body.email || user.email;
            user.address = req.body.address || user.address;

            const updatedUser = await user.save();
            
            return res.json({
                _id: updatedUser._id,
                fullName: updatedUser.fullName,
                email: updatedUser.email,
                address: updatedUser.address,
                profileImage: updatedUser.profileImage 
            });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error("Update Profile Error:", error);
        return res.status(500).json({ message: 'Server error while updating profile' });
    }
};

// 3. Change Password
const changePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (user) {
            const { oldPassword, newPassword } = req.body;

            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Old password is incorrect' });
            }

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);

            await user.save();
            return res.json({ message: 'Password updated successfully' });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error("Change Password Error:", error);
        return res.status(500).json({ message: 'Server error while changing password' });
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
            { profileImage: cloudinaryResponse.secure_url }, 
            { new: true }
        ).select('-password');

        return res.status(200).json({ 
            message: "Profile picture updated successfully!", 
            profileImage: updatedUser.profileImage 
        });

    } catch (error) {
        console.error("Upload Error:", error);
        return res.status(500).json({ message: "Image upload failed", error: error.message });
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
