const express = require('express');
const router = express.Router();
const multer = require('multer');


const { registerUser, loginUser } = require('../controllers/authController');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post('/register', upload.single('profileImage'), registerUser);

// Login route
router.post('/login', loginUser);

module.exports = router;
