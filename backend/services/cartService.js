const { Cart, CartItem, Product, ProductImage } = require('../config/dbConfig');

const addCartItem = async (cartId, productId, quantity) => {
    try {
        console.log(`Starting addCartItem with cartId: ${cartId}, productId: ${productId}, quantity: ${quantity}`);

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
            console.log(`Cart not found, creating new cart with ID: ${cartId}`);
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
        } else {
            console.log(`Found existing cart with ID: ${cartId}`);
        }

        const product = await Product.findByPk(productId);
        if (!product) {
            throw new Error("Nie znaleziono produktu.");
        }

        console.log(`Found product with ID: ${productId}, available amount: ${product.amountAvailable}`);

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
            console.log(`Found existing CartItem. Updating quantity.`);
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            console.log(`Creating new CartItem with product ID: ${productId} and quantity: ${quantity}`);
            const itemData = {
                cartId: cartId,
                productId: productId,
                quantity: quantity,
                price: product.price
            }
            console.log(`CartItem data to be created: `, itemData);
            await CartItem.create(itemData);
            console.log(`CartItem created successfully.`);
        }
    } catch (error) {
        console.error('Error in addCartItem: ', error);
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



module.exports = {
    addCartItem,
    getCartItems
};
