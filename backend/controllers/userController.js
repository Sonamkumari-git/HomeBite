// backend/controllers/userController.js
const User = require('../models/User');
// Puraana cloudinary import hata kar ab hum apna config wala import karenge:
const cloudinary = require('../config/cloudinary'); 

// (Aapko yahan cloudinary.config({...}) dobara likhne ki zaroorat nahi hai)

// @route   PUT /api/users/profile-pic
exports.uploadProfilePic = async (req, res) => {
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

        // MongoDB me user ka profilePic URL update karna
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { profilePic: cloudinaryResponse.secure_url },
            { new: true }
        ).select('-password');

        res.status(200).json({ 
            message: "Profile picture updated successfully!", 
            profilePic: updatedUser.profilePic 
        });

    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ message: "Image upload failed", error: error.message });
    }
};
