const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();

router.post('/items', cartController.addItemToCart);
router.post('/assign/:cartId', cartController.assignCart);
router.get('/:cartId/items', cartController.getCartItems);
router.delete('/:cartId/items/:productId', cartController.removeItemFromCart);
router.patch('/:cartId/items/:productId', cartController.updateItemQuantityInCart);

module.exports = router;
