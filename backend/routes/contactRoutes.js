const express = require('express');
const router = express.Router();
const { submitContact } = require('../controllers/contactController');

// POST request ko handle karega
// Dhyan dein: Yahan path ab sirf '/' hai
router.post('/', submitContact);

module.exports = router;
