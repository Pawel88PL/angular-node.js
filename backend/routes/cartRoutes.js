const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();

router.post('/items', cartController.addItemToCart);
router.get('/:cartId/items', cartController.getCartItems);

module.exports = router;
