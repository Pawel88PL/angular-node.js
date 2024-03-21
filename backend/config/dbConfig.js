// Opis: Konfiguracja połączenia z bazą danych
const { Sequelize } = require('sequelize');
const setupModelAssociations = require('../models/modelAssociations');

// Utworzenie połączenia z bazą danych
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '+01:00',
    logging: console.log
});

// Test połączenia
sequelize.authenticate()
    .then(() => {
        console.log('Połączenie z bazą danych zostało nawiązane pomyślnie.');
    })
    .catch(err => {
        console.error('Nie można połączyć się z bazą danych:', err);
        process.exit(1); // Zakończenie procesu z błędem
    });

// Import modeli
const Product = require('../models/product.model')(sequelize, Sequelize.DataTypes);
const Category = require('../models/category.model')(sequelize, Sequelize.DataTypes);
const ProductImage = require('../models/productImage.model')(sequelize, Sequelize.DataTypes);
const User = require('../models/user.model')(sequelize, Sequelize.DataTypes);

// Utworzenie asocjacji między modelami
setupModelAssociations({ sequelize, Product, Category, ProductImage });

// Eksport modeli
module.exports = { sequelize, Product, Category, ProductImage, User };