const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Sign up API route
router.post('/register', registerUser);

// Login API route
router.post('/login', loginUser);

module.exports = router;