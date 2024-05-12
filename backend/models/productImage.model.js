export default (sequelize, DataTypes) => {
    const ProductImage = sequelize.define('ProductImage', {
        imageId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        imagePath: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'ProductImages',
        timestamps: false
    });

    return ProductImage;
};
