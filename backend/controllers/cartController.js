const { addCartItem, getCartItems, removeItemFromCart, updateItemQuantity } = require('../services/cartService');

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

exports.removeItemFromCart = async (req, res) => {
    try {
        const { cartId, productId } = req.params;
        const result = await removeItemFromCart(cartId, productId);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ message: 'Nie udało się usunąć produktu z koszyka.', error: error.message });
    }
}

exports.updateItemQuantityInCart = async (req, res) => {
    try {
        const { cartId, productId } = req.params;
        const { quantity } = req.body;

        const updatedCartItem = await updateItemQuantity(cartId, productId, quantity);

        res.json(updatedCartItem);
    } catch (error) {
        console.error('Error updating item quantity in cart:', error);
        res.status(500).json({ message: 'Nie udało się zaktualizować ilości produktu w koszyku.', error: error.message });
    }
};
