const User = require('../models/User');
const cloudinary = require('cloudinary').v2;

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// @route   PUT /api/users/profile-pic
exports.uploadProfilePic = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No image file provided" });
        }

        // Buffer ko Base64 me convert karke Cloudinary par upload karna
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        
        const cloudinaryResponse = await cloudinary.uploader.upload(dataURI, {
            folder: "homebite/profiles", // Cloudinary me is folder me save hoga
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
