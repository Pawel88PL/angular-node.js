const { Sequelize } = require('sequelize');
const setupModelAssociations = require('../models/modelAssociations');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: console.log
});


const Product = require('../models/product.model')(sequelize, Sequelize.DataTypes);
const Category = require('../models/category.model')(sequelize, Sequelize.DataTypes);
const User = require('../models/user.model')(sequelize, Sequelize.DataTypes);

setupModelAssociations({sequelize, Product, Category});

module.exports = { sequelize, Product, Category, User};