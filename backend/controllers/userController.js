// backend/controllers/userController.js
const User = require('../models/User');
const cloudinary = require('../config/cloudinary'); 
const bcrypt = require('bcryptjs'); 
const streamifier = require('streamifier');

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
            user.phoneNumber = req.body.phoneNumber || user.phoneNumber; // 🔥 NAYA ADD KIYA HAI
            user.address = req.body.address || user.address;

            const updatedUser = await user.save();
            
            return res.json({
                _id: updatedUser._id,
                fullName: updatedUser.fullName,
                email: updatedUser.email,
                phoneNumber: updatedUser.phoneNumber, // 🔥 NAYA ADD KIYA HAI
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

        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                    { 
                        folder: "homebite/profiles",
                        resource_type: "auto"
                    }, 
                    (error, result) => {
                        if (result) resolve(result);
                        else reject(error);
                    }
                );
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };

        const cloudinaryResponse = await streamUpload(req);

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { profileImage: cloudinaryResponse.secure_url }, 
            { returnDocument: 'after' } 
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

module.exports = {
    getUserProfile,
    updateUserProfile,
    changePassword,
    uploadProfilePic
};
