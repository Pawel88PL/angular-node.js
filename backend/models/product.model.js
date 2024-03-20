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
            // Dostępna ilość
            amountAvailable: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'AmountAvailable'
            },
            // Ścieżka do obrazka
            imagePath: {
                type: DataTypes.STRING,
                field: 'ImagePath'
            }
        }, {
        sequelize,
        modelName: 'Product',
        tableName: 'Products',
        timestamps: false,
    });

    return Product;
};