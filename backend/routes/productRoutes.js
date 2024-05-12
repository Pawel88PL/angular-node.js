import express from 'express';
import { addProduct, deleteProduct, updateProduct, getProducts, getProduct } from '../controllers/productController.js';

const router = express.Router();

router.post('/add', addProduct);
router.delete('/:id', deleteProduct);
router.get('/:id', getProduct);
router.get('/', getProducts);
router.put('/:id', updateProduct);

export default router;
