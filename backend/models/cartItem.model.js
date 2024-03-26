module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define('CartItem', {
        cartItemId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'CartItem',
        tableName: 'CartItems',
        timestamps: false
    });

    return CartItem;
};