import {
    addItem,
    assignCartToUser,
    getItems,
    removeItem,
    updateItemQuantity
} from '../services/cartService.js';


export async function addItemToCart(req, res) {
    try {
        const { cartId, productId, quantity } = req.body;
        const result = await addItem(cartId, productId, quantity);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Nie udało się dodać produktu do koszyka.', error: error.message });
    }
}

export async function assignCart(req, res) {
    try {
        const { cartId } = req.params;
        const { userId } = req.body;
        const cart = await assignCartToUser(cartId, userId);
        res.json({ message: 'Koszyk został przypisany do użytkownika.', cart });
    } catch (error) {
        console.error('Error assigning cart to user:', error);
        res.status(500).json({ message: 'Nie udało się przypisać koszyka do użytkownika.', error: error.message });
    }
}

export async function getCartItems(req, res) {
    try {
        const cartId = req.params.cartId;
        const { cartItems, totalValue } = await getItems(cartId);

        const response = {
            shoppingCartId: cartId,
            cartItems,
            totalValue
        };

        return res.status(200).json(response);
    } catch (error) {
        console.error('Error in getCartItemsController: ', error);
        return res.status(500).send({ message: 'Błąd podczas pobierania przedmiotów z koszyka.' });
    }
}

export async function removeItemFromCart(req, res) {
    try {
        const { cartId, productId } = req.params;
        const result = await removeItem(cartId, productId);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ message: 'Nie udało się usunąć produktu z koszyka.', error: error.message });
    }
}

export async function updateItemQuantityInCart(req, res) {
    try {
        const { cartId, productId } = req.params;
        const { quantity } = req.body;

        const updatedCartItem = await updateItemQuantity(cartId, productId, quantity);

        res.json(updatedCartItem);
    } catch (error) {
        console.error('Error updating item quantity in cart:', error);
        res.status(500).json({ message: 'Nie udało się zaktualizować ilości produktu w koszyku.', error: error.message });
    }
}
