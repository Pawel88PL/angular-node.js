const { Cart, CartItem, Order, OrderDetail, Product } = require('../config/dbConfig');

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
            Price: item.product.price * item.quantity
        }));

        await OrderDetail.bulkCreate(orderDetails);

        await CartItem.destroy({ where: { cartId: cartId } });

        // Tutaj dodaj logikę obsługi wysyłki powiadomień email

        return order.OrderId;
    } catch (error) {
        throw error;
    }
};


module.exports = {
    createOrder
};
