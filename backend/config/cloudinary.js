// backend/config/cloudinary.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Yeh check karne ke liye ki variables sahi se load ho rahe hain ya nahi
console.log("Cloudinary Configured with Environment Variables!");

module.exports = cloudinary;
