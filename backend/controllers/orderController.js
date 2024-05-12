import {
    createOrderInDb,
    getOrdersFromDb,
    getOrderById,
    getOrdersByUser,
    updateOrderNewStatusInDb
} from '../services/orderService.js';

export async function createOrder(req, res) {
    try {
        const { cartId, userId, isPickupInStore } = req.body;
        const order = await createOrderInDb(cartId, userId, isPickupInStore);
        res.status(201).json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
};

export async function getAllOrders(req, res) {
    try {
        const orders = await getOrdersFromDb();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error getting all orders:', error);
        res.status(500).send({ message: 'Error getting all orders.' });
    }
};

export async function getOrderDetails(req, res) {
    try {
        const orderId = req.params.orderId;
        const orderDetails = await getOrderById(orderId);
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

export async function getOrdersHistory(req, res) {
    try {
        const { userId } = req.params;
        const orders = await getOrdersByUser(userId);
        res.json(orders);
    } catch (error) {
        console.error('Error getting orders history:', error);
        res.status(500).send({ message: 'Problem z pobraniem historii zamówień.' });
    }
};

export async function updateOrderStatus(req, res) {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const updated = await updateOrderNewStatusInDb(orderId, status);

        if (!updated) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        res.json({ message: 'Order status updated successfully.' });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Error updating order status.' });
    }
};