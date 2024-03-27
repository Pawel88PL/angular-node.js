const { addCartItem, getCartItems } = require('../services/cartService');

exports.addItemToCart = async (req, res) => {
    try {
        const { cartId, productId, quantity } = req.body;
        const result = await addCartItem(cartId, productId, quantity);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Nie udało się dodać produktu do koszyka.', error: error.message });
    }
};

exports.getCartItems = async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const { cartItems, totalValue } = await getCartItems(cartId);

        if (cartItems.length === 0) {
            return res.status(404).send({ message: 'Nie znaleziono przedmiotów w koszyku.' });
        }

        const response = {
            shopingCartId: cartId,
            cartItems,
            totalValue
        };

        return res.status(200).json(response);
    } catch (error) {
        console.error('Error in getCartItemsController: ', error);
        return res.status(500).send({ message: 'Błąd podczas pobierania przedmiotów z koszyka.' });
    }
};

