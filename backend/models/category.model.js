const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Category extends Sequelize.Model { }

    Category.init({
        // Definicje pól...
        CategoryId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            field: 'CategoryId'
        },
        Name: {
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