const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();

router.post('/', orderController.createOrder);
router.get('/allOrders', orderController.getAllOrders);

module.exports = router;
