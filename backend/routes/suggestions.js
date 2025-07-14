const express = require('express');
const router = express.Router();
const { getSuggestions } = require('../controllers/suggestionController');

router.post('/', getSuggestions);

module.exports = router;
