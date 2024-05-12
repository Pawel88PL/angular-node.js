import express from 'express';
import {
    createOrder,
    getAllOrders,
    getOrderDetails,
    getOrdersHistory,
    updateOrderStatus
} from '../controllers/orderController.js';

const router = express.Router();

// Mapowanie ścieżek na funkcje kontrolera
router.post('/', createOrder);
router.get('/allOrders', getAllOrders);
router.get('/:orderId', getOrderDetails);
router.get('/history/:userId', getOrdersHistory);
router.patch('/:orderId', updateOrderStatus);

export default router;
