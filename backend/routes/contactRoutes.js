const express = require('express');
const router = express.Router();
const { submitContact } = require('../controllers/contactController');

// POST request ko handle karega
router.post('/contact', submitContact);

module.exports = router;
