export default (sequelize, DataTypes) => {
    const Product = sequelize.define('Product',
        {
            productId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                field: 'ProductId'
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'Name'
            },
            description: {
                type: DataTypes.TEXT,
                field: 'Description'
            },
            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                field: 'Price'
            },
            weight: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'Weight'
            },
            dateAdded: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'DateAdded',
                defaultValue: DataTypes.NOW
            },
            amountAvailable: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'AmountAvailable'
            }
        }, {
        sequelize,
        modelName: 'Product',
        tableName: 'Products',
        timestamps: false,
    });

    return Product;
};