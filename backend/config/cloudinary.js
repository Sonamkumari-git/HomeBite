const cloudinary = require('cloudinary').v2;

// 🔥 Direct Cloudinary Credentials (Bina kisi extra space ke)
cloudinary.config({
    cloud_name: 'wewfaleq',
    api_key: '212696247798657',
    api_secret: 'hXrlDOVXYbPHIb8pcqpuLAhMocQ' // Space bilkul hata diya hai
});

console.log("✅ Cloudinary Connected Successfully with Hardcoded Credentials!");

module.exports = cloudinary;
