const { Cart, CartItem, Order, OrderDetail, Product, User } = require('../config/dbConfig');

const createOrder = async (cartId, userId, isPickupInStore) => {
    const shippingCost = isPickupInStore ? 0 : 99;

    try {
        const cart = await Cart.findOne({
            where: { cartId: cartId },
            include: [{
                model: CartItem,
                as: 'cartItems',
                include: [{
                    model: Product,
                    as: 'product'
                }]
            }]
        });

        if (!cart || !cart.cartItems.length) {
            return null;
        }

        const totalPrice = cart.cartItems.reduce((acc, item) => acc + (item.quantity * item.product.price), 0) + shippingCost;

        const order = await Order.create({
            UserId: userId,
            OrderDate: new Date(),
            TotalPrice: totalPrice,
            Status: 'Oczekuje na płatność',
            IsPickupInStore: isPickupInStore,
            // inne pola zamówienia
        });

        const orderDetails = cart.cartItems.map(item => ({
            OrderId: order.OrderId,
            ProductId: item.productId,
            Quantity: item.quantity,
            UnitPrice: item.product.price
        }));

        await OrderDetail.bulkCreate(orderDetails);

        await CartItem.destroy({ where: { cartId: cartId } });

        // Tutaj dodaj logikę obsługi wysyłki powiadomień email

        return order.OrderId;
    } catch (error) {
        throw error;
    }
};

const getAllOrders = async () => {
    try {
        const orders = await Order.findAll({
            include: [{
                model: User,
                as: 'user'
            }],
            order: [['orderDate', 'DESC']]
        });

        const ordersDTO = orders.map(order => ({
            orderId: order.OrderId,
            orderDate: order.OrderDate,
            isPickupInStore: order.IsPickupInStore,
            totalPrice: order.TotalPrice,
            status: order.Status,
            customerName: `${order.user.firstname} ${order.user.lastname}`
        }));

        return ordersDTO;

    } catch (error) {
        throw error;
    }
};

const getOrderDetails = async (orderId) => {
    try {
        const order = await Order.findOne({
            where: { OrderId: orderId },
            include: [
                {
                    model: User,
                    as: 'user'
                },
                {
                    model: OrderDetail,
                    as: 'orderDetails',
                    include: [
                        {
                            model: Product,
                            as: 'product'
                        }
                    ]
                }
            ]
        });

        if (!order) return null;

        const orderDto = {
            orderId: order.OrderId,
            isPickupInStore: order.IsPickupInStore,
            orderDate: order.OrderDate,
            totalPrice: order.TotalPrice,
            status: order.Status,
            customer: order.user ? {
                name: order.user.firstname,
                email: order.user.email,
                surname: order.user.lastname,
                city: order.user.city,
                street: order.user.street,
                address: order.user.address,
                postalCode: order.user.postalCode,
                phoneNumber: order.user.phoneNumber
            } : null,
            orderDetails: order.orderDetails.map(od => ({
                orderDetailId: od.OrderDetailId,
                orderId: od.OrderId,
                productId: od.ProductId,
                quantity: od.Quantity,
                unitPrice: od.UnitPrice,
                productName: od.product.name
            }))
        };

        return orderDto;
    } catch (error) {
        throw error;
    }
};

const getOrdersHistory = async (UserId) => {
    try {
        const orders = await Order.findAll({
            where: { UserId: UserId },
            order: [['OrderDate', 'DESC']],
            include: [{
                model: User,
                as: 'user'
            }]
        });

        return orders.map(order => ({
            orderId: order.OrderId,
            orderDate: order.OrderDate,
            isPickupInStore: order.IsPickupInStore,
            totalPrice: order.TotalPrice,
            status: order.Status
        }));
    } catch (error) {
        throw error;
    }
};


module.exports = {
    createOrder,
    getAllOrders,
    getOrderDetails,
    getOrdersHistory
};
