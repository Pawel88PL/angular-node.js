export default (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart',
        {
            cartId: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            createCartDate: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            }
        }, {
        sequelize,
        modelName: 'Cart',
        tableName: 'Carts',
        timestamps: false
    });

    return Cart;
};