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
