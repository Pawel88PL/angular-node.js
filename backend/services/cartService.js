const { Cart, CartItem, Product, ProductImage } = require('../config/dbConfig');

const addCartItem = async (cartId, productId, quantity) => {
    try {

        let cart = await Cart.findOne({
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

        if (!cart) {
            cart = await Cart.create({
                cartId: cartId,
                createCartDate: new Date(),
                cartItems: []
            }, {
                include: [{
                    model: CartItem,
                    as: 'cartItems'
                }]
            });
        }

        const product = await Product.findByPk(productId);
        if (!product) {
            throw new Error("Nie znaleziono produktu.");
        }

        if (product.amountAvailable < 1) {
            throw new Error("Niestaty wybrany produkt został sprzedany. Przepraszamy.");
        }

        const cartItem = await CartItem.findOne({
            where: {
                cartId: cartId,
                productId: productId
            }
        });

        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            const itemData = {
                cartId: cartId,
                productId: productId,
                quantity: quantity,
                price: product.price
            }
            await CartItem.create(itemData);
        }
    } catch (error) {
        throw error;
    }
};

const assignCartToUser = async (cartId, userId) => {
    try {
        const cart = await Cart.findByPk(cartId);
        if (!cart) {
            throw new Error('Koszyk nie został znaleziony.');
        }

        cart.UserId = userId;
        await cart.save();
        return cart;
    } catch (error) {
        console.error("Błąd podczas przypisywania koszyka do użytkownika:", error);
        throw error;
    }
};


const getCartItems = async (cartId) => {
    try {
        const cartItems = await CartItem.findAll({
            where: { cartId: cartId },
            include: [{
                model: Product,
                as: 'product',
                include: [{
                    model: ProductImage,
                    as: 'productImages'
                }]
            }]
        });

        let totalValue = 0;

        const items = cartItems.map(item => {
            const itemTotal = item.price * item.quantity;
            totalValue += itemTotal;
            return {
                productId: item.productId,
                name: item.product.name,
                price: item.price,
                quantity: item.quantity,
                amountAvailable: item.product.amountAvailable,
                imagePaths: [item.product.productImages[0].imagePath]
            };
        });

        return { cartItems: items, totalValue };
    } catch (error) {
        console.error('Error in cartService.getCartItems: ', error);
        throw error;
    }
};

const removeItemFromCart = async (cartId, productId) => {
    try {
        const result = await CartItem.destroy({
            where: {
                cartId: cartId,
                productId: productId
            }
        });

        if (result === 0) {
            throw new Error('Nie znaleziono przedmiotu do usunięcia.');
        }

        return { message: 'Przedmiot usunięty pomyślnie.' };

    } catch (error) {
        throw error;
    }
}

const updateItemQuantity = async (cartId, productId, quantity) => {
    try {
        const cartItem = await CartItem.findOne({
            where: { cartId, productId }
        });

        if (!cartItem) {
            throw new Error('Produkt nie został znaleziony w koszyku.');
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        return cartItem;

    } catch (error) {
        throw error;
    }
};

module.exports = {
    addCartItem,
    assignCartToUser,
    getCartItems,
    removeItemFromCart,
    updateItemQuantity
};
