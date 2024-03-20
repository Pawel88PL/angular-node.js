module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category',
        {
            categoryId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                field: 'CategoryId'
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'Name'
            }
        }, {
        sequelize,
        modelName: 'Category',
        tableName: 'Categories',
        timestamps: false
    });

    return Category;
};