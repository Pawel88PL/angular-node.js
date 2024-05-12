import express from 'express';
import { addItemToCart, assignCart, getCartItems, removeItemFromCart, updateItemQuantityInCart } from '../controllers/cartController.js';

const router = express.Router();

router.post('/items', addItemToCart);
router.post('/assign/:cartId', assignCart);
router.get('/:cartId/items', getCartItems);
router.delete('/:cartId/items/:productId', removeItemFromCart);
router.patch('/:cartId/items/:productId', updateItemQuantityInCart);

export default router;
