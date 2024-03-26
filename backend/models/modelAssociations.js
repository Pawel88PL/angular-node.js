function setupModelAssociations({ Product, Category, ProductImage, Cart, CartItem }) {
    // Relacje dla Product, Category, i ProductImage
    Product.belongsTo(Category, {
        as: 'category',
        foreignKey: 'categoryId',
    });
    Category.hasMany(Product, {
        as: 'products',
        foreignKey: 'categoryId',
    });
    Product.hasMany(ProductImage, {
        as: 'productImages',
        foreignKey: 'productId',
    });

    // Relacje dla Cart i CartItem
    Cart.hasMany(CartItem, {
        as: 'cartItems',
        foreignKey: 'cartId',
    });
    CartItem.belongsTo(Cart, {
        as: 'cart',
        foreignKey: 'cartId',
    });
    CartItem.belongsTo(Product, {
        as: 'product',
        foreignKey: 'productId',
    });
    Product.hasMany(CartItem, {
        as: 'cartItems',
        foreignKey: 'productId',
    });
}

module.exports = setupModelAssociations;
