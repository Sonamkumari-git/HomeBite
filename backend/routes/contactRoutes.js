const express = require('express');
const router = express.Router();
const { submitContact } = require('../controllers/contactController');

// POST request handle karega /api/contact par
router.post('/', submitContact);

module.exports = router;
