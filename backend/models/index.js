// models/index.js
const Sequelize = require('sequelize');
const sequelize = require('../config/dbConfig');

const Category = require('./category.model')(sequelize, Sequelize.DataTypes);
const Product = require('./product.model')(sequelize, Sequelize.DataTypes);

// Tutaj zdefiniuj relacje między modelami, np.:
// Product.belongsTo(Category);

module.exports = {
    sequelize, // Eksportuj instancję Sequelize, aby móc używać w całej aplikacji
    Category,
    Product,
    // i inne modele...
};
