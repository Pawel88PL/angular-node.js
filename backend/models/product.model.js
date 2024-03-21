module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product',
        {
            // Definicje pól...
            productId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                field: 'ProductId' // Nazwa kolumny w bazie danych
            },
            // Nazwa produktu
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'Name'
            },
            // Opis produktu
            description: {
                type: DataTypes.TEXT,
                field: 'Description'
            },
            // Cena
            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                field: 'Price'
            },
            // Waga
            weight: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'Weight'
            },
            // Data dodania
            dateAdded: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'DateAdded',
                defaultValue: DataTypes.NOW
            },
            // Dostępna ilość
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