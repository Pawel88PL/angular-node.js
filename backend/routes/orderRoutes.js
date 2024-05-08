const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();

router.post('/', orderController.createOrder);
router.get('/allOrders', orderController.getAllOrders);
router.get('/:orderId', orderController.getOrderDetails);
router.get('/history/:userId', orderController.getOrdersHistory);
router.patch('/:orderId', orderController.updateOrderStatus);

module.exports = router;
