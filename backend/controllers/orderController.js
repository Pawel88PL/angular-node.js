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