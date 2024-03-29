function setupModelAssociations({ Product, Category, ProductImage, Cart, CartItem, User, Order, OrderDetail}) {
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

    // Relacje dla User i Cart
    Cart.belongsTo(User,{
        as: 'user',
        foreignKey: 'UserId',
    });

    User.hasMany(Cart,{
        as: 'carts',
        foreignKey: 'UserId',
    });

    // Relacje dla User i Order
    User.hasMany(Order, {
        as: 'orders',
        foreignKey: 'UserId',
    });

    Order.belongsTo(User, {
        as: 'user',
        foreignKey: 'UserId',
    });

    // Relacje dla Order i OrderDetail
    Order.hasMany(OrderDetail, {
        as: 'orderDetails',
        foreignKey: 'OrderId',
    });
    OrderDetail.belongsTo(Order, {
        as: 'order',
        foreignKey: 'OrderId',
    });

    // Relacje dla OrderDetail i Product
    Product.hasMany(OrderDetail, {
        as: 'orderDetails',
        foreignKey: 'ProductId',
    });

    OrderDetail.belongsTo(Product, {
        as: 'product',
        foreignKey: 'ProductId',
    });
}

module.exports = setupModelAssociations;
