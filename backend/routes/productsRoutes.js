const express = require('express');
const productsController = require('../controllers/productsController');
const router = express.Router();

router.post('/add', productsController.addProduct);
router.delete('/:id', productsController.deleteProductById);
router.put('/:id', productsController.updateProductById);
router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProductById);

module.exports = router;
