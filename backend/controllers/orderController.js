const orderService = require('../services/orderService');

exports.createOrder = async (req, res) => {
    try {
        const { cartId, userId, isPickupInStore } = req.body;
        const order = await orderService.createOrder(cartId, userId, isPickupInStore);
        res.status(201).json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error getting all orders:', error);
        res.status(500).send({ message: 'Error getting all orders.' });
    }
};

exports.getOrderDetails = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const orderDetails = await orderService.getOrderDetails(orderId);
        if (orderDetails) {
            res.json(orderDetails);
        } else {
            res.status(404).send('Order not found');
        }
    } catch (error) {
        console.error('Error getting order details:', error);
        res.status(500).send('Internal server error');
    }
};

exports.getOrdersHistory = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await orderService.getOrdersHistory(userId);
        res.json(orders);
    } catch (error) {
        console.error('Error getting orders history:', error);
        res.status(500).send({ message: 'Problem z pobraniem historii zamówień.' });
    }
};