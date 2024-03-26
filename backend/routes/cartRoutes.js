const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();

router.post('/items', cartController.addItemToCart);

module.exports = router;
