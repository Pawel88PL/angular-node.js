const { addCartItem } = require('../services/cartService');

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