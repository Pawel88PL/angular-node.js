export default (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        OrderId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'UserId'
            }
        },
        OrderDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        TotalPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        Status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        IsPickupInStore: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        tableName: 'Orders',
        timestamps: false
    });

    return Order;
};
